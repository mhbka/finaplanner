import type {
  AssetDetail,
  DebtPaymentDetail,
  ExpenseDetail,
  IncomeStreamDetail,
  InvestmentDetail,
  OneTimeIncomeDetail,
  YearlyAssets,
  YearlyDebt,
  YearlyExpenses,
  YearlyIncome,
  YearlyInvestments,
} from "../types/financialBalanceElements";
import type {
  IncomeStream,
  OneTimeIncome,
  RecurringExpense,
  OneTimeExpense,
  Debt,
  Investment,
  Asset,
} from "../types/financialElements";

/**
 * Calculate all income for a given year, including recurring streams and one-time incomes.
 */
export function calculateIncomeForYear(
  year: number,
  incomeStreams: IncomeStream[],
  oneTimeIncomes: OneTimeIncome[]
): YearlyIncome {
  // Recurring income streams for this year
  const streamCalculations: IncomeStreamDetail[] = incomeStreams
    .filter(i => year >= i.start_year && year <= i.end_year)
    .map(i => {
      const yearsFromStart = year - i.start_year;
      const growthMultiplier = Math.pow(1 + i.annual_growth_rate, yearsFromStart);
      const gross = i.gross_amount * growthMultiplier;
      const taxes = gross * i.effective_tax_rate;
      return {
        id: i.id,
        baseAmount: i.gross_amount,
        yearsFromStart,
        growthMultiplier,
        gross,
        taxes,
        net: gross - taxes,
      };
    });

  // One-time incomes for this year
  const oneTimeCalculations: OneTimeIncomeDetail[] = oneTimeIncomes
    .filter(o => o.year === year)
    .map(o => {
      const taxes = o.amount * o.effective_tax_rate;
      return {
        id: o.id,
        amount: o.amount,
        taxes,
        net: o.amount - taxes,
      };
    });

  // Totals
  const allIncomes = [...streamCalculations, ...oneTimeCalculations];
  const gross = allIncomes.reduce((sum, i) => sum + ("gross" in i ? i.gross : i.amount), 0);
  const taxes = allIncomes.reduce((sum, i) => sum + i.taxes, 0);
  const net = gross - taxes;

  return {
    gross,
    taxes,
    net,
    breakdown: allIncomes.map(i => ({
      source: i.id,
      amount: "net" in i ? i.net : 0,
    })),
    details: { streamCalculations, oneTimeCalculations },
  };
}

/**
 * Calculate all expenses for a given year, accounting for inflation.
 */
export function calculateExpensesForYear(
  year: number,
  recurringExpenses: RecurringExpense[],
  oneTimeExpenses: OneTimeExpense[],
  inflationRate: number
): YearlyExpenses {
  // Recurring expenses
  const recurringCalculations: ExpenseDetail[] = recurringExpenses
    .filter(e => year >= e.start_year && year <= e.end_year)
    .map(e => {
      const yearsFromStart = year - e.start_year;
      const inflationMultiplier = e.inflation_adjusted ? Math.pow(1 + inflationRate, yearsFromStart) : 1;
      const amount = e.annual_amount * inflationMultiplier;
      return {
        id: e.id,
        category: e.category,
        baseAmount: e.annual_amount,
        inflationMultiplier,
        amount,
      };
    });

  // One-time expenses (fixed amount, no inflation)
  const oneTimeCalculations: ExpenseDetail[] = oneTimeExpenses
    .filter(o => o.year === year)
    .map(o => ({
      id: o.id,
      category: o.category,
      baseAmount: o.amount,
      inflationMultiplier: 1,
      amount: o.amount,
    }));

  const allExpenses = [...recurringCalculations, ...oneTimeCalculations];
  const total = allExpenses.reduce((sum, e) => sum + e.amount, 0);

  return {
    total,
    breakdown: allExpenses.map(e => ({ category: e.category, amount: e.amount })),
    details: { expenseCalculations: allExpenses },
  };
}

/**
 * Calculate debt payments for a given year.
 */
export function calculateDebtForYear(year: number, debts: Debt[]): YearlyDebt {
  const payments: DebtPaymentDetail[] = debts
    .filter(d => year >= d.start_year)
    .map(d => {
      const startingPrincipal = d.principal;
      const interestPortion = d.principal * d.interest_rate;
      const principalPortion = Math.min(d.monthly_payment * 12 - interestPortion, d.principal);

      // Reduce principal for future calculations
      d.principal = Math.max(d.principal - principalPortion, 0);

      return {
        id: d.id,
        startingPrincipal,
        interestPortion,
        principalPortion,
        remainingPrincipal: d.principal,
      };
    });

  const totalPayment = payments.reduce((sum, p) => sum + p.interestPortion + p.principalPortion, 0);
  const interest = payments.reduce((sum, p) => sum + p.interestPortion, 0);
  const principalPaid = payments.reduce((sum, p) => sum + p.principalPortion, 0);

  return {
    totalPayment,
    interest,
    principalPaid,
    details: { payments },
  };
}

/**
 * Calculate investment contributions, growth, and value for the year.
 */
export function calculateInvestmentsForYear(
  year: number,
  investments: Investment[],
  netIncome: number,
  investmentValues: Record<string, number>
): YearlyInvestments {
  const contributions: InvestmentDetail[] = investments
    .filter(inv => year >= inv.start_year && year <= inv.end_year)
    .map(inv => {
      const startingValue = investmentValues[inv.id] ?? 0;
      const contribution = netIncome * inv.percentage_of_available_income;
      const currentValue = startingValue + contribution;
      const growth = currentValue * inv.annual_return_rate;
      const endingValue = currentValue + growth;

      investmentValues[inv.id] = endingValue; // update for next year

      return { id: inv.id, startingValue, contribution, growth, endingValue };
    });

  const totalContributions = contributions.reduce((sum, c) => sum + c.contribution, 0);
  const totalReturns = contributions.reduce((sum, c) => sum + c.growth, 0);
  const totalValue = Object.values(investmentValues).reduce((sum, v) => sum + v, 0);

  return {
    contributions: totalContributions,
    returns: totalReturns,
    value: totalValue,
    details: { contributions },
  };
}

/**
 * Calculate asset appreciation and value for the year, including sales.
 */
export function calculateAssetsForYear(
  year: number,
  assets: Asset[],
  assetValues: Record<string, number>,
  cumulativeNetWorth: { value: number }
): YearlyAssets {
  const assetDetails: AssetDetail[] = [];

  assets.forEach(asset => {
    // Initialize new asset if purchased this year
    if (year === asset.purchase_year) {
      assetValues[asset.id] = asset.initial_value;
    }

    if (assetValues[asset.id] != null) {
      const startingValue = assetValues[asset.id];
      const appreciation = startingValue * asset.annual_appreciation_rate;
      const endingValue = startingValue + appreciation;

      assetValues[asset.id] = endingValue;

      assetDetails.push({
        id: asset.id,
        startingValue,
        appreciation,
        endingValue,
        soldThisYear: asset.sell_year === year,
      });
    }

    // Handle asset sale
    if (asset.sell_year && year === asset.sell_year) {
      cumulativeNetWorth.value += assetValues[asset.id]!;
      delete assetValues[asset.id];
    }
  });

  const totalValue = Object.values(assetValues).reduce((sum, v) => sum + v, 0);

  return {
    appreciation: totalValue,
    value: totalValue,
    details: { assets: assetDetails },
  };
}

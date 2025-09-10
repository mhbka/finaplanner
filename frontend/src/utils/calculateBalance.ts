import type { YearlyBalanceSheet } from "../types/financialBalanceElements";
import type { FinancialPlan } from "../types/financialElements";
import { calculateIncomeForYear, calculateExpensesForYear, calculateDebtForYear, calculateInvestmentsForYear, calculateAssetsForYear } from "./calculateBalanceComponents";

// Calculates the year-by-year "balance sheet" for a user's financial plan.
export function calculateBalanceSheet(plan: FinancialPlan): YearlyBalanceSheet[] {
  const { startYear, endYear, data, inflationRate } = plan;

  let cumulativeNetWorth = { value: 0 };
  let investmentValues: Record<string, number> = {};
  let assetValues: Record<string, number> = {};

  const years: YearlyBalanceSheet[] = [];

  for (let year = startYear; year <= endYear; year++) {
    const income = calculateIncomeForYear(year, data.incomeStreams, data.oneTimeIncomes);
    const expenses = calculateExpensesForYear(year, data.recurringExpenses, data.oneTimeExpenses, inflationRate);
    const debt = calculateDebtForYear(year, data.debts);
    const investments = calculateInvestmentsForYear(year, data.investments, income.net, investmentValues);
    const assets = calculateAssetsForYear(year, data.assets, assetValues, cumulativeNetWorth);

    const netCashFlow = income.net - expenses.total - debt.totalPayment - investments.contributions;
    cumulativeNetWorth.value += netCashFlow + investments.value + assets.value;

    years.push({
      year,
      income,
      expenses,
      debt,
      investments,
      assets,
      netCashFlow,
      cumulativeNetWorth: cumulativeNetWorth.value,
    });
  }

  return years;
}
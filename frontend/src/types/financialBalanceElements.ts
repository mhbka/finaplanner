// --- Income ---
export interface IncomeStreamDetail {
  id: string;
  baseAmount: number;
  yearsFromStart: number;
  growthMultiplier: number;
  gross: number;
  taxes: number;
  net: number;
}

export interface OneTimeIncomeDetail {
  id: string;
  amount: number;
  taxes: number;
  net: number;
}

export interface YearlyIncomeDetails {
  streamCalculations: IncomeStreamDetail[];
  oneTimeCalculations: OneTimeIncomeDetail[];
}

export interface YearlyIncome {
  gross: number;
  taxes: number;
  net: number;
  breakdown: { source: string; amount: number }[];
  details: YearlyIncomeDetails;
}

// --- Expenses ---
export interface ExpenseDetail {
  id?: string;
  category: string;
  baseAmount: number;
  inflationMultiplier: number;
  amount: number;
}

export interface YearlyExpenseDetails {
  expenseCalculations: ExpenseDetail[];
}

export interface YearlyExpenses {
  total: number;
  breakdown: { category: string; amount: number }[];
  details: YearlyExpenseDetails;
}

// --- Debt ---
export interface DebtPaymentDetail {
  id: string;
  startingPrincipal: number;
  interestPortion: number;
  principalPortion: number;
  remainingPrincipal: number;
}

export interface YearlyDebtDetails {
  payments: DebtPaymentDetail[];
}

export interface YearlyDebt {
  totalPayment: number;
  interest: number;
  principalPaid: number;
  details: YearlyDebtDetails;
}

// --- Investments ---
export interface InvestmentDetail {
  id: string;
  startingValue: number;
  contribution: number;
  growth: number;
  endingValue: number;
}

export interface YearlyInvestmentDetails {
  contributions: InvestmentDetail[];
}

export interface YearlyInvestments {
  contributions: number;
  returns: number;
  value: number;
  details: YearlyInvestmentDetails;
}

// --- Assets ---
export interface AssetDetail {
  id: string;
  startingValue: number;
  appreciation: number;
  endingValue: number;
  soldThisYear: boolean;
}

export interface YearlyAssetDetails {
  assets: AssetDetail[];
}

export interface YearlyAssets {
  appreciation: number;
  value: number;
  details: YearlyAssetDetails;
}

// --- yearly sheet ---
export interface YearlyBalanceSheet {
  year: number;
  income: YearlyIncome;
  expenses: YearlyExpenses;
  debt: YearlyDebt;
  investments: YearlyInvestments;
  assets: YearlyAssets;
  netCashFlow: number;
  cumulativeNetWorth: number;
}

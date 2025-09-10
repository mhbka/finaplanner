export interface IncomeStream {
  type: 'income_stream';
  id: string;
  start_year: number;
  end_year: number;
  gross_amount: number;
  annual_growth_rate: number;
  tax_treatment: string;
  effective_tax_rate: number;
  description: string;
  currency: string;
  location: string;
}

export interface RecurringExpense {
  type: 'recurring_expense';
  id: string;
  start_year: number;
  end_year: number;
  annual_amount: number;
  category: string;
  inflation_adjusted: boolean;
  description: string;
  currency: string;
}

export interface OneTimeExpense {
  type: 'one_time_expense';
  id: string;
  year: number;
  amount: number;
  category: string;
  description: string;
  currency: string;
}

export interface OneTimeIncome {
  type: 'one_time_income';
  id: string;
  year: number;
  amount: number;
  tax_treatment: string;
  effective_tax_rate: number;
  description: string;
  currency: string;
}

export interface Debt {
  type: 'debt';
  id: string;
  start_year: number;
  principal: number;
  interest_rate: number;
  monthly_payment: number;
  description: string;
  currency: string;
}

export interface Investment {
  type: 'investment';
  id: string;
  start_year: number;
  end_year: number;
  percentage_of_available_income: number;
  annual_return_rate: number;
  description: string;
  currency: string;
}

export interface Asset {
  type: 'asset';
  id: string;
  purchase_year: number;
  sell_year?: number;
  purchase_expense_id: string;
  financing_debt_id?: string;
  annual_appreciation_rate: number;
  initial_value: number;
  description: string;
  currency: string;
}

export type FinancialElement =
  | IncomeStream
  | RecurringExpense
  | OneTimeExpense
  | OneTimeIncome
  | Debt
  | Investment
  | Asset;

export interface FinancialData {
  incomeStreams: IncomeStream[];
  recurringExpenses: RecurringExpense[];
  oneTimeExpenses: OneTimeExpense[];
  oneTimeIncomes: OneTimeIncome[];
  debts: Debt[];
  investments: Investment[];
  assets: Asset[];
}

export interface FinancialPlan {
  data: FinancialData;
  inflationRate: number;
  startYear: number;
  endYear: number;
}
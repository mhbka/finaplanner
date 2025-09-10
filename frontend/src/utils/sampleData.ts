import type { FinancialData } from "../types/financialElements";

export const SAMPLE_DATA: FinancialData = {
  incomeStreams: [
    {
      type: 'income_stream',
      id: 'income1',
      start_year: 2025,
      end_year: 2055,
      gross_amount: 80000,
      annual_growth_rate: 0.03,
      tax_treatment: 'Regular W2',
      effective_tax_rate: 0.25,
      description: 'Software Engineer at TechCorp',
      currency: 'USD',
      location: 'San Francisco'
    },
    {
      type: 'income_stream',
      id: 'income2',
      start_year: 2030,
      end_year: 2045,
      gross_amount: 120000,
      annual_growth_rate: 0.04,
      tax_treatment: 'Regular W2',
      effective_tax_rate: 0.28,
      description: 'Senior Engineer Role',
      currency: 'USD',
      location: 'San Francisco'
    }
  ],
  recurringExpenses: [
    {
      type: 'recurring_expense',
      id: 'expense1',
      start_year: 2025,
      end_year: 2035,
      annual_amount: 36000,
      category: 'Housing',
      inflation_adjusted: true,
      description: 'Apartment Rent',
      currency: 'USD'
    }
  ],
  oneTimeExpenses: [
    {
      type: 'one_time_expense',
      id: 'onetime1',
      year: 2028,
      amount: 50000,
      category: 'Housing',
      description: 'House Down Payment',
      currency: 'USD'
    }
  ],
  oneTimeIncomes: [
    {
      type: 'one_time_income',
      id: 'onetimeincome1',
      year: 2027,
      amount: 25000,
      tax_treatment: 'Capital gains',
      effective_tax_rate: 0.15,
      description: 'Stock Vesting',
      currency: 'USD'
    }
  ],
  debts: [
    {
      type: 'debt',
      id: 'debt1',
      start_year: 2025,
      principal: 30000,
      interest_rate: 0.06,
      monthly_payment: 350,
      description: 'Student Loan',
      currency: 'USD'
    }
  ],
  investments: [
    {
      type: 'investment',
      id: 'investment1',
      start_year: 2025,
      end_year: 2065,
      percentage_of_available_income: 0.15,
      annual_return_rate: 0.07,
      description: '401k Retirement',
      currency: 'USD'
    }
  ],
  assets: [
    {
      type: 'asset',
      id: 'asset1',
      purchase_year: 2028,
      sell_year: 2048,
      purchase_expense_id: 'onetime1',
      annual_appreciation_rate: 0.03,
      initial_value: 250000,
      description: 'Primary Residence',
      currency: 'USD'
    }
  ]
};
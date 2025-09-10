import type { TimelineGroup } from "../types/timelineInfo";

export const TIMELINE_GROUPS: TimelineGroup[] = [
  { 
    key: 'incomeStreams',
    type: 'income_stream', 
    label: 'Income Streams', 
    tooltip: 'Sources of income you get regularly, like salary or rent from tenants.', 
    color: '#10b981' 
  },
  { 
    key: 'recurringExpenses', 
    type: 'recurring_expense',
    label: 'Recurring Expenses', 
    tooltip: 'Ongoing costs you pay regularly each year, such as rent, utilities, or subscriptions.', 
    color: '#ef4444' 
  },
  { 
    key: 'oneTimeExpenses', 
    type: 'one_time_expense',
    label: 'One-time Expenses', 
    tooltip: 'Single large payments, like buying a car, vacation costs, or repairs.', 
    color: '#f97316' 
  },
  { 
    key: 'oneTimeIncomes', 
    type: 'one_time_income',
    label: 'One-time Incomes', 
    tooltip: 'Occasional earnings such as bonuses, gifts, or asset sales.', 
    color: '#84cc16' 
  },
  { 
    key: 'debts', 
    type: 'debt',
    label: 'Debts', 
    tooltip: 'Money you owe, including loans, credit card balances, or mortgages.', 
    color: '#dc2626' 
  },
  { 
    key: 'investments', 
    type: 'investment',
    label: 'Investments', 
    tooltip: 'Money put into stocks, funds, or other assets, with a known or predicted growth rate.', 
    color: '#3b82f6' 
  },
  { 
    key: 'assets', 
    type: 'asset',
    label: 'Assets', 
    tooltip: 'Things you own, like property or vehicles, with an appreciating or depreciating value.', 
    color: '#8b5cf6' 
  }
];

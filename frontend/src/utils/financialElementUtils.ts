import type { FinancialElement } from '../types/financialElements';
import { v4 as uuidv4 } from 'uuid';

/** Returns the start year for the element. */
export const getStartYear = (element: FinancialElement): number => {
  if ('start_year' in element) return element.start_year;
  if ('year' in element) return element.year;
  if ('purchase_year' in element) return element.purchase_year;
  return 2025;
};

/** Returns the end year for the element. */
export const getEndYear = (element: FinancialElement): number => {
  if ('end_year' in element) return element.end_year;
  if ('year' in element) return element.year;
  if ('sell_year' in element && element.sell_year) return element.sell_year;
  if ('purchase_year' in element) return element.sell_year || 2070;
  return 2070;
};

/** Returns whether the element is a one-time type element. */
export const isOneTimeElement = (element: FinancialElement): boolean => {
  switch (element.type) {
    case "one_time_income":
      return true;
    case "one_time_expense":
      return true;
    default: 
      return false;
  }
};

/** Creates the given financial element's default. */
export function createDefaultElement<T extends FinancialElement["type"]>(
  type: T,
): Extract<FinancialElement, { type: T }> {
  const id = uuidv4();

  switch (type) {
    case "income_stream":
      return {
        type,
        id,
        start_year: new Date().getFullYear(),
        end_year: new Date().getFullYear() + 10,
        gross_amount: 0,
        annual_growth_rate: 0,
        tax_treatment: "standard",
        effective_tax_rate: 0,
        description: "",
        currency: "USD",
        location: "",
      } as Extract<FinancialElement, { type: T }>;
    case "recurring_expense":
      return {
        type,
        id,
        start_year: new Date().getFullYear(),
        end_year: new Date().getFullYear() + 10,
        annual_amount: 0,
        category: "",
        inflation_adjusted: true,
        description: "",
        currency: "USD",
      } as Extract<FinancialElement, { type: T }>;
    case "one_time_expense":
      return {
        type,
        id,
        year: new Date().getFullYear(),
        amount: 0,
        category: "",
        description: "",
        currency: "USD",
      } as Extract<FinancialElement, { type: T }>;
    case "one_time_income":
      return {
        type,
        id,
        year: new Date().getFullYear(),
        amount: 0,
        tax_treatment: "standard",
        effective_tax_rate: 0,
        description: "",
        currency: "USD",
      } as Extract<FinancialElement, { type: T }>;
    case "debt":
      return {
        type,
        id,
        start_year: new Date().getFullYear(),
        principal: 0,
        interest_rate: 0,
        monthly_payment: 0,
        description: "",
        currency: "USD",
      } as Extract<FinancialElement, { type: T }>;
    case "investment":
      return {
        type,
        id,
        start_year: new Date().getFullYear(),
        end_year: new Date().getFullYear() + 10,
        percentage_of_available_income: 0,
        annual_return_rate: 0,
        description: "",
        currency: "USD",
      } as Extract<FinancialElement, { type: T }>;
    case "asset":
      return {
        type,
        id,
        purchase_year: new Date().getFullYear(),
        sell_year: undefined,
        purchase_expense_id: "",
        financing_debt_id: undefined,
        annual_appreciation_rate: 0,
        initial_value: 0,
        description: "",
        currency: "USD",
      } as Extract<FinancialElement, { type: T }>;
    default:
      // Exhaustiveness check: TypeScript will error if we add a new type and don't handle it here
      const _exhaustiveCheck: never = type;
      throw new Error(`Unknown element type: ${_exhaustiveCheck}`);
  }
}
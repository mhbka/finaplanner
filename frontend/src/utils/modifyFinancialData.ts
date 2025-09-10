import type { FinancialPlan, FinancialElement, FinancialData } from "../types/financialElements";

/**
 * Add an element to the financial data.
 */
export function addToFinancialData(data: FinancialData, element: FinancialElement) {
    switch (element.type) {
    case "income_stream":
        data.incomeStreams.push(element);
        break;
    case "recurring_expense":
        data.recurringExpenses.push(element);
        break;
    case "one_time_expense":
        data.oneTimeExpenses.push(element);
        break;
    case "one_time_income":
        data.oneTimeIncomes.push(element);
        break;
    case "debt":
        data.debts.push(element);
        break;
    case "investment":
        data.investments.push(element);
        break;
    case "asset":
        data.assets.push(element);
        break;
    }
}

/**
 * Delete an element identified by its `elementId` from the financial data.
 */
export function deleteFromFinancialData(data: FinancialData, elementId: string): void {
  data.incomeStreams = data.incomeStreams.filter(el => el.id !== elementId);
  data.recurringExpenses = data.recurringExpenses.filter(el => el.id !== elementId);
  data.oneTimeExpenses = data.oneTimeExpenses.filter(el => el.id !== elementId);
  data.oneTimeIncomes = data.oneTimeIncomes.filter(el => el.id !== elementId);
  data.debts = data.debts.filter(el => el.id !== elementId);
  data.investments = data.investments.filter(el => el.id !== elementId);
  data.assets = data.assets.filter(el => el.id !== elementId);
}

/**
 * Replace an element identified by its `id` in the financial data.
 */
export function replaceInFinancialData(data: FinancialData, element: FinancialElement): void {
  switch (element.type) {
    case "income_stream":
      data.incomeStreams = data.incomeStreams.map(el =>
        el.id === element.id ? element : el
      );
      break;
    case "recurring_expense":
      data.recurringExpenses = data.recurringExpenses.map(el =>
        el.id === element.id ? element : el
      );
      break;
    case "one_time_expense":
      data.oneTimeExpenses = data.oneTimeExpenses.map(el =>
        el.id === element.id ? element : el
      );
      break;
    case "one_time_income":
      data.oneTimeIncomes = data.oneTimeIncomes.map(el =>
        el.id === element.id ? element : el
      );
      break;
    case "debt":
      data.debts = data.debts.map(el =>
        el.id === element.id ? element : el
      );
      break;
    case "investment":
      data.investments = data.investments.map(el =>
        el.id === element.id ? element : el
      );
      break;
    case "asset":
      data.assets = data.assets.map(el =>
        el.id === element.id ? element : el
      );
      break;
  }
}
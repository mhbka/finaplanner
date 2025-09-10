import type { FinancialData, FinancialElement } from "./financialElements";

export interface TimelineGroup {
  key: keyof FinancialData;
  type: FinancialElement["type"];
  label: string;
  tooltip: string;
  color: string;
}

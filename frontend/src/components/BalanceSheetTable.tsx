import type { FinancialPlan } from "../types/financialElements";
import { calculateBalanceSheet } from "../utils/calculateBalance";
import { BalanceSheetTableHeader } from "./balanceSheetTable/BalanceSheetTableHeader";
import { BalanceSheetTableRow } from "./balanceSheetTable/BalanceSheetTableRow";

interface YearlyBalanceSheetTableProps {
  plan: FinancialPlan;
}

// Displays the year-by-year financial breakdown for the user's plan.
export default function YearlyBalanceSheetTable({ plan }: YearlyBalanceSheetTableProps) {
  const data = calculateBalanceSheet(plan);
  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-center">To get started, create a financial plan.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="mb-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Financials</h2>
          <p className="text-gray-600">
            View a simplified year-by-year breakdown of how the numbers add up. 
            Modify the timeline and see updates immediately.
          </p>
        </div>
        <table className="w-full border border-gray-200 bg-white text-sm rounded-lg">
          <BalanceSheetTableHeader />
          <tbody>
            {data.map((yearData) => (
              <BalanceSheetTableRow key={yearData.year} yearData={yearData} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
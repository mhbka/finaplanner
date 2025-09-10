import type { FinancialPlan } from "../types/financialElements";
import { calculateBalanceSheet } from "../utils/calculateBalance";
import BalanceSheetGraph from "./BalanceSheetGraph";
import BalanceSheetTable from "./BalanceSheetTable";

interface BalanceSheetDetailsProps {
    plan: FinancialPlan
};

export const BalanceSheetDetails: React.FC<BalanceSheetDetailsProps> = ({ plan }) => {
    const data = calculateBalanceSheet(plan);
    if (!data || data.length === 0) {
        return <p className="text-gray-500 text-center">To get started, create a financial plan.</p>;
    }
    return (
        <div>
            <BalanceSheetGraph data={data} />
            <BalanceSheetTable data={data} />
        </div>
    );
}
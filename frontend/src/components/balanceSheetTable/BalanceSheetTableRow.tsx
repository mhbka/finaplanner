import type { YearlyBalanceSheet } from "../../types/financialBalanceElements";

export function BalanceSheetTableRow({ yearData }: { yearData: YearlyBalanceSheet }) {
    const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const netCashFlowClass = yearData.netCashFlow >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold';
    const cumulativeNetWorthClass = yearData.cumulativeNetWorth >= 0 ? 'text-green-700 font-bold' : 'text-red-700 font-bold';

    return (
        <tr key={yearData.year} className="border-t hover:bg-gray-50">
            <td className="px-4 py-2 font-medium text-left">{yearData.year}</td>
            <td className="px-4 py-2 text-left">{fmt(yearData.income.net)}</td>
            <td className="px-4 py-2 text-left">{fmt(yearData.expenses.total)}</td>
            <td className="px-4 py-2 text-left">{fmt(yearData.debt.totalPayment)}</td>
            <td className="px-4 py-2 text-left">{fmt(yearData.investments.contributions)}</td>
            <td className="px-4 py-2 text-left">{fmt(yearData.investments.returns)}</td>
            <td className="px-4 py-2 text-left">{fmt(yearData.investments.value)}</td>
            <td className="px-4 py-2 text-left">{fmt(yearData.assets.value)}</td>
            <td className={`px-4 py-2 text-left ${netCashFlowClass}`}>{fmt(yearData.netCashFlow)}</td>
            <td className={`px-4 py-2 text-left ${cumulativeNetWorthClass}`}>{fmt(yearData.cumulativeNetWorth)}</td>
        </tr>
    );
}
const BALANCE_SHEET_HEADER_VALUES = [
    "Year",
    "Net Income",
    "Expenses",
    "Debt Payments",
    "Investments (Contributions)",
    "Investments (Returns)",
    "Investments (Value)",
    "Assets (Value)",
    "Net Cash Flow",
    "Cumulative Net Worth",
];

export function BalanceSheetTableHeader() {
  return (
    <thead className="bg-gray-100">
      <tr>
        {BALANCE_SHEET_HEADER_VALUES.map((header) => (
          <th key={header} className="px-4 py-2 text-left first:text-left">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

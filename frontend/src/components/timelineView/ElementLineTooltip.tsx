import { type FC } from "react";
import type { FinancialElement } from "../../types/financialElements";

interface ElementLineTooltipProps {
  element: FinancialElement;
  x: number;
  y: number;
}

const ElementLineTooltip: FC<ElementLineTooltipProps> = ({ 
    element, 
    x, 
    y 
}) => {
  return (
    <div
      className="absolute bg-white text-black text-xs shadow-lg rounded-lg p-3 border border-gray-300 pointer-events-none z-50"
      style={{
        top: y + 12,
        left: x + 12,
        minWidth: "200px",
      }}
    >
      {"gross_amount" in element && (
        <>
          <div className="font-bold text-sm">{element.description}</div>
          <div>Years: {element.start_year} – {element.end_year}</div>
          <div>Gross: {element.currency} {element.gross_amount.toLocaleString()}</div>
          <div>Growth: {(element.annual_growth_rate * 100).toFixed(1)}%</div>
          <div>Tax: {element.tax_treatment} ({(element.effective_tax_rate * 100).toFixed(1)}%)</div>
          <div>Location: {element.location}</div>
        </>
      )}

      {"annual_amount" in element && (
        <>
          <div className="font-bold text-sm">{element.description}</div>
          <div>Years: {element.start_year} – {element.end_year}</div>
          <div>Annual: {element.currency} {element.annual_amount.toLocaleString()}</div>
          <div>Category: {element.category}</div>
          <div>Inflation adjusted: {element.inflation_adjusted ? "Yes" : "No"}</div>
        </>
      )}

      {"amount" in element && "year" in element && !("tax_treatment" in element) && (
        <>
          <div className="font-bold text-sm">{element.description}</div>
          <div>Year: {element.year}</div>
          <div>Amount: {element.currency} {element.amount.toLocaleString()}</div>
          <div>Category: {element.category}</div>
        </>
      )}

      {"amount" in element && "year" in element && "tax_treatment" in element && (
        <>
          <div className="font-bold text-sm">{element.description}</div>
          <div>Year: {element.year}</div>
          <div>Amount: {element.currency} {element.amount.toLocaleString()}</div>
          <div>Tax: {element.tax_treatment} ({(element.effective_tax_rate * 100).toFixed(1)}%)</div>
        </>
      )}

      {"principal" in element && (
        <>
          <div className="font-bold text-sm">{element.description}</div>
          <div>Start year: {element.start_year}</div>
          <div>Principal: {element.currency} {element.principal.toLocaleString()}</div>
          <div>Interest rate: {(element.interest_rate * 100).toFixed(2)}%</div>
          <div>Monthly payment: {element.currency} {element.monthly_payment.toLocaleString()}</div>
        </>
      )}

      {"percentage_of_available_income" in element && (
        <>
          <div className="font-bold text-sm">{element.description}</div>
          <div>Years: {element.start_year} – {element.end_year}</div>
          <div>Allocate: {(element.percentage_of_available_income * 100).toFixed(1)}%</div>
          <div>Return rate: {(element.annual_return_rate * 100).toFixed(1)}%</div>
        </>
      )}

      {"purchase_year" in element && (
        <>
          <div className="font-bold text-sm">{element.description}</div>
          <div>Purchase: {element.purchase_year}</div>
          {element.sell_year && <div>Sell: {element.sell_year}</div>}
          <div>Initial value: {element.currency} {element.initial_value.toLocaleString()}</div>
          <div>Annual appreciation: {(element.annual_appreciation_rate * 100).toFixed(1)}%</div>
        </>
      )}
    </div>
  );
};

export default ElementLineTooltip;

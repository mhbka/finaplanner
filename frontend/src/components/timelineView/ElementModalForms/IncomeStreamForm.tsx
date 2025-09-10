import { useState } from "react";
import type { IncomeStream } from "../../../types/financialElements";
import { buttonClassName, type ElementModalFormProps } from "./formUtils";
import { CustomInput } from "./CustomInput";

export const IncomeStreamForm: React.FC<ElementModalFormProps<IncomeStream>> = ({ element, onSave }) => {
  const [state, setState] = useState(element);
  
  return (
    <div className="flex flex-col gap-4">
      <CustomInput
        title="Description"
        tooltip="A brief description of this income stream"
        value={state.description}
        onChange={value => setState({ ...state, description: value as string })}
        required
      />
      
      <CustomInput
        title="Gross Amount"
        tooltip="Annual gross income amount before taxes and deductions"
        value={state.gross_amount}
        onChange={value => setState({ ...state, gross_amount: value as number })}
        type="number"
        required
      />
      
      <CustomInput
        title="Start Year"
        tooltip="The year this income stream begins"
        value={state.start_year}
        onChange={value => setState({ ...state, start_year: value as number })}
        type="number"
        required
      />
      
      <CustomInput
        title="End Year"
        tooltip="The year this income stream ends"
        value={state.end_year}
        onChange={value => setState({ ...state, end_year: value as number })}
        type="number"
        required
      />
      
      <CustomInput
        title="Currency"
        tooltip="The currency for this income (e.g., USD, EUR, SGD)"
        value={state.currency}
        onChange={value => setState({ ...state, currency: value as string })}
        required
      />
      
      <CustomInput
        title="Location"
        tooltip="The geographic location where this income is earned"
        value={state.location}
        onChange={value => setState({ ...state, location: value as string })}
      />
      
      <CustomInput
        title="Annual Growth Rate (%)"
        tooltip="Expected annual percentage increase in income"
        value={state.annual_growth_rate}
        onChange={value => setState({ ...state, annual_growth_rate: value as number })}
        type="number"
      />
      
      <CustomInput
        title="Tax Treatment"
        tooltip="How this income is treated for tax purposes"
        value={state.tax_treatment}
        onChange={value => setState({ ...state, tax_treatment: value as string })}
      />
      
      <CustomInput
        title="Effective Tax Rate (%)"
        tooltip="The effective tax rate applied to this income"
        value={state.effective_tax_rate}
        onChange={value => setState({ ...state, effective_tax_rate: value as number })}
        type="number"
      />
      
      <div className="flex gap-2 mt-2">
        <button onClick={() => onSave(state)} className={buttonClassName('blue')}>Save</button>
      </div>
    </div>
  );
};
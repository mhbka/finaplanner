import { useState } from "react";
import type { OneTimeIncome } from "../../../types/financialElements";
import { CustomInput } from "./CustomInput";
import { buttonClassName, type ElementModalFormProps } from "./formUtils";

export const OneTimeIncomeForm: React.FC<ElementModalFormProps<OneTimeIncome>> = ({ element, onSave }) => {
  const [state, setState] = useState(element);
  
  return (
    <div className="flex flex-col gap-4">
      <CustomInput
        title="Description"
        tooltip="A brief description of this one-time income"
        value={state.description}
        onChange={value => setState({ ...state, description: value as string })}
        required
      />
      
      <CustomInput
        title="Amount"
        tooltip="The total amount of this one-time income"
        value={state.amount}
        onChange={value => setState({ ...state, amount: value as number })}
        type="number"
        required
      />
      
      <CustomInput
        title="Year"
        tooltip="The year when this income is received"
        value={state.year}
        onChange={value => setState({ ...state, year: value as number })}
        type="number"
        required
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
      
      <CustomInput
        title="Currency"
        tooltip="The currency for this income (e.g., USD, EUR, SGD)"
        value={state.currency}
        onChange={value => setState({ ...state, currency: value as string })}
        required
      />
      
      <div className="flex gap-2 mt-2">
        <button onClick={() => onSave(state)} className={buttonClassName('blue')}>Save</button>
      </div>
    </div>
  );
};
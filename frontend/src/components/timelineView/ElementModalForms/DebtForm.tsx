import { useState } from "react";
import type { Debt } from "../../../types/financialElements";
import { CustomInput } from "./CustomInput";
import { buttonClassName, type ElementModalFormProps } from "./formUtils";

export const DebtForm: React.FC<ElementModalFormProps<Debt>> = ({ element, onSave }) => {
  const [state, setState] = useState(element);
  
  return (
    <div className="flex flex-col gap-4">
      <CustomInput
        title="Description"
        tooltip="A brief description of this debt (e.g., Mortgage, Credit Card, Student Loan)"
        value={state.description}
        onChange={value => setState({ ...state, description: value as string })}
        required
      />
      
      <CustomInput
        title="Principal"
        tooltip="The initial principal amount of the debt"
        value={state.principal}
        onChange={value => setState({ ...state, principal: value as number })}
        type="number"
        required
      />
      
      <CustomInput
        title="Interest Rate (%)"
        tooltip="The annual interest rate for this debt"
        value={state.interest_rate}
        onChange={value => setState({ ...state, interest_rate: value as number })}
        type="number"
        required
      />
      
      <CustomInput
        title="Monthly Payment"
        tooltip="The fixed monthly payment amount"
        value={state.monthly_payment}
        onChange={value => setState({ ...state, monthly_payment: value as number })}
        type="number"
        required
      />
      
      <CustomInput
        title="Start Year"
        tooltip="The year when this debt was acquired"
        value={state.start_year}
        onChange={value => setState({ ...state, start_year: value as number })}
        type="number"
        required
      />
      
      <CustomInput
        title="Currency"
        tooltip="The currency for this debt (e.g., USD, EUR, SGD)"
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
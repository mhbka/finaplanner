import { useState } from "react";
import type { Investment } from "../../../types/financialElements";
import { CustomInput } from "./CustomInput";
import { buttonClassName, type ElementModalFormProps } from "./formUtils";

export const InvestmentForm: React.FC<ElementModalFormProps<Investment>> = ({ element, onSave }) => {
  const [state, setState] = useState(element);
  
  return (
    <div className="flex flex-col gap-4">
      <CustomInput
        title="Description"
        tooltip="A brief description of this investment strategy"
        value={state.description}
        onChange={value => setState({ ...state, description: value as string })}
        required
      />
      
      <CustomInput
        title="Percentage of Available Income (%)"
        tooltip="What percentage of available income to invest annually"
        value={state.percentage_of_available_income}
        onChange={value => setState({ ...state, percentage_of_available_income: value as number })}
        type="number"
        required
      />
      
      <CustomInput
        title="Annual Return Rate (%)"
        tooltip="Expected annual return rate for this investment"
        value={state.annual_return_rate}
        onChange={value => setState({ ...state, annual_return_rate: value as number })}
        type="number"
        required
      />
      
      <CustomInput
        title="Start Year"
        tooltip="The year when this investment strategy begins"
        value={state.start_year}
        onChange={value => setState({ ...state, start_year: value as number })}
        type="number"
        required
      />
      
      <CustomInput
        title="End Year"
        tooltip="The year when this investment strategy ends"
        value={state.end_year}
        onChange={value => setState({ ...state, end_year: value as number })}
        type="number"
        required
      />
      
      <CustomInput
        title="Currency"
        tooltip="The currency for this investment (e.g., USD, EUR, SGD)"
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
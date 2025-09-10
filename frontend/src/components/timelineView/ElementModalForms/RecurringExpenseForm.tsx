import { useState } from "react";
import type { RecurringExpense } from "../../../types/financialElements";
import { CustomInput } from "./CustomInput";
import { buttonClassName, type ElementModalFormProps } from "./formUtils";

export const RecurringExpenseForm: React.FC<ElementModalFormProps<RecurringExpense>> = ({ element, onSave }) => {
  const [state, setState] = useState(element);
  
  return (
    <div className="flex flex-col gap-4">
      <CustomInput
        title="Description"
        tooltip="A brief description of this recurring expense"
        value={state.description}
        onChange={value => setState({ ...state, description: value as string })}
        required
      />
      
      <CustomInput
        title="Annual Amount"
        tooltip="Total annual amount for this expense"
        value={state.annual_amount}
        onChange={value => setState({ ...state, annual_amount: value as number })}
        type="number"
        required
      />
      
      <CustomInput
        title="Start Year"
        tooltip="The year this expense begins"
        value={state.start_year}
        onChange={value => setState({ ...state, start_year: value as number })}
        type="number"
        required
      />
      
      <CustomInput
        title="End Year"
        tooltip="The year this expense ends"
        value={state.end_year}
        onChange={value => setState({ ...state, end_year: value as number })}
        type="number"
        required
      />
      
      <CustomInput
        title="Category"
        tooltip="The category this expense belongs to (e.g., Housing, Food, Transportation)"
        value={state.category}
        onChange={value => setState({ ...state, category: value as string })}
      />
      
      <CustomInput
        title="Inflation Adjusted"
        tooltip="Whether this expense should be adjusted for inflation over time"
        value={state.inflation_adjusted}
        onChange={value => setState({ ...state, inflation_adjusted: value as boolean })}
        type="checkbox"
      />
      
      <CustomInput
        title="Currency"
        tooltip="The currency for this expense (e.g., USD, EUR, SGD)"
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
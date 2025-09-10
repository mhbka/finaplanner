import { useState } from "react";
import type { OneTimeExpense } from "../../../types/financialElements";
import { CustomInput } from "./CustomInput";
import { type ElementModalFormProps, buttonClassName } from "./formUtils";

export const OneTimeExpenseForm: React.FC<ElementModalFormProps<OneTimeExpense>> = ({ element, onSave }) => {
  const [state, setState] = useState(element);
  
  return (
    <div className="flex flex-col gap-4">
      <CustomInput
        title="Description"
        tooltip="A brief description of this one-time expense"
        value={state.description}
        onChange={value => setState({ ...state, description: value as string })}
        required
      />
      
      <CustomInput
        title="Amount"
        tooltip="The total amount of this one-time expense"
        value={state.amount}
        onChange={value => setState({ ...state, amount: value as number })}
        type="number"
        required
      />
      
      <CustomInput
        title="Year"
        tooltip="The year when this expense occurs"
        value={state.year}
        onChange={value => setState({ ...state, year: value as number })}
        type="number"
        required
      />
      
      <CustomInput
        title="Category"
        tooltip="The category this expense belongs to (e.g., Home, Vehicle, Medical)"
        value={state.category}
        onChange={value => setState({ ...state, category: value as string })}
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
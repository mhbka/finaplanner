import { useState } from "react";
import type { Asset } from "../../../types/financialElements";
import { CustomInput } from "./CustomInput";
import { buttonClassName, type ElementModalFormProps } from "./formUtils";

export const AssetForm: React.FC<ElementModalFormProps<Asset>> = ({ element, onSave }) => {
    const [state, setState] = useState(element);
    
    return (
      <div className="flex flex-col gap-4">
        <CustomInput
          title="Description"
          tooltip="A brief description of this asset (e.g., Primary Residence, Investment Property)"
          value={state.description}
          onChange={value => setState({ ...state, description: value as string })}
          required
        />
        
        <CustomInput
          title="Initial Value"
          tooltip="The initial purchase value or current market value of the asset"
          value={state.initial_value}
          onChange={value => setState({ ...state, initial_value: value as number })}
          type="number"
          required
        />
        
        <CustomInput
          title="Purchase Year"
          tooltip="The year when this asset was or will be purchased"
          value={state.purchase_year}
          onChange={value => setState({ ...state, purchase_year: value as number })}
          type="number"
          required
        />
        
        <CustomInput
          title="Sell Year"
          tooltip="The year when this asset will be sold (optional)"
          value={state.sell_year}
          onChange={value => setState({ ...state, sell_year: value ? value as number : undefined })}
          type="number"
        />
        
        <CustomInput
          title="Purchase Expense ID"
          tooltip="ID of the associated purchase expense entry"
          value={state.purchase_expense_id}
          onChange={value => setState({ ...state, purchase_expense_id: value as string })}
        />
        
        <CustomInput
          title="Financing Debt ID"
          tooltip="ID of the associated financing debt (e.g., mortgage) if applicable"
          value={state.financing_debt_id}
          onChange={value => setState({ ...state, financing_debt_id: value ? value as string : undefined })}
        />
        
        <CustomInput
          title="Annual Appreciation Rate (%)"
          tooltip="Expected annual appreciation rate for this asset"
          value={state.annual_appreciation_rate}
          onChange={value => setState({ ...state, annual_appreciation_rate: value as number })}
          type="number"
        />
        
        <CustomInput
          title="Currency"
          tooltip="The currency for this asset (e.g., USD, EUR, SGD)"
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
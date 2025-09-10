import React, { useState } from 'react';
import type { FinancialElement, IncomeStream, RecurringExpense, OneTimeExpense, OneTimeIncome, Debt, Investment, Asset } from '../../types/financialElements';
import { createPortal } from 'react-dom';

/** The styling for an input. */
const inputClassName = "border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full";

/** Obtain a button's styling. */
function buttonClassName(color: 'blue' | 'red' | 'grey' = 'blue'): string {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-500/80 hover:bg-blue-500/100 focus:ring-blue-300",
    red: "bg-red-500/80 hover:bg-red-500/100 focus:ring-red-300",
    grey: "bg-gray-500/80 hover:bg-gray-500/100 focus:ring-gray-300",
  };

  return `${colorMap[color] ?? colorMap.blue} text-white font-medium px-5 py-2.5 rounded-xl shadow-lg backdrop-blur-sm transition duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50`;
}

/* ----------------------------- */
/* Custom Input Component */
/* ----------------------------- */

interface CustomInputProps {
  title: string;
  tooltip?: string;
  value: string | number | boolean | undefined;
  onChange: (value: string | number | boolean) => void;
  type?: 'text' | 'number' | 'checkbox';
  placeholder?: string;
  required?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({ 
  title, 
  tooltip, 
  value, 
  onChange, 
  type = 'text', 
  placeholder,
  required = false 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'checkbox') {
      onChange(e.target.checked);
    } else if (type === 'number') {
      onChange(e.target.value ? Number(e.target.value) : '');
    } else {
      onChange(e.target.value);
    }
  };

  if (type === 'checkbox') {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 relative">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={handleChange}
            className="rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <label className="text-sm font-medium text-gray-700 cursor-pointer">
            {title}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {tooltip && (
            <div className="relative">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 text-xs w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                ?
              </button>
              {showTooltip && (
                <div className="absolute left-6 top-0 z-10 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  {tooltip}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">
          {title}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {tooltip && (
          <div className="relative">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 text-xs w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              ?
            </button>
            {showTooltip && (
              <div className="absolute left-6 top-0 z-10 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>
      <input
        type={type}
        className={inputClassName}
        placeholder={placeholder || title}
        value={value?.toString()}
        onChange={handleChange}
      />
    </div>
  );
};

/* ----------------------------- */
/* Main Modal Component */
/* ----------------------------- */

interface TimelineElementModalProps {
  element: FinancialElement;
  mode: 'edit' | 'create';
  onSave: (element: FinancialElement) => void;
  onDelete: (elementId: string) => void;
  closeModal: () => void;
}

/** The modal for editing/creating/deleting a financial element. */
const TimelineElementModal: React.FC<TimelineElementModalProps> = ({ element, mode, onSave, onDelete, closeModal }) => {
  const renderForm = () => {
    switch (element.type) {
      case 'income_stream':
        return <IncomeStreamForm element={element} onSave={onSave} onDelete={onDelete} />;
      case 'recurring_expense':
        return <RecurringExpenseForm element={element} onSave={onSave} onDelete={onDelete} />;
      case 'one_time_expense':
        return <OneTimeExpenseForm element={element} onSave={onSave} onDelete={onDelete} />;
      case 'one_time_income':
        return <OneTimeIncomeForm element={element} onSave={onSave} onDelete={onDelete} />;
      case 'debt':
        return <DebtForm element={element} onSave={onSave} onDelete={onDelete} />;
      case 'investment':
        return <InvestmentForm element={element} onSave={onSave} onDelete={onDelete} />;
      case 'asset':
        return <AssetForm element={element} onSave={onSave} onDelete={onDelete} />;
      default:
        return null;
    }
  };

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center 
                    bg-black/30 backdrop-blur-sm pointer-events-auto">
      <div className="bg-white/90 p-6 rounded-2xl shadow-lg w-full max-w-lg 
                      max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">
          {element ? 'Edit' : 'Create'} a financial element
        </h2>
        {renderForm()}
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={closeModal}
            className={buttonClassName('grey')}
          >
            Close
          </button>
          {mode === 'edit' && (
            <button
              onClick={() => onDelete(element.id)}
              className={buttonClassName('red')}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    createPortal(
      modal,
      document.body
    )
  );
};

export default TimelineElementModal;

/* ----------------------------- */
/* Self-contained forms for each type */
/* ----------------------------- */

interface FormProps<T extends FinancialElement> {
  element: T;
  onSave: (element: T) => void;
  onDelete: (elementId: string) => void;
}

const IncomeStreamForm: React.FC<FormProps<IncomeStream>> = ({ element, onSave }) => {
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

const RecurringExpenseForm: React.FC<FormProps<RecurringExpense>> = ({ element, onSave }) => {
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

const OneTimeExpenseForm: React.FC<FormProps<OneTimeExpense>> = ({ element, onSave }) => {
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

const OneTimeIncomeForm: React.FC<FormProps<OneTimeIncome>> = ({ element, onSave }) => {
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

const DebtForm: React.FC<FormProps<Debt>> = ({ element, onSave }) => {
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

const InvestmentForm: React.FC<FormProps<Investment>> = ({ element, onSave }) => {
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

const AssetForm: React.FC<FormProps<Asset>> = ({ element, onSave }) => {
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
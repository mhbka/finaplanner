import React, { useState } from 'react';
import type { FinancialElement } from '../../types/financialElements';
import { createPortal } from 'react-dom';
import { AssetForm } from './ElementModalForms/AssetForm';
import { DebtForm } from './ElementModalForms/DebtForm';
import { buttonClassName } from './ElementModalForms/formUtils';
import { IncomeStreamForm } from './ElementModalForms/IncomeStreamForm';
import { InvestmentForm } from './ElementModalForms/InvestmentForm';
import { OneTimeExpenseForm } from './ElementModalForms/OneTimeExpenseForm';
import { RecurringExpenseForm } from './ElementModalForms/RecurringExpenseForm';
import { OneTimeIncomeForm } from './ElementModalForms/OneTimeIncomeForm';

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
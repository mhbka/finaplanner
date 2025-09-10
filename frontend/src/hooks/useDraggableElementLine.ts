import { useState, useCallback, useEffect } from 'react';
import type { FinancialData, FinancialElement } from '../types/financialElements';
import { getStartYear, getEndYear } from '../utils/financialElementUtils';

/// The state of the dragging.
export interface DragState {
  elementId: string;
  type: string;
  handle: 'start' | 'end';
  startX: number;
  originalYear: number;
  timelineGroupRef: React.RefObject<HTMLDivElement | null>;
}

/// A hook handling drag-and-drop of an `ElementLine`'s start/end handle.
export const useDraggableElementLine = (
  data: FinancialData,
  setData: React.Dispatch<React.SetStateAction<FinancialData>>,
  pixelToYear: (pixel: number) => number,
  minYear: number,
  maxYear: number
) => {
  const [dragState, setDragState] = useState<DragState | null>(null);

  // Updates the corresponding financial element's start/end year
  const updateElementYear = useCallback((
    elementId: string,
    type: string,
    handle: 'start' | 'end',
    newYear: number
  ) => {
    setData(prev => {
      const newData = { ...prev };
      const groupKey = type as keyof typeof newData;
      const group = newData[groupKey];
      
      const elementIndex = group.findIndex((el) => el.id === elementId);
      if (elementIndex === -1) return prev;

      const element = { ...group[elementIndex] };
      
      if (handle === 'start') {
        if ('start_year' in element) {
          element.start_year = Math.min(newYear, getEndYear(element) - 1);
        } else if ('year' in element) {
          element.year = newYear;
        } else if ('purchase_year' in element) {
          element.purchase_year = newYear;
        }
      } else {
        if ('end_year' in element) {
          element.end_year = Math.max(newYear, getStartYear(element) + 1);
        } else if ('year' in element) {
          element.year = newYear;
        } else if ('sell_year' in element) {
          element.sell_year = Math.max(newYear, getStartYear(element) + 1);
        }
      }

      group[elementIndex] = element;
      return newData;
    });
  }, [setData]);

  // The actual callback returned. 
  const handleDragStart = useCallback((
    elementId: string,
    type: string,
    handle: 'start' | 'end',
    startX: number,
    timelineGroupRef: React.RefObject<HTMLDivElement | null>
  ) => {
    const allElements = [
      ...data.incomeStreams,
      ...data.recurringExpenses,
      ...data.oneTimeExpenses,
      ...data.oneTimeIncomes,
      ...data.debts,
      ...data.investments,
      ...data.assets
    ];
    
    const element = allElements.find(el => el.id === elementId);
    if (!element) return;

    const originalYear = handle === 'start' ? getStartYear(element) : getEndYear(element);
    setDragState({ elementId, type, handle, startX, originalYear, timelineGroupRef });
  }, [data]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState || !dragState.timelineGroupRef.current) return;

    const rect = dragState.timelineGroupRef.current.getBoundingClientRect();
    const relativeX = e.pageX - rect.left;
    const newYear = Math.max(minYear, Math.min(maxYear, pixelToYear(relativeX)));

    updateElementYear(dragState.elementId, dragState.type, dragState.handle, newYear);
  }, [dragState, pixelToYear, updateElementYear, minYear, maxYear]);

  const handleMouseUp = useCallback(() => {
    setDragState(null);
  }, []);

  useEffect(() => {
    if (dragState) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState, handleMouseMove, handleMouseUp]);

  return { handleDragStart };
};
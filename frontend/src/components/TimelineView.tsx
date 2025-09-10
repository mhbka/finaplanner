import { useState, type Dispatch, type SetStateAction } from 'react';
import type { FinancialData, FinancialElement } from '../types/financialElements';
import { useTimeline } from '../hooks/useTimeline';
import { useDraggableElementLine } from '../hooks/useDraggableElementLine';
import TimelineHeader from './timelineView/TimelineHeader';
import TimelineGroupComponent from './timelineView/TimelineGroup';
import { TIMELINE_GROUPS } from '../utils/timelineGroups';
import TimelineElementModal from './timelineView/TimelineElementModal';
import { addToFinancialData, deleteFromFinancialData, replaceInFinancialData } from '../utils/modifyFinancialData';
import { createDefaultElement } from '../utils/financialElementUtils';

interface TimelineViewProps {
  startYear: number;
  endYear: number;
  data: FinancialData;
  setData: Dispatch<SetStateAction<FinancialData>>;
} 

// A modifiable timeline view for a user's financial elements.
const TimelineView = ({
  startYear,
  endYear,
  data,
  setData
}: TimelineViewProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'edit' | 'create'>('edit');
  const [modalElement, setModalElement] = useState<FinancialElement>(createDefaultElement("income_stream"));

  // TODO: refactor this to remove timelineRef, or get timelineRef from TimelineGroup
  const { timelineRef, yearToPixel, pixelToYear } = useTimeline(startYear, endYear);
  const { handleDragStart } = useDraggableElementLine(data, setData, pixelToYear, startYear, endYear);

  // Opens the modal when an element is clicked.
  const handleClickElement = (element: FinancialElement) => {
    setModalOpen(true);
    setModalElement(element);
  };

  // Opens the modal when the 'add element' button is clicked.
  function handleClickAddElement(elementType: FinancialElement["type"]): void {
    setModalOpen(true);
    setModalElement(createDefaultElement(elementType));
  }

  // Closes the modal.
  const handleCloseElementModal = () => {
    setModalOpen(false);
  }

  // Handles the saving of a new element.
  const handleSaveNewElement = (element: FinancialElement) => {
    const newData = { ...data };
    addToFinancialData(newData, element);
    setData(newData);

    setModalOpen(false);
  }

  // Handles the saving of an edited element.
  const handleSaveEditedElement = (editedElement: FinancialElement) => {
    const newData = { ...data };
    replaceInFinancialData(newData, editedElement);
    setData(newData);

    setModalOpen(false);
  }

  const handleDeleteElement = (elementId: string) => {
    const newData = { ...data };
    deleteFromFinancialData(newData, elementId);
    setData(newData);

    setModalOpen(false);
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Timeline</h2>
          <p className="text-gray-600">
            Plan your financial situation over the years.
            Drag the ends of a line to adjust its period, click on a line to modify
            its information, or use the <span className="font-medium">+</span> button
            to add new items.
          </p>
        </div>
        
        <div ref={timelineRef}>
          <TimelineHeader
            minYear={startYear}
            maxYear={endYear}
        />
          
          <div className="space-y-4">
            {TIMELINE_GROUPS.map((group) => (
              <TimelineGroupComponent
                key={group.key}
                group={group}
                elements={data[group.key] as FinancialElement[]}
                minYear={startYear}
                maxYear={endYear}
                onElementClick={handleClickElement}
                onDragStart={handleDragStart}
                onAddElement={handleClickAddElement}
              />
            ))}
          </div>
        </div>

        {modalOpen && <TimelineElementModal 
          element={modalElement}
          mode={modalMode}
          onSave={modalMode == 'create' ? handleSaveNewElement : handleSaveEditedElement}
          onDelete={handleDeleteElement}  
          closeModal={handleCloseElementModal}
        />}
      </div>
    </div>
  );
};

export default TimelineView;
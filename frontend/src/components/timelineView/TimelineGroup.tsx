import React, { useRef } from 'react';
import { Plus, Info } from 'lucide-react';
import type { FinancialElement } from '../../types/financialElements';
import type { TimelineGroup as TimelineGroupType } from '../../types/timelineInfo';
import ElementLine from './ElementLine';

interface TimelineGroupProps {
  group: TimelineGroupType;
  elements: FinancialElement[];
  minYear: number;
  maxYear: number;
  onElementClick: (element: FinancialElement, type: string) => void;
  onDragStart: (elementId: string, type: string, handle: 'start' | 'end', startX: number, timelineGroupRef: React.RefObject<HTMLDivElement | null>) => void;
  onAddElement: (type: FinancialElement["type"]) => void;
}

const TimelineGroup: React.FC<TimelineGroupProps> = ({
  group,
  elements,
  minYear,
  maxYear,
  onElementClick,
  onDragStart,
  onAddElement
}) => {
  const maxElements = Math.max(elements.length, 1);
  const yearsVisible = maxYear - minYear;

  let ref = useRef<HTMLDivElement>(null);

  // Callback for calculating the "percentage" of a cursor's x-coordinate relative to this component's width.
  const calculateXPercentFromCursor = (cursorX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 0;
    return ((cursorX - rect.left) / rect.width) * 100;
  };

  return (
   <div className="border-l-4 pl-4" style={{ borderColor: group.color }}>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <h3 className="font-medium text-gray-700">{group.label}</h3>

        <div className="flex items-center gap-2">
          {/* Info icon with tooltip */}
          <div className="relative group">
            <Info
              size={16}
              className="cursor-help text-gray-400 hover:text-gray-600 transition-colors"
            />
            <div
              className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-white text-black text-xs shadow-lg rounded-lg p-3 border border-gray-300 pointer-events-none z-50 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ width: "200px" }}
            >
              {group.tooltip}
            </div>
          </div>
          {/* Add button */}
          <button
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            onClick={() => onAddElement(group.type)}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>

    <div className="relative" style={{ height: `${maxElements * 24 + 16}px` }} ref={ref}>
      {elements.map((element, index) => (
        <ElementLine
          key={element.id}
          element={element}
          type={group.key}
          color={group.color}
          index={index}
          minYear={minYear}
          maxYear={maxYear}
          yearsVisible={yearsVisible}
          timelineGroupRef={ref}
          calculateXPercentFromCursor={calculateXPercentFromCursor}
          onElementClick={onElementClick}
          onDragStart={onDragStart}
        />
      ))}
    </div>
  </div>

  );
};

export default TimelineGroup;
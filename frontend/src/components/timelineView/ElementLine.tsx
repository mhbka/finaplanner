import { useState, useEffect, useRef } from 'react';
import { getStartYear, getEndYear, isOneTimeElement } from '../../utils/financialElementUtils';
import ElementLineTooltip from './ElementLineTooltip';
import { createPortal } from 'react-dom';
import type { FinancialElement } from '../../types/financialElements';

export interface ElementLineProps {
  element: FinancialElement;
  type: string;
  color: string;
  index: number;
  minYear: number;
  maxYear: number;
  yearsVisible: number;
  timelineGroupRef: React.RefObject<HTMLDivElement | null>;
  calculateXPercentFromCursor: (cursorXPosition: number) => number;
  onElementClick: (element: FinancialElement, type: string) => void;
  onDragStart: (elementId: string, type: string, handle: 'start' | 'end', startX: number, timelineGroupRef: React.RefObject<HTMLDivElement | null>) => void;
}

const HandleButton: React.FC<{ 
  color: string; 
  position: 'left' | 'right' | 'center';
  alwaysVisible: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}> = ({ color, position, alwaysVisible, onMouseDown }) => {
  const positionStyles = {
    left: 'left-0 -translate-x-1/2',
    right: 'right-0 translate-x-1/2', 
    center: 'left-1/2 -translate-x-1/2'
  };
  const shapeClass = position === 'center' 
    ? 'rotate-45' 
    : 'rounded-full';
  const visibilityClass = alwaysVisible ? 'opacity-100' : 'opacity-0';

  return (
    <div
      className={`absolute w-4 h-4 border-2 bg-white cursor-ew-resize ${visibilityClass} group-hover:opacity-100 transition-opacity z-10 top-1/2 -translate-y-1/2 ${positionStyles[position]} ${shapeClass}`}
      style={{ borderColor: color }}
      onMouseDown={onMouseDown}
    />
  );
};

const ElementLine: React.FC<ElementLineProps> = ({
  element,
  type,
  color,
  index,
  minYear,
  yearsVisible,
  timelineGroupRef,
  calculateXPercentFromCursor,
  onElementClick,
  onDragStart,
}) => {
  const startYear = getStartYear(element);
  const endYear = getEndYear(element);
  const isOneTime = isOneTimeElement(element);

  const committedLeftPercent = ((startYear - minYear) / yearsVisible) * 100;
  const committedRightPercent = isOneTime ? committedLeftPercent : Math.min(100, ((endYear - minYear) / yearsVisible) * 100);

  const [dragging, setDragging] = useState(false);
  const [visualLeftPercent, setVisualLeftPercent] = useState(committedLeftPercent);
  const [visualRightPercent, setVisualRightPercent] = useState(committedRightPercent);
  const [hovered, setHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  
  const justDraggedRef = useRef(false);

  // Sync visual state with committed values when not dragging
  useEffect(() => {
    if (!dragging) {
      setVisualLeftPercent(committedLeftPercent);
      setVisualRightPercent(committedRightPercent);
    }
  }, [committedLeftPercent, committedRightPercent, dragging]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursor({ x: e.pageX, y: e.pageY });
  };

  const handleMouseDown = (e: React.MouseEvent, handle: 'start' | 'end') => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragging(true);
    justDraggedRef.current = true;

    const handleMouseMoveWindow = (moveEvent: MouseEvent) => {
      let rawPercent = calculateXPercentFromCursor(moveEvent.screenX);
      if (handle === 'start') rawPercent -= 2;
      rawPercent = Math.max(0, Math.min(rawPercent, 100));

      if (isOneTime) {
        setVisualLeftPercent(rawPercent);
      } else if (handle === 'start') {
        setVisualLeftPercent(Math.min(rawPercent, committedRightPercent - 2));
      } else {
        setVisualRightPercent(Math.max(rawPercent, committedLeftPercent + 2));
      }

      setCursor({ x: moveEvent.pageX, y: moveEvent.pageY });
      onDragStart(element.id, type, handle, moveEvent.pageX, timelineGroupRef);
    };

    const handleMouseUpWindow = () => {
      setDragging(false);
      setTimeout(() => justDraggedRef.current = false, 0);
      window.removeEventListener('mousemove', handleMouseMoveWindow);
      window.removeEventListener('mouseup', handleMouseUpWindow);
    };

    window.addEventListener('mousemove', handleMouseMoveWindow);
    window.addEventListener('mouseup', handleMouseUpWindow);
  };

  const handleClick = () => {
    if (!justDraggedRef.current) {
      onElementClick(element, type);
    }
  };

  return (
    <div
      className="absolute flex items-center group cursor-pointer"
      style={{
        left: `${visualLeftPercent}%`,
        width: isOneTime ? '0px' : `${visualRightPercent - visualLeftPercent}%`,
        top: `${index * 24 + 8}px`,
        height: '8px'
      }}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Main line/marker */}
      <div 
        className={isOneTime 
          ? "absolute h-full w-[2px]" 
          : "absolute inset-0 h-2 rounded transition-all hover:h-3 top-1/2 -translate-y-1/2"
        }
        style={{ backgroundColor: color }} 
      />

      {/* Handles */}
      {isOneTime ? (
        <HandleButton 
          color={color} 
          position="center" 
          alwaysVisible={true}
          onMouseDown={(e) => handleMouseDown(e, 'end')} 
        />
      ) : (
        <>
          <HandleButton 
            color={color} 
            position="left" 
            alwaysVisible={false}
            onMouseDown={(e) => handleMouseDown(e, 'start')} 
          />
          <HandleButton 
            color={color} 
            position="right" 
            alwaysVisible={false}
            onMouseDown={(e) => handleMouseDown(e, 'end')} 
          />
        </>
      )}

      {/* Tooltip */}
      {(hovered || dragging) &&
        createPortal(
          <ElementLineTooltip element={element} x={cursor.x} y={cursor.y} />,
          document.body
        )}
    </div>
  );
};

export default ElementLine;
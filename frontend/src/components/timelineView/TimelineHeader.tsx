import React, { type ReactElement } from 'react';

interface TimelineHeaderProps {
  minYear: number;
  maxYear: number;
}
 
const TimelineHeader: React.FC<TimelineHeaderProps> = ({ minYear, maxYear }) => {
  const yearLabels: ReactElement[] = [];
  const yearRange = maxYear - minYear;
  
  for (let year = minYear; year <= maxYear; year += 5) {
    const position = yearRange === 0 ? 50 : ((year - minYear) / yearRange) * 100;
    const isFirst = year === minYear;
    const isLast = year === maxYear;
    
    let className = "absolute top-0 text-xs text-gray-500";
    let style: React.CSSProperties = {};
    
    if (isFirst) {
      // Align first label to the left
      className += " left-0";
    } else if (isLast) {
      // Align last label to the right
      className += " right-0";
    } else {
      // Center other labels
      className += " transform -translate-x-1/2";
      style.left = `${position}%`;
    }
    
    yearLabels.push(
      <div
        key={year}
        className={className}
        style={style}
      >
        {year}
      </div>
    );
  }
  
  return (
    <div className="relative h-8 mb-4 border-l-4" style={{ borderColor: 'black' }}>
      <div className="relative h-full ml-4">
        {yearLabels}
      </div>
    </div>
  );
};

export default TimelineHeader;
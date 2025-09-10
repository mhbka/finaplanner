import { useRef, useCallback } from 'react';

export const useTimeline = (minYear: number, maxYear: number) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const yearsVisible = maxYear - minYear;

  const yearToPixel = useCallback((year: number) => {
    const timelineWidth = timelineRef.current?.clientWidth || 800;
    return ((year - minYear) / yearsVisible) * timelineWidth;
  }, [minYear, yearsVisible]);

  const pixelToYear = useCallback((pixel: number) => {
    const timelineWidth = timelineRef.current?.clientWidth || 800;
    return Math.round(minYear + (pixel / timelineWidth) * yearsVisible);
  }, [minYear, yearsVisible]);

  return { timelineRef, yearToPixel, pixelToYear };
};
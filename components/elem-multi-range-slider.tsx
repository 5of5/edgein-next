import React, { useEffect, useRef, useCallback } from 'react';

type Props = {
  value: Array<number>;
  min: number;
  max: number;
  step?: number;
  onChange: Function;
};

export const ElemMultiRangeSlider: React.FC<Props> = ({
  value,
  min,
  max,
  step = 1,
  onChange,
}) => {
  const [minVal, maxVal] = value;
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  return (
    <div className="flex items-center justify-center h-6">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        step={step}
        ref={minValRef}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const val = Math.min(+event.target.value, +maxVal - 1);
          onChange({ min: val, max: maxVal });
          event.target.value = val.toString();
        }}
        className={`thumb ${minVal > max - 100 ? 'z-50' : 'z-30'}`}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        step={step}
        ref={maxValRef}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const val = Math.max(+event.target.value, +minVal + 1);
          onChange({ min: minVal, max: val });
          event.target.value = val.toString();
        }}
        className="thumb z-40"
      />

      <div className="relative w-full -mt-1">
        <div className="absolute rounded-full w-full h-1 bg-slate-300 z-10"></div>
        <div
          ref={range}
          className="absolute rounded h-1 bg-primary-500 z-20 max-w-full"></div>
      </div>
    </div>
  );
};

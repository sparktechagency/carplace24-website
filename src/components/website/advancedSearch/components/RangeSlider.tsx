"use client";

type Props = {
  min: number;
  max: number;
  step?: number;
  value: { min: number; max: number };
  onChange: (v: { min: number; max: number }) => void;
};

const RangeSlider = ({ min, max, step = 1, value, onChange }: Props) => {
  const setMin = (v: number) => {
    const next = Math.min(v, value.max);
    onChange({ min: next, max: value.max });
  };
  const setMax = (v: number) => {
    const next = Math.max(v, value.min);
    onChange({ min: value.min, max: next });
  };
  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div className="relative h-10">
      <div className="mt-5 h-2 bg-gray-200 rounded-full" />
      <div
        className="absolute h-2 bg-green-600 rounded-full top-1/12 -translate-y-1/2"
        style={{ left: `${pct(value.min)}%`, right: `${100 - pct(value.max)}%` }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value.min}
        onChange={(e) => setMin(Number(e.target.value))}
        className="range-track-transparent range-thumb w-full appearance-none bg-transparent absolute left-0 right-0 top-1/12 -translate-y-3/3 z-20"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value.max}
        onChange={(e) => setMax(Number(e.target.value))}
        className="range-track-transparent range-thumb w-full appearance-none bg-transparent absolute left-0 right-0 top-1/12 -translate-y-3/3 z-20"
      />
    </div>
  );
};

export default RangeSlider;
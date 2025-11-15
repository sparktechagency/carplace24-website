"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface MileageRange {
  min: number;
  max: number;
}

interface MileageDropdownProps {
  value?: MileageRange;
  onSelect: (range: MileageRange) => void;
  startMileage?: number; // defaults to 0
  endMileage?: number; // defaults to 400_000
  unit?: string; // defaults to km
  histogramBins?: number; // number of bars
  histogram?: number[]; // optional counts per bin; otherwise synthetic
}

const MileageDropdown = ({
  value,
  onSelect,
  startMileage = 0,
  endMileage = 400_000,
  unit = "km",
  histogramBins = 30,
  histogram,
}: MileageDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [min, setMin] = useState<number>(value?.min ?? startMileage);
  const [max, setMax] = useState<number>(value?.max ?? endMileage);
  const [activeHandle, setActiveHandle] = useState<"min" | "max" | "none">(
    "none"
  );

  // Sync local state to prop
  useEffect(() => {
    if (value) {
      const clampedMin = Math.max(startMileage, Math.min(value.min, value.max));
      const clampedMax = Math.min(endMileage, Math.max(value.min, value.max));
      setMin(clampedMin);
      setMax(clampedMax);
    }
  }, [value, startMileage, endMileage]);

  // Close when clicking outside
  useEffect(() => {
    const handlePointer = (event: MouseEvent | TouchEvent) => {
      if (!isOpen) return;
      const target = (event as any).target as Node;
      const insideMenu = !!menuRef.current && menuRef.current.contains(target);
      const insideTrigger =
        !!triggerRef.current && triggerRef.current.contains(target);
      if (!insideMenu && !insideTrigger) {
        setIsOpen(false);
        onSelect({ min, max });
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointer as any);
    document.addEventListener("touchstart", handlePointer as any, {
      passive: true,
    } as any);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer as any);
      document.removeEventListener("touchstart", handlePointer as any);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, min, max, onSelect]);

  const totalSpan = Math.max(1, endMileage - startMileage);
  const leftPercent = ((min - startMileage) / totalSpan) * 100;
  const rightPercent = ((max - startMileage) / totalSpan) * 100;
  const widthPercent = Math.max(0, rightPercent - leftPercent);

  // Build bars (synthetic falloff, or provided histogram)
  const bars = useMemo(() => {
    if (histogram && histogram.length > 0) return histogram;
    const arr: number[] = [];
    for (let i = 0; i < histogramBins; i++) {
      // Decreasing trend with slight noise
      const base = Math.max(1, Math.round((histogramBins - i) * 2));
      arr.push(base + (i % 3));
    }
    return arr;
  }, [histogram, histogramBins]);
  const maxBar = Math.max(...bars, 1);

  const handleMinChange = (v: number) => {
    const next = Math.min(v, max);
    setMin(next);
    onSelect({ min: next, max });
  };

  const handleMaxChange = (v: number) => {
    const next = Math.max(v, min);
    setMax(next);
    onSelect({ min, max: next });
  };

  const restore = () => {
    setMin(startMileage);
    setMax(endMileage);
    onSelect({ min: startMileage, max: endMileage });
  };

  const plus = max === endMileage ? "+" : "";
  const label = `${min.toLocaleString()} ${unit} – ${max.toLocaleString()}${plus} ${unit}`;

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xs text-gray-500">Mileage</h1>
        <button
          onClick={restore}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Restore
        </button>
      </div>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full cursor-pointer px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none"
      >
        <span>{label}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-3"
        >
          {/* Histogram */}
          <div className="relative">
            <div className="flex items-end gap-[2px] h-24 overflow-hidden">
              {bars.map((b, idx) => {
                const height = Math.max(2, Math.round((b / maxBar) * 90));
                // Determine if bin falls within selected range
                const binStart = startMileage + (idx / bars.length) * totalSpan;
                const binEnd = startMileage + ((idx + 1) / bars.length) * totalSpan;
                const active = binEnd >= min && binStart <= max;
                return (
                  <div
                    key={idx}
                    className={`w-[4px] ${active ? "bg-gray-600" : "bg-gray-300"}`}
                    style={{ height }}
                  />
                );
              })}
            </div>

            {/* Range slider */}
            <div
              className="mt-3 relative h-6"
              ref={sliderRef}
              onMouseDownCapture={(e) => {
                const rect = sliderRef.current?.getBoundingClientRect();
                if (!rect) return;
                const x = e.clientX - rect.left;
                const w = rect.width || 1;
                const minX = (leftPercent / 100) * w;
                const maxX = (rightPercent / 100) * w;
                const closerToMin = Math.abs(x - minX) <= Math.abs(x - maxX);
                setActiveHandle(closerToMin ? "min" : "max");
              }}
              onTouchStartCapture={(e) => {
                const touch = e.touches[0];
                if (!touch) return;
                const rect = sliderRef.current?.getBoundingClientRect();
                if (!rect) return;
                const x = touch.clientX - rect.left;
                const w = rect.width || 1;
                const minX = (leftPercent / 100) * w;
                const maxX = (rightPercent / 100) * w;
                const closerToMin = Math.abs(x - minX) <= Math.abs(x - maxX);
                setActiveHandle(closerToMin ? "min" : "max");
              }}
            >
              {/* Base track */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 bg-gray-200 rounded-lg" />
              {/* Selected range fill */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-2 bg-gray-400/70 rounded-lg"
                style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
              />
              {/* Handles */}
              <input
                type="range"
                min={startMileage}
                max={endMileage}
                value={min}
                onChange={(e) => handleMinChange(Number(e.target.value))}
                className={`range-track-transparent range-thumb w-full appearance-none bg-transparent absolute left-0 right-0 top-1/3 -translate-y-1/3 z-20 ${
                  activeHandle === "min"
                    ? "pointer-events-auto cursor-pointer"
                    : "pointer-events-none"
                }`}
              />
              <input
                type="range"
                min={startMileage}
                max={endMileage}
                value={max}
                onChange={(e) => handleMaxChange(Number(e.target.value))}
                className={`range-track-transparent range-thumb w-full appearance-none bg-transparent absolute left-0 right-0 top-1/3 -translate-y-1/3 z-20 ${
                  activeHandle === "max"
                    ? "pointer-events-auto cursor-pointer"
                    : "pointer-events-none"
                }`}
              />
            </div>
          </div>

          {/* Value boxes */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="border rounded-md px-3 py-2 flex items-center gap-2">
              <span className="text-xs text-gray-500">{unit}</span>
              <input
                type="number"
                min={startMileage}
                max={max}
                value={min}
                onChange={(e) => handleMinChange(Number(e.target.value))}
                className="w-full bg-transparent text-sm text-gray-700 focus:outline-none"
              />
            </div>
            <div className="border rounded-md px-3 py-2 flex items-center gap-2">
              <span className="text-xs text-gray-500">{unit}</span>
              <input
                type="number"
                min={min}
                max={endMileage}
                value={max}
                onChange={(e) => handleMaxChange(Number(e.target.value))}
                className="w-full bg-transparent text-sm text-gray-700 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MileageDropdown;
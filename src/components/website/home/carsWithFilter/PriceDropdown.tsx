"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface PriceRange {
  min: number;
  max: number;
}

interface PriceDropdownProps {
  value?: PriceRange;
  onSelect: (range: PriceRange) => void;
  startPrice?: number; // defaults to 0
  endPrice?: number; // defaults to 1_000_000
  currency?: string; // defaults to CHF
  histogram?: number[]; // optional counts per bin; otherwise synthetic
  showLeaseOption?: boolean; // show checkbox like the reference image
  leaseAvailable?: boolean;
  onLeaseToggle?: (v: boolean) => void;
}

const PriceDropdown = ({
  value,
  onSelect,
  startPrice = 0,
  endPrice = 1_000_000,
  currency = "CHF",
  histogram,
  showLeaseOption = true,
  leaseAvailable,
  onLeaseToggle,
}: PriceDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [min, setMin] = useState<number>(value?.min ?? startPrice);
  const [max, setMax] = useState<number>(value?.max ?? endPrice);
  const [lease, setLease] = useState<boolean>(!!leaseAvailable);
  const [activeHandle, setActiveHandle] = useState<"min" | "max" | "none">(
    "none"
  );
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const clampedMin = Math.max(startPrice, Math.min(value.min, value.max));
      const clampedMax = Math.min(endPrice, Math.max(value.min, value.max));
      setMin(clampedMin);
      setMax(clampedMax);
    }
  }, [value, startPrice, endPrice]);

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

  const totalSpan = Math.max(1, endPrice - startPrice);
  const leftPercent = ((min - startPrice) / totalSpan) * 100;
  const rightPercent = ((max - startPrice) / totalSpan) * 100;
  const widthPercent = Math.max(0, rightPercent - leftPercent);

  const reset = () => {
    setMin(startPrice);
    setMax(endPrice);
    onSelect({ min: startPrice, max: endPrice });
  };

  const formatCHF = (n: number) => {
    // Swiss grouping uses apostrophes for thousands
    return new Intl.NumberFormat("de-CH").format(n);
  };

  const bins = useMemo(() => {
    const binCount = 40; // enough to look like the reference image
    const arr = new Array(binCount).fill(0);
    if (histogram && histogram.length) {
      return histogram.slice(0, binCount);
    }
    // synthetic distribution: heavy middle, tapering ends
    for (let i = 0; i < binCount; i++) {
      const t = i / (binCount - 1);
      const peak = Math.exp(-Math.pow(t - 0.4, 2) * 12); // skewed peak
      arr[i] = Math.round(peak * 100 + Math.random() * 20);
    }
    return arr;
  }, [histogram]);

  const maxCount = Math.max(...bins, 1);

  const handleMinChange = (v: number) => {
    const next = Math.max(startPrice, Math.min(v, max));
    setMin(next);
    onSelect({ min: next, max });
  };

  const handleMaxChange = (v: number) => {
    const next = Math.min(endPrice, Math.max(v, min));
    setMax(next);
    onSelect({ min, max: next });
  };

  const label = `${currency} ${formatCHF(min)} – ${currency} ${formatCHF(max)}${
    max >= endPrice ? "+" : ""
  }`;

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xs text-gray-500">Price</h1>
        <button
          onClick={reset}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Reset
        </button>
      </div>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen((p) => !p)}
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
            <div className="flex items-end gap-[2px] h-24 overflow-hidden w-full">
              {bins?.map((c, idx) => {
                const h = Math.max(2, Math.round((c / maxCount) * 90));
                const binStart =
                  startPrice + Math.round((idx / bins.length) * totalSpan);
                const binEnd =
                  startPrice +
                  Math.round(((idx + 1) / bins.length) * totalSpan);
                const active = binEnd >= min && binStart <= max;
                return (
                  <div
                    key={idx}
                    className={`${active ? "bg-gray-600" : "bg-gray-300"} flex-1`}
                    style={{ height: h }}
                  />
                );
              })}
            </div>

            {/* Single track + dual handles */}
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
                const t = e.touches[0];
                if (!t) return;
                const rect = sliderRef.current?.getBoundingClientRect();
                if (!rect) return;
                const x = t.clientX - rect.left;
                const w = rect.width || 1;
                const minX = (leftPercent / 100) * w;
                const maxX = (rightPercent / 100) * w;
                const closerToMin = Math.abs(x - minX) <= Math.abs(x - maxX);
                setActiveHandle(closerToMin ? "min" : "max");
              }}
            >
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 bg-gray-200 rounded-lg" />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-2 bg-gray-400/70 rounded-lg"
                style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
              />
              <input
                type="range"
                min={startPrice}
                max={endPrice}
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
                min={startPrice}
                max={endPrice}
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

          {/* Inputs with currency labels */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="border rounded-md px-3 py-2">
              <div className="text-[12px] text-gray-500 mb-1">{currency}</div>
              <input
                type="number"
                min={startPrice}
                max={max}
                value={min}
                onChange={(e) => handleMinChange(Number(e.target.value))}
                className="w-full text-center text-sm text-gray-700 focus:outline-none"
              />
            </div>
            <div className="border rounded-md px-3 py-2">
              <div className="text-[12px] text-gray-500 mb-1">{currency}</div>
              <input
                type="number"
                min={min}
                max={endPrice}
                value={max}
                onChange={(e) => handleMaxChange(Number(e.target.value))}
                className="w-full text-center text-sm text-gray-700 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceDropdown;

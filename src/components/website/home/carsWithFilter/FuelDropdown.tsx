"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface FuelDropdownProps {
  options: string[]; // e.g., ["All", "Gasoline", "Diesel", "Electric", "Hybrid"]
  value?: string[]; // selected options (excluding "All" means All)
  onSelect: (selected: string[]) => void;
  counts?: Record<string, number>; // optional per-option counts
}

const FuelDropdown = ({ options, value, onSelect, counts }: FuelDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const allKey = useMemo(() => options.find((o) => o.toLowerCase() === "all") ?? "All", [options]);
  const itemOptions = useMemo(() => options.filter((o) => o.toLowerCase() !== "all"), [options]);

  const [selected, setSelected] = useState<string[]>(value ?? []);

  useEffect(() => {
    if (value) setSelected(value);
  }, [value]);

  // Close on outside click and submit selection
  useEffect(() => {
    const handlePointer = (event: MouseEvent | TouchEvent) => {
      if (!isOpen) return;
      const target = (event as any).target as Node;
      const insideMenu = !!menuRef.current && menuRef.current.contains(target);
      const insideTrigger = !!triggerRef.current && triggerRef.current.contains(target);
      if (!insideMenu && !insideTrigger) {
        setIsOpen(false);
        onSelect(selected);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handlePointer as any);
    document.addEventListener("touchstart", handlePointer as any, { passive: true } as any);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer as any);
      document.removeEventListener("touchstart", handlePointer as any);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, selected, onSelect]);

  const toggleAll = () => {
    setSelected([]); // empty means All
    onSelect([]);
  };

  const toggleItem = (item: string) => {
    setSelected((prev) => {
      const exists = prev.includes(item);
      const next = exists ? prev.filter((v) => v !== item) : [...prev, item];
      onSelect(next);
      return next;
    });
  };

  const restore = () => toggleAll();

  const label = selected.length === 0
    ? "All"
    : selected.length <= 2
    ? selected.join(", ")
    : `${selected.length} selected`;

  const formatCount = (n?: number) => (typeof n === "number" ? n.toLocaleString() : undefined);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xs text-gray-500">Fuel</h1>
        <button onClick={restore} className="text-xs text-gray-500 hover:text-gray-700">Restore</button>
      </div>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen((s) => !s)}
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
          <div className="space-y-2">
            {/* All option */}
            <label className="flex items-center justify-between gap-3 cursor-pointer">
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected.length === 0}
                  onChange={toggleAll}
                  className="accent-primary"
                />
                <span>All</span>
              </span>
              {formatCount(counts?.[allKey]) && (
                <span className="text-sm text-gray-500">{formatCount(counts?.[allKey])}</span>
              )}
            </label>

            {/* Individual fuel types */}
            {itemOptions.map((opt) => (
              <label key={opt} className="flex items-center justify-between gap-3 cursor-pointer">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(opt)}
                    onChange={() => toggleItem(opt)}
                    className="accent-primary"
                  />
                  <span>{opt}</span>
                </span>
                {formatCount(counts?.[opt]) && (
                  <span className="text-sm text-gray-500">{formatCount(counts?.[opt])}</span>
                )}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FuelDropdown;
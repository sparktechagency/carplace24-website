"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  options: string[];
};

const LocationDropdown = ({ value, onChange, options }: Props) => {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");

  const filtered = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [term, options]);

  const select = (city: string) => {
    onChange(city);
    setOpen(false);
    setTerm("");
  };

  const clear = () => {
    onChange("");
    setTerm("");
  };

  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointer = (e: Event) => {
      if (!open) return;
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointer as any);
    document.addEventListener(
      "touchstart",
      handlePointer as any,
      {
        passive: true,
      } as any
    );
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer as any);
      document.removeEventListener("touchstart", handlePointer as any);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="relative w-full" ref={rootRef}>
      <button
        type="button"
        className="w-full h-12 border rounded-lg px-3 flex items-center justify-between cursor-pointer bg-white"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-sm text-gray-700 truncate">
          {value ? value : "Select location"}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-[320px] max-w-[85vw] bg-white border rounded-lg shadow-lg z-50">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search city"
                className="w-full pl-8 pr-8 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
              {term && (
                <button
                  type="button"
                  onClick={() => setTerm("")}
                  className="absolute right-2 top-2.5 text-gray-400"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <div className="max-h-64 overflow-auto">
            {filtered.length === 0 ? (
              <div className="p-3 text-sm text-gray-500">
                No locations found
              </div>
            ) : (
              filtered.map((city) => (
                <button
                  key={city}
                  className="w-full text-left p-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => select(city)}
                >
                  <span className="text-sm text-gray-800">{city}</span>
                </button>
              ))
            )}
          </div>
          <div className="p-2 border-t flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {value ? `Selected: ${value}` : "No location selected"}
            </span>
            <button
              type="button"
              onClick={clear}
              className="text-xs px-2 py-1 border rounded cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDropdown;

"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Search } from "lucide-react";

interface YearDropdownProps {
  value?: string;
  onSelect: (year: string) => void;
  startYear?: number; // defaults to 1950
  endYear?: number; // defaults to current year
}

const YearDropdown = ({ value, onSelect, startYear = 1950, endYear }: YearDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentYear = endYear ?? new Date().getFullYear();
  const rangeStart = Math.min(startYear, currentYear);
  const rangeEnd = Math.max(startYear, currentYear);

  const years = Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => String(rangeEnd - i));
  const filteredYears = query ? years.filter((y) => y.includes(query)) : years;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (year: string) => {
    onSelect(year);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <h1 className="text-xs text-gray-500 mb-1">Year</h1>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full cursor-pointer px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none"
      >
        <span>{value || "Select year"}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          {/* Search */}
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search year"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Years list */}
          <div className="p-3 max-h-60 overflow-y-auto">
            <div className="grid grid-cols-4 gap-2">
              {filteredYears.map((y) => (
                <button
                  key={y}
                  className={`px-3 py-1 text-sm rounded-md border ${y === value ? "border-primary text-primary" : "border-gray-200 text-gray-700"} hover:bg-gray-50`}
                  onClick={() => handleSelect(y)}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YearDropdown;
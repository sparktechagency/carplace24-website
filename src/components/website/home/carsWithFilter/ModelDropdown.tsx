"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useGetModelByBrandQuery } from "@/redux/apiSlice/brandAndModalSlice";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface Model {
  _id: string;
  model: string;
  brand?: string;
}

interface ModelDropdownProps {
  brandId: string;
  onSelect: (modelId: string) => void;
  value?: string; // Model ID
}

const ModelDropdown = ({ brandId, onSelect, value }: ModelDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch models for the selected brand
  const {
    data: modelsData,
    isLoading,
    isError,
  } = useGetModelByBrandQuery(brandId, {
    skip: !brandId,
  });

  const models: Model[] = modelsData?.data || [];

  // Find the selected model name from the ID
  const selectedModelName = useMemo(() => {
    if (!value) return "";
    const found = models.find((m) => m._id === value);
    return found?.model || "";
  }, [value, models]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleModelSelect = (modelId: string) => {
    onSelect(modelId);
    setIsOpen(false);
  };

  // Filter models based on search term
  const filteredModels = useMemo(() => {
    let result = [...models];
    if (searchTerm) {
      result = result.filter((model) =>
        model.model.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    return result.sort((a, b) =>
      String(a.model).localeCompare(String(b.model)),
    );
  }, [models, searchTerm]);

  return (
    <div className="relative" ref={dropdownRef}>
      <h1 className="text-xs text-gray-500 mb-1">Model</h1>
      <div
        role="button"
        tabIndex={0}
        aria-disabled={!brandId}
        onClick={() => (!brandId ? undefined : setIsOpen(!isOpen))}
        onKeyDown={(e) => e.key === "Enter" && brandId && setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full cursor-pointer px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none ${
          !brandId ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {selectedModelName || (brandId ? "Select model" : "Brand first")}
        </span>
        <div className="flex items-center gap-1">
          {value && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect("");
              }}
              className="text-gray-400 hover:text-gray-600 p-0.5"
            >
              ×
            </button>
          )}
          <span className="text-gray-500">
            <MdOutlineKeyboardArrowDown size={20} />
          </span>
        </div>
      </div>

      {isOpen && brandId && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          {/* Search */}
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search model"
                className="w-full pl-8 pr-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="p-4 text-center text-xs text-gray-500">
              Loading models...
            </div>
          )}

          {/* Error state */}
          {isError && (
            <div className="p-4 text-center text-xs text-red-500">
              Failed to load models.
            </div>
          )}

          {/* Models list */}
          {!isLoading && !isError && (
            <div className="max-h-60 overflow-y-auto">
              {filteredModels.length > 0 ? (
                <div className="py-1">
                  {filteredModels.map((model) => (
                    <div
                      translate="no"
                      key={model._id}
                      className={`px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                        value === model._id
                          ? "bg-primary/5 text-primary font-medium"
                          : ""
                      }`}
                      onClick={() => handleModelSelect(model._id)}
                    >
                      {model.model}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-gray-500">
                  No models found.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModelDropdown;

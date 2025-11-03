"use client";

import { useState } from "react";
import { ChevronDown, RotateCcw, Search, Settings2 } from "lucide-react";
import Container from "@/components/ui/container";
import BrandModelDropdown from "./BrandModelDropdown";

const vehicleTypes = [{ id: "car", label: "Car", icon: "🚗" }];

const filterOptions = [
  {
    id: "year",
    label: "Year",
    options: ["All", "2023", "2022", "2021", "2020", "2019"],
  },
  {
    id: "price",
    label: "Price Range",
    options: [
      "All",
      "$0-$10,000",
      "$10,000-$20,000",
      "$20,000-$30,000",
      "$30,000+",
    ],
  },
];

// Custom Dropdown Component
const Dropdown = ({
  label,
  options,
  onChange,
}: {
  label: string;
  options: string[];
  onChange: (option: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <div className="relative">
      <h1 className="text-xs text-gray-500 mb-1">{label}</h1>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full cursor-pointer px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none"
      >
        <span>{selectedOption}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterSection = () => {
  return (
    <div className="w-full lg:w-[1400px] bg-white shadow-md rounded-md">
      <Container>
        <div className="py-4">
          {/* Vehicle Type Selection */}
          <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:gap-6 mb-4">
            <div className="flex flex-wrap items-center gap-3 lg:gap-6">
              {vehicleTypes.map((type) => (
                <button
                  key={type.id}
                  className={`flex items-center gap-2 px-2 py-1 ${
                    type.id === "car" ? "text-primary" : "text-gray-700"
                  }`}
                >
                  <span className="text-lg">{type.icon}</span>
                  <span>{type.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-5 lg:ml-auto">
              <button className="flex items-center gap-1 text-green-600">
                <RotateCcw className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1 text-primary cursor-pointer">
                <Settings2 className="w-4 h-4" />{" "}
                <span className="text-sm">Advanced search</span>
              </div>
            </div>
          </div>

          {/* Filter Dropdowns and Search Button in a single row */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
              {/* Brand & Model Custom Dropdown */}
              <div className="lg:border-r lg:pr-4">
                <BrandModelDropdown 
                  onSelect={(brand) => console.log(`Selected brand: ${brand}`)} 
                />
              </div>
              
              {filterOptions.map((filter, index) => (
                <div
                  key={index}
                  className="lg:border-r lg:last:border-r-0 lg:pr-4 lg:last:pr-0"
                >
                  <Dropdown
                    label={filter.label}
                    options={filter.options}
                    onChange={(option) =>
                      console.log(`Selected ${filter.id}:`, option)
                    }
                  />
                </div>
              ))}
            </div>

            {/* Search Button */}
            <div className="w-full lg:w-auto lg:ml-4">
              <button className="bg-primary cursor-pointer text-white px-6 py-2 rounded-md flex items-center justify-center lg:justify-start h-[38px] hover:bg-primary/90 hover:shadow-md w-full lg:w-auto">
                <Search className="w-4 h-4 mr-2" />
                Search result
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FilterSection;

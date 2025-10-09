"use client";

import React, { useState } from "react";
import { ChevronDown, RotateCcw, Search, Settings2 } from "lucide-react";
import Container from "@/components/ui/container";

const vehicleTypes = [
  { id: "car", label: "Car", icon: "🚗" },
  { id: "truck", label: "Truck", icon: "🚚" },
  { id: "bus", label: "Bus", icon: "🚌" },
  { id: "commercial", label: "Commercial", icon: "🚐" },
  { id: "camper", label: "Camper", icon: "🚙" },
  { id: "motorcycles", label: "motorcycles", icon: "🏍️" },
];

const filterOptions = [
  {
    id: "brand",
    label: "Brande & Model",
    options: ["All", "Toyota", "Honda", "BMW", "Mercedes", "Audi"],
  },
  {
    id: "body",
    label: "Body type",
    options: ["All", "Sedan", "SUV", "Hatchback", "Coupe", "Convertible"],
  },
  {
    id: "condition",
    label: "Condition",
    options: ["All", "New", "Used", "Certified Pre-Owned"],
  },
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
  {
    id: "fuel",
    label: "Fuel",
    options: ["All", "Gasoline", "Diesel", "Electric", "Hybrid"],
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
    <div className="w-[1400px] bg-white shadow-md rounded-md">
      <Container>
        <div className="py-4">
          {/* Vehicle Type Selection */}
          <div className="flex flex-wrap items-center gap-6 mb-4">
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

            <div className="ml-auto flex items-center gap-5">
              <button className="flex items-center gap-1 text-green-600">
                <RotateCcw className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1 text-primary cursor-pointer">
                <Settings2 /> <span className="text-sm">Advanced search</span>
              </div>
            </div>
          </div>

          {/* Filter Dropdowns and Search Button in a single row */}
          <div className="flex items-end">
            <div className="grid grid-cols-6 gap-4 flex-1">
              {filterOptions.map((filter, index) => (
                <div
                  key={index}
                  className="border-r last:border-r-0 pr-4 last:pr-0"
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
            <div className="ml-4">
              <button className="bg-primary cursor-pointer text-white px-6 py-2 rounded-md flex items-center h-[38px] hover:bg-primary/90 hover:shadow-md">
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

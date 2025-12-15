"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, RotateCcw, Search, Settings2 } from "lucide-react";
import Container from "@/components/ui/container";
import BrandModelDropdown from "./BrandModelDropdown";
import YearDropdown from "./YearDropdown";
import PriceDropdown from "./PriceDropdown";
import { FaCar } from "react-icons/fa";
import Link from "next/link";

const vehicleTypes = [{ id: "car", label: "Car", icon: <FaCar /> }];

// Additional filters can be added later; price is custom
const filterOptions: { id: string; label: string; options: string[] }[] = [];

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

// Default values for comparison
const currentYear = new Date().getFullYear();
const defaultYearRange = { min: 1950, max: currentYear };
const defaultPriceRange = { min: 0, max: 1_000_000 };

const FilterSection = () => {
  const router = useRouter();

  // Filter state
  const [brand, setBrand] = useState<string>("");
  const [yearRange, setYearRange] = useState<{ min: number; max: number }>(
    defaultYearRange
  );
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>(
    defaultPriceRange
  );

  // Reset all filters
  const handleReset = () => {
    setBrand("");
    setYearRange(defaultYearRange);
    setPriceRange(defaultPriceRange);
  };

  // Check if any filters are active
  const hasActiveFilters =
    brand !== "" ||
    yearRange.min !== defaultYearRange.min ||
    yearRange.max !== defaultYearRange.max ||
    priceRange.min !== defaultPriceRange.min ||
    priceRange.max !== defaultPriceRange.max;

  // Handle search - navigate to vehicles page with filter params
  const handleSearch = () => {
    const params = new URLSearchParams();

    // Add brand if selected
    if (brand) {
      params.set("brand", brand);
    }

    // Add year range if different from default
    if (yearRange.min !== defaultYearRange.min) {
      params.set("yearFrom", String(yearRange.min));
    }
    if (yearRange.max !== defaultYearRange.max) {
      params.set("yearTo", String(yearRange.max));
    }

    // Add price range if different from default
    if (priceRange.min !== defaultPriceRange.min) {
      params.set("priceFrom", String(priceRange.min));
    }
    if (priceRange.max !== defaultPriceRange.max) {
      params.set("priceTo", String(priceRange.max));
    }

    // Navigate to vehicles page with params
    const queryString = params.toString();
    router.push(queryString ? `/vehicles?${queryString}` : "/vehicles");
  };

  return (
    <div className="w-full lg:w-[1200px] bg-white shadow-md rounded-md">
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
              <button
                className={`flex items-center gap-1 ${
                  hasActiveFilters ? "text-green-600" : "text-gray-400"
                }`}
                onClick={handleReset}
                title="Reset filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <Link href="/advanced-search">
                <div className="flex items-center gap-1 text-primary cursor-pointer">
                  <Settings2 className="w-4 h-4" />{" "}
                  <span className="text-sm">Advanced search</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Filter Dropdowns and Search Button in a single row */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
              {/* Brand & Model Custom Dropdown */}
              <div className="lg:border-r lg:pr-4">
                <BrandModelDropdown
                  value={brand}
                  onSelect={(brandId) => setBrand(brandId)}
                />
              </div>
              {/* Year free-entry selector */}
              <div className="lg:border-r lg:pr-4">
                <YearDropdown
                  value={yearRange}
                  onSelect={(range) => setYearRange(range)}
                />
              </div>
              {/* Price range dropdown like image */}
              <div className="lg:border-r lg:pr-4">
                <PriceDropdown
                  value={priceRange}
                  onSelect={(range) => setPriceRange(range)}
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
              <button
                onClick={handleSearch}
                className="bg-primary cursor-pointer text-white px-6 py-2 rounded-md flex items-center justify-center lg:justify-start h-[38px] hover:bg-primary/90 hover:shadow-md w-full lg:w-auto"
              >
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

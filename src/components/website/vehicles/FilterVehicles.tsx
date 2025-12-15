"use client";

import { useState } from "react";
import { ChevronDown, RotateCcw, Search, Settings2 } from "lucide-react";
import Container from "@/components/ui/container";
import Link from "next/link";
import BrandModelDropdown from "../home/carsWithFilter/BrandModelDropdown";
import YearDropdown from "../home/carsWithFilter/YearDropdown";
import PriceDropdown from "../home/carsWithFilter/PriceDropdown";
import MileageDropdown from "../home/carsWithFilter/MileageDropdown";
import FuelDropdown from "../home/carsWithFilter/FuelDropdown";
import { VehicleFilters } from "@/lib/useVehicleFilters";

// Filter options for Vehicles page
const bodyTypeOptions = [
  "All",
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Convertible",
];
const conditionOptions = ["All", "New", "Used", "Certified Pre-Owned"];
const transmissionOptions = ["All", "Automatic", "Manual"];
const fuelOptions = ["All", "Gasoline", "Diesel", "Electric", "Hybrid"];

// Reusable Dropdown component
const Dropdown = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (option: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const displayValue = value || options[0];

  const handleSelect = (option: string) => {
    setIsOpen(false);
    // If "All" is selected, clear the filter
    onChange(option === "All" ? "" : option);
  };

  return (
    <div className="relative">
      <h1 className="text-xs text-gray-500 mb-1">{label}</h1>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full cursor-pointer px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none"
      >
        <span>{displayValue || "All"}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className={`px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                (option === "All" && !value) || option === value
                  ? "bg-gray-100"
                  : ""
              }`}
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

interface FilterVehiclesProps {
  filters: VehicleFilters;
  setFilter: <K extends keyof VehicleFilters>(
    key: K,
    value: VehicleFilters[K]
  ) => void;
  setFilters: (newFilters: Partial<VehicleFilters>) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

const FilterVehicles = ({
  filters,
  setFilter,
  setFilters,
  resetFilters,
  hasActiveFilters,
}: FilterVehiclesProps) => {
  const fuelCounts: Record<string, number> = {
    All: 100000,
    Gasoline: 73418,
    Diesel: 27322,
    Hybrid: 36695,
    Electric: 15184,
  };

  return (
    <div className="bg-white shadow-2xl rounded-md">
      <Container>
        <div className="py-4">
          {/* Top row: search input + actions */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 w-full px-4 py-2 bg-white border border-gray-200 rounded-md">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Find your choice"
                  className="w-full bg-transparent text-sm focus:outline-none"
                  value={filters.searchTerm}
                  onChange={(e) => setFilter("searchTerm", e.target.value)}
                />
              </div>
            </div>

            <div className="h-8 w-px bg-gray-200" />

            <button
              className={`flex items-center gap-1 ${
                hasActiveFilters ? "text-green-600" : "text-gray-400"
              }`}
              onClick={resetFilters}
              title="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <Link href={"/advanced-search"}>
              <div className="flex items-center gap-1 text-primary cursor-pointer">
                <Settings2 className="w-4 h-4" />
                <span className="text-sm">Advanced search</span>
              </div>
            </Link>
          </div>

          {/* Mobile: single column */}
          <div className="lg:hidden flex flex-col gap-4">
            {/* Brand & Model combined dropdown */}
            <BrandModelDropdown
              value={filters.brand}
              onSelect={(brandId) => setFilter("brand", brandId)}
            />

            {/* Body Type */}
            <Dropdown
              label="Body type"
              options={bodyTypeOptions}
              value={filters.BodyType}
              onChange={(option) => setFilter("BodyType", option)}
            />

            {/* Condition */}
            <Dropdown
              label="Condition"
              options={conditionOptions}
              value={filters.condition}
              onChange={(option) => setFilter("condition", option)}
            />

            {/* Year */}
            <YearDropdown
              value={{ min: filters.yearFrom, max: filters.yearTo }}
              onSelect={(range) => {
                setFilters({ yearFrom: range.min, yearTo: range.max });
              }}
              startYear={1950}
              endYear={new Date().getFullYear()}
            />

            {/* Price */}
            <PriceDropdown
              value={{ min: filters.priceFrom, max: filters.priceTo }}
              onSelect={(range) => {
                setFilters({ priceFrom: range.min, priceTo: range.max });
              }}
            />

            {/* Mileage */}
            <MileageDropdown
              value={{ min: filters.milesFrom, max: filters.milesTo }}
              onSelect={(range) => {
                setFilters({ milesFrom: range.min, milesTo: range.max });
              }}
            />

            {/* Fuel */}
            <Dropdown
              label="Fuel Type"
              options={fuelOptions}
              value={filters.fuelType}
              onChange={(option) => setFilter("fuelType", option)}
            />

            {/* Transmission */}
            <Dropdown
              label="Transmission"
              options={transmissionOptions}
              value={filters.transmission}
              onChange={(option) => setFilter("transmission", option)}
            />
          </div>

          {/* Desktop: two rows */}
          <div className="hidden lg:flex lg:flex-col lg:gap-4">
            {/* First row: BrandModel | Body | Condition | Fuel | Year */}
            <div className="flex divide-x">
              <div className="flex-1 px-4">
                <BrandModelDropdown
                  value={filters.brand}
                  onSelect={(brandId) => setFilter("brand", brandId)}
                />
              </div>
              <div className="flex-1 px-4">
                <Dropdown
                  label="Body type"
                  options={bodyTypeOptions}
                  value={filters.BodyType}
                  onChange={(option) => setFilter("BodyType", option)}
                />
              </div>
              <div className="flex-1 px-4">
                <Dropdown
                  label="Condition"
                  options={conditionOptions}
                  value={filters.condition}
                  onChange={(option) => setFilter("condition", option)}
                />
              </div>
              <div className="flex-1 px-4">
                <Dropdown
                  label="Fuel Type"
                  options={fuelOptions}
                  value={filters.fuelType}
                  onChange={(option) => setFilter("fuelType", option)}
                />
              </div>
              <div className="flex-1 px-4">
                <YearDropdown
                  value={{ min: filters.yearFrom, max: filters.yearTo }}
                  onSelect={(range) => {
                    setFilters({ yearFrom: range.min, yearTo: range.max });
                  }}
                  startYear={1950}
                  endYear={new Date().getFullYear()}
                />
              </div>
            </div>

            {/* Second row: Price | Mileage | Transmission | Drive Type | spacer */}
            <div className="flex divide-x">
              <div className="flex-1 px-4">
                <PriceDropdown
                  value={{ min: filters.priceFrom, max: filters.priceTo }}
                  onSelect={(range) => {
                    setFilters({ priceFrom: range.min, priceTo: range.max });
                  }}
                />
              </div>
              <div className="flex-1 px-4">
                <MileageDropdown
                  value={{ min: filters.milesFrom, max: filters.milesTo }}
                  onSelect={(range) => {
                    setFilters({ milesFrom: range.min, milesTo: range.max });
                  }}
                />
              </div>
              <div className="flex-1 px-4">
                <Dropdown
                  label="Transmission"
                  options={transmissionOptions}
                  value={filters.transmission}
                  onChange={(option) => setFilter("transmission", option)}
                />
              </div>
              <div className="flex-1 px-4">
                <Dropdown
                  label="Drive Type"
                  options={["All", "FWD", "RWD", "AWD", "4WD"]}
                  value={filters.driveType}
                  onChange={(option) => setFilter("driveType", option)}
                />
              </div>
              {/* Spacer to keep 5 items per row visually */}
              <div className="flex-1 px-4" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FilterVehicles;

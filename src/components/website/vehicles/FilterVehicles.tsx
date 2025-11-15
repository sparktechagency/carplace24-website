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

// Filter options for Vehicles page (category removed)
const filterOptions = [
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
  { id: "buyLease", label: "Buy/Lease", options: ["All", "Buy", "Lease"] },
  {
    id: "year",
    label: "Year",
    options: ["All"],
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
    id: "mileage",
    label: "Mileage",
    options: ["All", "0-5k", "5k-20k", "20k-50k", "50k+"],
  },
  {
    id: "fuel",
    label: "Fuel",
    options: ["All", "Gasoline", "Diesel", "Electric", "Hybrid"],
  },
  { id: "gearbox", label: "Gearbox", options: ["All", "Automatic", "Manual"] },
];

// Reusable Dropdown component
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
  const [selectedOption, setSelectedOption] = useState(options?.[0] ?? "All");

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

const FilterVehicles = () => {
  const [yearRange, setYearRange] = useState<{ min: number; max: number }>({
    min: 1950,
    max: new Date().getFullYear(),
  });
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 200000,
  });
  const [mileageRange, setMileageRange] = useState<{ min: number; max: number}>(
    { min: 0, max: 400000 }
  );
  const [selectedFuels, setSelectedFuels] = useState<string[]>([]);
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
                />
              </div>
            </div>

            <div className="h-8 w-px bg-gray-200" />

            <button className="flex items-center gap-1 text-green-600">
              <RotateCcw className="w-4 h-4" />
            </button>
            <Link href={"/advanced-search"}>
              <div className="flex items-center gap-1 text-primary cursor-pointer">
                <Settings2 className="w-4 h-4" />
                <span className="text-sm">Advanced search</span>
              </div>
            </Link>
          </div>

          {/* Filters: single column on mobile; two rows on desktop with separators only between items */}
          {/* Mobile: single column */}
          <div className="lg:hidden flex flex-col gap-4">
            {/* Brand & Model combined dropdown */}
            <BrandModelDropdown
              onSelect={(brand) => {
                setSelectedBrand(brand);
                console.log("Selected brand:", brand);
              }}
            />

            {/* Filters */}
            {filterOptions.map((filter, index) => (
              <div key={`mobile-${filter.id}-${index}`}>
                {filter.id === "year" ? (
                  <YearDropdown
                    value={yearRange}
                    onSelect={(range) => {
                      setYearRange(range);
                      console.log(
                        `Selected year range: ${range.min}-${range.max}`
                      );
                    }}
                    startYear={1950}
                    endYear={new Date().getFullYear()}
                  />
                ) : filter.id === "price" ? (
                  <PriceDropdown
                    value={priceRange}
                    onSelect={(range) => {
                      setPriceRange(range);
                      console.log(
                        `Selected price range: ${range.min}-${range.max}`
                      );
                    }}
                  />
                ) : filter.id === "mileage" ? (
                  <MileageDropdown
                    value={mileageRange}
                    onSelect={(range) => {
                      setMileageRange(range);
                      console.log(
                        `Selected mileage range: ${range.min}-${range.max}`
                      );
                    }}
                  />
                ) : filter.id === "fuel" ? (
                  <FuelDropdown
                    options={filter.options}
                    value={selectedFuels}
                    counts={fuelCounts}
                    onSelect={(items) => {
                      setSelectedFuels(items);
                      console.log("Selected fuels:", items);
                    }}
                  />
                ) : (
                  <Dropdown
                    label={filter.label}
                    options={filter.options}
                    onChange={(option) =>
                      console.log(`Selected ${filter.id}:`, option)
                    }
                  />
                )}
              </div>
            ))}
          </div>

          {/* Desktop: two rows, separators only between items (no far-left/right lines) */}
          <div className="hidden lg:flex lg:flex-col lg:gap-4">
            {/* First row: BrandModel | Body | Condition | Buy/Lease | Year */}
            <div className="flex divide-x">
              <div className="flex-1 px-4">
                <BrandModelDropdown
                  onSelect={(brand) => {
                    setSelectedBrand(brand);
                    console.log("Selected brand:", brand);
                  }}
                />
              </div>
              <div className="flex-1 px-4">
                <Dropdown
                  label={filterOptions[0].label}
                  options={filterOptions[0].options}
                  onChange={(option) => console.log(`Selected body:`, option)}
                />
              </div>
              <div className="flex-1 px-4">
                <Dropdown
                  label={filterOptions[1].label}
                  options={filterOptions[1].options}
                  onChange={(option) =>
                    console.log(`Selected condition:`, option)
                  }
                />
              </div>
              <div className="flex-1 px-4">
                <Dropdown
                  label={filterOptions[2].label}
                  options={filterOptions[2].options}
                  onChange={(option) =>
                    console.log(`Selected buyLease:`, option)
                  }
                />
              </div>
              <div className="flex-1 px-4">
                <YearDropdown
                  value={yearRange}
                  onSelect={(range) => {
                    setYearRange(range);
                    console.log(
                      `Selected year range: ${range.min}-${range.max}`
                    );
                  }}
                  startYear={1950}
                  endYear={new Date().getFullYear()}
                />
              </div>
            </div>

            {/* Second row: Price | Mileage | Fuel | Gearbox | spacer */}
            <div className="flex divide-x">
              <div className="flex-1 px-4">
                <PriceDropdown
                  value={priceRange}
                  onSelect={(range) => {
                    setPriceRange(range);
                    console.log(
                      `Selected price range: ${range.min}-${range.max}`
                    );
                  }}
                />
              </div>
              <div className="flex-1 px-4">
                <MileageDropdown
                  value={mileageRange}
                  onSelect={(range) => {
                    setMileageRange(range);
                    console.log(
                      `Selected mileage range: ${range.min}-${range.max}`
                    );
                  }}
                />
              </div>
              <div className="flex-1 px-4">
                <FuelDropdown
                  options={filterOptions[6].options}
                  value={selectedFuels}
                  counts={fuelCounts}
                  onSelect={(items) => {
                    setSelectedFuels(items);
                    console.log("Selected fuels:", items);
                  }}
                />
              </div>
              {filterOptions[7] && (
                <div className="flex-1 px-4">
                  <Dropdown
                    label={filterOptions[7].label}
                    options={filterOptions[7].options}
                    onChange={(option) =>
                      console.log(`Selected gearbox:`, option)
                    }
                  />
                </div>
              )}
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

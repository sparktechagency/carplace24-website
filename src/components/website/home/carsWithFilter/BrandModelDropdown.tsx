"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, Search } from "lucide-react";
import Image from "next/image";

// Brand data with logos
const popularBrands = [
  {
    id: "mercedes",
    name: "Mercedes",
    logo: "https://www.carlogos.org/car-logos/mercedes-benz-logo.png",
  },
  {
    id: "bmw",
    name: "BMW",
    logo: "https://www.carlogos.org/car-logos/bmw-logo.png",
  },
  {
    id: "audi",
    name: "Audi",
    logo: "https://www.carlogos.org/car-logos/audi-logo.png",
  },
  {
    id: "volkswagen",
    name: "Volkswagen",
    logo: "https://www.carlogos.org/car-logos/volkswagen-logo.png",
  },
  {
    id: "porsche",
    name: "Porsche",
    logo: "https://www.carlogos.org/car-logos/porsche-logo.png",
  },
  {
    id: "toyota",
    name: "Toyota",
    logo: "https://www.carlogos.org/car-logos/toyota-logo.png",
  },
  {
    id: "honda",
    name: "Honda",
    logo: "https://www.carlogos.org/car-logos/honda-logo.png",
  },
  {
    id: "nissan",
    name: "Nissan",
    logo: "https://www.carlogos.org/car-logos/nissan-logo.png",
  },
  {
    id: "ford",
    name: "Ford",
    logo: "https://www.carlogos.org/car-logos/ford-logo.png",
  },
  {
    id: "chevrolet",
    name: "Chevrolet",
    logo: "https://www.carlogos.org/car-logos/chevrolet-logo.png",
  },
  {
    id: "lamborghini",
    name: "Lamborghini",
    logo: "https://www.carlogos.org/car-logos/lamborghini-logo.png",
  },
  {
    id: "ferrari",
    name: "Ferrari",
    logo: "https://www.carlogos.org/car-logos/ferrari-logo.png",
  },
];

// All brands organized alphabetically
const allBrands = [
  { letter: "B", brands: ["Bentley", "BMW", "Bugatti"] },
  { letter: "F", brands: ["Ferrari", "Fiat", "Ford"] },
  { letter: "M", brands: ["Maserati", "Mazda", "Mercedes-Benz"] },
  { letter: "P", brands: ["Peugeot", "Porsche"] },
  { letter: "T", brands: ["Tesla", "Toyota"] },
  { letter: "V", brands: ["Volkswagen", "Volvo"] },
];

interface BrandModelDropdownProps {
  onSelect: (brand: string) => void;
}

const BrandModelDropdown = ({ onSelect }: BrandModelDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "VW",
    "BMW",
    "BUGATTI",
  ]);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleBrandSelect = (brand: string) => {
    onSelect(brand);

    // Add to recent searches if not already there
    if (!recentSearches.includes(brand)) {
      const updatedSearches = [brand, ...recentSearches.slice(0, 2)];
      setRecentSearches(updatedSearches);
    }

    setIsOpen(false);
  };

  // Filter brands based on search term
  const filteredBrands = searchTerm
    ? allBrands
        .map((group) => ({
          letter: group.letter,
          brands: group.brands.filter((brand) =>
            brand.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))
        .filter((group) => group.brands.length > 0)
    : allBrands;

  return (
    <div className="relative" ref={dropdownRef}>
      <h1 className="text-xs text-gray-500 mb-1">Brand & Model</h1>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full cursor-pointer px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none"
      >
        <span>Select brand</span>
        <span className="text-gray-500">▼</span>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-[400px] mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex items-center p-3 border-b">
            <button onClick={() => setIsOpen(false)} className="mr-2">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-base font-medium">Select the brand</h2>
          </div>

          {/* Search */}
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search brand"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Popular brands */}
          <div className="p-3 border-b">
            <h3 className="text-xs font-medium text-gray-500 mb-2">
              Most sought-after brands
            </h3>
            <div className="grid grid-cols-6 gap-2">
              {popularBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => handleBrandSelect(brand.name)}
                >
                  <Image
                    width={32}
                    height={32}
                    src={brand.logo}
                    alt={brand.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Recent searches */}
          <div className="p-3 border-b">
            <h3 className="text-xs font-medium text-gray-500 mb-2">
              Last search performed by you
            </h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((brand, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm cursor-pointer hover:bg-gray-200"
                  onClick={() => handleBrandSelect(brand)}
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>

          {/* All brands */}
          <div className="p-3 max-h-60 overflow-y-auto">
            <h3 className="text-xs font-medium text-gray-500 mb-2">
              All brands
            </h3>
            {filteredBrands.map((group) => (
              <div key={group.letter} className="mb-3">
                <div 
                  className="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleBrandSelect(group.brands[0])}
                >
                  <span className="text-sm font-medium">{group.letter}.C</span>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-2">
                      {group.brands.length}
                    </span>
                    <span className="text-gray-400">›</span>
                  </div>
                </div>
                {group.brands.map((brand, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-2 pl-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleBrandSelect(brand)}
                  >
                    <span className="text-sm">{brand}</span>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">
                        {Math.floor(Math.random() * 20)}
                      </span>
                      <span className="text-gray-400">›</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandModelDropdown;

"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronLeft, Search } from "lucide-react";
import Image from "next/image";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useGetAllBrandsQuery } from "@/redux/apiSlice/brandAndModalSlice";
import { getImageUrl } from "@/lib/getImageUrl";

interface Brand {
  _id: string;
  brand: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface BrandModelDropdownProps {
  onSelect: (brandId: string) => void;
  value?: string; // Brand ID
}

const BrandModelDropdown = ({ onSelect, value }: BrandModelDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState<
    { id: string; name: string }[]
  >([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch brands from API
  const { data: brandsData, isLoading, isError } = useGetAllBrandsQuery({});

  // Get brands from API response
  const brands: Brand[] = brandsData?.data || [];

  // Find the selected brand name from the ID
  const selectedBrandName = useMemo(() => {
    if (!value) return "";
    const found = brands.find((b) => b._id === value);
    return found?.brand || "";
  }, [value, brands]);

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

  const handleBrandSelect = (brandId: string, brandName: string) => {
    onSelect(brandId);

    // Add to recent searches if not already there
    if (!recentSearches.find((r) => r.id === brandId)) {
      const updatedSearches = [
        { id: brandId, name: brandName },
        ...recentSearches.slice(0, 2),
      ];
      setRecentSearches(updatedSearches);
    }

    setIsOpen(false);
  };

  // Get popular brands (first 12 brands or all if less)
  const popularBrands = brands.slice(0, 12);

  // Organize brands alphabetically
  const organizedBrands = brands.reduce((acc, brand) => {
    const firstLetter = brand.brand.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(brand);
    return acc;
  }, {} as Record<string, Brand[]>);

  // Convert to array format and sort
  const allBrands = Object.entries(organizedBrands)
    .map(([letter, brandsInGroup]) => ({
      letter,
      brands: brandsInGroup,
    }))
    .sort((a, b) => a.letter.localeCompare(b.letter));

  // Filter brands based on search term
  const filteredBrands = searchTerm
    ? allBrands
        .map((group) => ({
          letter: group.letter,
          brands: group.brands.filter((brand) =>
            brand.brand.toLowerCase().includes(searchTerm.toLowerCase())
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
        <span className={selectedBrandName ? "text-gray-900" : "text-gray-500"}>
          {selectedBrandName || "Select brand"}
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

          {/* Loading state */}
          {isLoading && (
            <div className="p-6 text-center text-gray-500">
              Loading brands...
            </div>
          )}

          {/* Error state */}
          {isError && (
            <div className="p-6 text-center text-red-500">
              Failed to load brands. Please try again.
            </div>
          )}

          {/* Popular brands */}
          {!isLoading && !isError && popularBrands.length > 0 && (
            <div className="p-3 border-b">
              <h3 className="text-xs font-medium text-gray-500 mb-2">
                Most sought-after brands
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {popularBrands.map((brand) => (
                  <div
                    key={brand._id}
                    className={`flex flex-col items-center justify-center p-2 border rounded-md cursor-pointer hover:bg-gray-50 ${
                      value === brand._id
                        ? "border-primary bg-primary/5"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleBrandSelect(brand._id, brand.brand)}
                  >
                    {brand.image ? (
                      <Image
                        width={32}
                        height={32}
                        src={getImageUrl(brand.image)}
                        alt={brand.brand}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded text-xs font-medium">
                        {brand.brand.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent searches */}
          {!isLoading && !isError && recentSearches.length > 0 && (
            <div className="p-3 border-b">
              <h3 className="text-xs font-medium text-gray-500 mb-2">
                Last search performed by you
              </h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((recent) => (
                  <div
                    key={recent.id}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm cursor-pointer hover:bg-gray-200"
                    onClick={() => handleBrandSelect(recent.id, recent.name)}
                  >
                    {recent.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All brands */}
          {!isLoading && !isError && (
            <div className="p-3 max-h-60 overflow-y-auto">
              <h3 className="text-xs font-medium text-gray-500 mb-2">
                All brands
              </h3>
              <div className="space-y-1">
                {filteredBrands
                  ?.flatMap((group) => group.brands)
                  .map((brand) => (
                    <div
                      key={brand._id}
                      className={`flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer rounded ${
                        value === brand._id ? "bg-primary/5" : ""
                      }`}
                      onClick={() => handleBrandSelect(brand._id, brand.brand)}
                    >
                      <span className="text-sm">{brand.brand}</span>
                      <span className="text-gray-400">›</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BrandModelDropdown;

"use client";

import { useState, useEffect, useMemo } from "react";
import Container from "@/components/ui/container";
import CarCard from "@/components/website/home/carsWithFilter/CarCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { useGetFilteredCarsQuery } from "@/redux/apiSlice/carSlice";
import CarLoader from "@/components/ui/loader/CarLoader";
import { getImageUrl } from "@/lib/getImageUrl";

interface FilteredCarListProps {
  apiParams: Record<string, string | number | boolean>;
  hasActiveFilters: boolean;
}

const FilteredCarList = ({
  apiParams,
  hasActiveFilters,
}: FilteredCarListProps) => {
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("price_asc");

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [apiParams]);

  // Always use /car/filter endpoint - with or without params
  const {
    data: carsResponse,
    isLoading,
    isFetching,
  } = useGetFilteredCarsQuery(apiParams);

  if (isLoading) return <CarLoader />;

  const carsData = carsResponse?.data || [];

  // Sort the cars based on selected sort option
  const sortedCars = useMemo(() => {
    if (!sortBy) return carsData;
    const sorted = [...carsData];
    sorted.sort((a: any, b: any) => {
      switch (sortBy) {
        case "price_asc": {
          const priceA = Number(
            a.basicInformation?.OfferPrice ||
              a.basicInformation?.RegularPrice ||
              0,
          );
          const priceB = Number(
            b.basicInformation?.OfferPrice ||
              b.basicInformation?.RegularPrice ||
              0,
          );
          return priceA - priceB;
        }
        case "price_desc": {
          const priceA = Number(
            a.basicInformation?.OfferPrice ||
              a.basicInformation?.RegularPrice ||
              0,
          );
          const priceB = Number(
            b.basicInformation?.OfferPrice ||
              b.basicInformation?.RegularPrice ||
              0,
          );
          return priceB - priceA;
        }
        case "km_asc":
          return (
            Number(a.basicInformation?.miles || 0) -
            Number(b.basicInformation?.miles || 0)
          );
        case "km_desc":
          return (
            Number(b.basicInformation?.miles || 0) -
            Number(a.basicInformation?.miles || 0)
          );
        case "year_asc":
          return (
            Number(a.basicInformation?.year || 0) -
            Number(b.basicInformation?.year || 0)
          );
        case "year_desc":
          return (
            Number(b.basicInformation?.year || 0) -
            Number(a.basicInformation?.year || 0)
          );
        default:
          return 0;
      }
    });
    return sorted;
  }, [carsData, sortBy]);

  const totalItems = sortedCars.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pageItems = sortedCars.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const prevPage = () => goToPage(currentPage - 1);
  const nextPage = () => goToPage(currentPage + 1);

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        {/* Results count, sort dropdown, and loading indicator */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              {totalItems} {totalItems === 1 ? "vehicle" : "vehicles"} found
              {hasActiveFilters && " (filtered)"}
            </p>
            {isFetching && (
              <span className="text-sm text-gray-500">Updating...</span>
            )}
          </div>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
          >
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="km_asc">Kilometers: Low to High</option>
            <option value="km_desc">Kilometers: High to Low</option>
            <option value="year_asc">Year: Older to Newer</option>
            <option value="year_desc">Year: Newer to Older</option>
          </select>
        </div>

        {totalItems === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No vehicles found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more results
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pageItems?.map((car: any) => (
              <Link href={`/vehicles/${car?._id}`} key={car?._id}>
                <CarCard
                  key={car._id}
                  image={getImageUrl(
                    car.basicInformation?.productImage?.[0] || "",
                  )}
                  dealerLogo={car.createdBy?.profile}
                  dealerName={car.createdBy?.name}
                  dealerType={car.dealerType ?? ""}
                  carName={car.basicInformation?.vehicleName}
                  carCategory={car.basicInformation?.BodyType}
                  originalPrice={car.basicInformation?.RegularPrice}
                  discountedPrice={car.basicInformation?.OfferPrice}
                  car={car}
                />
              </Link>
            ))}
          </div>
        )}

        {/* Shadcn Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      prevPage();
                    }}
                    aria-disabled={currentPage === 1}
                    className={
                      currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      nextPage();
                    }}
                    aria-disabled={currentPage === totalPages}
                    className={
                      currentPage === totalPages
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Container>
    </section>
  );
};

export default FilteredCarList;

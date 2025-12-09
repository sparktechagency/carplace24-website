"use client";

import { useState } from "react";
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
import { useGetAllCarsQuery } from "@/redux/apiSlice/carSlice";
import CarLoader from "@/components/ui/loader/CarLoader";
import { getImageUrl } from "@/lib/getImageUrl";

const FilteredCarList = () => {
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const { data: allCars, isLoading } = useGetAllCarsQuery(undefined);

  if (isLoading) return <CarLoader />;

  const allCarsData = allCars?.data || [];

  const totalItems = allCarsData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pageItems = allCarsData.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const prevPage = () => goToPage(currentPage - 1);
  const nextPage = () => goToPage(currentPage + 1);

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pageItems?.map((car: any) => (
            <Link href={`/vehicles/${car?._id}`} key={car?._id}>
              <CarCard
                key={car._id}
                image={getImageUrl(
                  car.basicInformation?.productImage?.[0] || ""
                )}
                dealerLogo={car.createdBy?.profile}
                dealerName={car.createdBy?.name}
                dealerType={car.dealerType ?? ""}
                carName={car.basicInformation?.vehicleName}
                carCategory={car.basicInformation?.BodyType}
                originalPrice={car.basicInformation?.RegularPrice}
                discountedPrice={car.basicInformation?.OfferPrice}
              />
            </Link>
          ))}
        </div>

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
                  )
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

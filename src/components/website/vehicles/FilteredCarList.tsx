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

// Sample JSON data for filtered vehicles list
const FILTERED_CARS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
    dealerName: "Car Service",
    dealerType: "Dealer",
    dealerLogo:
      "https://images.unsplash.com/photo-1653499676737-becf2c9562c8?q=80&w=1170&auto=format&fit=crop",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
    isFavorite: true,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    dealerName: "Car Service",
    dealerType: "Dealer",
    dealerLogo:
      "https://images.unsplash.com/photo-1561758993-f2cb5722934c?q=80&w=1055&auto=format&fit=crop",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
    isFavorite: false,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
    dealerName: "Car Service",
    dealerType: "Dealer",
    dealerLogo:
      "https://plus.unsplash.com/premium_photo-1681400569389-02b0677b0c19?q=80&w=1267&auto=format&fit=crop",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
    isFavorite: false,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
    dealerName: "Car Service",
    dealerType: "Dealer",
    dealerLogo:
      "https://images.unsplash.com/photo-1580128483799-52b7f6cc3746?q=80&w=1170&auto=format&fit=crop",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
    isFavorite: false,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1528&auto=format&fit=crop",
    dealerName: "Car Service",
    dealerType: "Dealer",
    dealerLogo:
      "https://images.unsplash.com/photo-1653499676737-becf2c9562c8?q=80&w=1170&auto=format&fit=crop",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
    isFavorite: false,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1470&auto=format&fit=crop",
    dealerName: "Car Service",
    dealerType: "Dealer",
    dealerLogo:
      "https://images.unsplash.com/photo-1561758993-f2cb5722934c?q=80&w=1055&auto=format&fit=crop",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
    isFavorite: true,
  },
  // Additional items for a fuller grid
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1528&auto=format&fit=crop",
    dealerName: "Dealer",
    dealerType: "Finest Seller",
    dealerLogo:
      "https://images.unsplash.com/photo-1580128483799-52b7f6cc3746?q=80&w=1170&auto=format&fit=crop",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
    dealerName: "Dealer",
    dealerType: "Private Seller",
    dealerLogo:
      "https://plus.unsplash.com/premium_photo-1681400569389-02b0677b0c19?q=80&w=1267&auto=format&fit=crop",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    dealerName: "Dealer",
    dealerType: "Private Seller",
    dealerLogo:
      "https://images.unsplash.com/photo-1561758993-f2cb5722934c?q=80&w=1055&auto=format&fit=crop",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
    dealerName: "Dealer",
    dealerType: "Private Seller",
    dealerLogo:
      "https://images.unsplash.com/photo-1653499676737-becf2c9562c8?q=80&w=1170&auto=format&fit=crop",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
  },
  {
    id: 11,
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1470&auto=format&fit=crop",
    dealerName: "Dealer",
    dealerType: "Private Seller",
    dealerLogo:
      "https://images.unsplash.com/photo-1580128483799-52b7f6cc3746?q=80&w=1170&auto=format&fit=crop",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
  },
  {
    id: 12,
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1528&auto=format&fit=crop",
    dealerName: "Dealer",
    dealerType: "Private Seller",
    dealerLogo:
      "https://images.unsplash.com/photo-1561758993-f2cb5722934c?q=80&w=1055&auto=format&fit=crop",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
  },
  {
    id: 13,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
    dealerName: "Dealer",
    dealerType: "Certified",
    dealerLogo:
      "https://images.unsplash.com/photo-1653499676737-becf2c9562c8?q=80&w=1170&auto=format&fit=crop",
    carName: "Audi Q5 2.0T",
    carCategory: "Q5 2.0T/SUV/Audi",
    originalPrice: 18000,
    discountedPrice: 19500,
    isFavorite: false,
  },
  {
    id: 14,
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    dealerName: "Dealer",
    dealerType: "Private Seller",
    dealerLogo:
      "https://images.unsplash.com/photo-1561758993-f2cb5722934c?q=80&w=1055&auto=format&fit=crop",
    carName: "BMW 3 Series 320i",
    carCategory: "Sedan/BMW/320i",
    originalPrice: 22000,
    discountedPrice: 23900,
    isFavorite: true,
  },
  {
    id: 15,
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
    dealerName: "Dealer",
    dealerType: "Finest Seller",
    dealerLogo:
      "https://plus.unsplash.com/premium_photo-1681400569389-02b0677b0c19?q=80&w=1267&auto=format&fit=crop",
    carName: "Honda Civic Sport",
    carCategory: "Civic/Sport/Sedan/Honda",
    originalPrice: 16000,
    discountedPrice: 17500,
    isFavorite: false,
  },
  {
    id: 16,
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
    dealerName: "Dealer",
    dealerType: "Certified",
    dealerLogo:
      "https://images.unsplash.com/photo-1580128483799-52b7f6cc3746?q=80&w=1170&auto=format&fit=crop",
    carName: "Porsche Cayenne S",
    carCategory: "Cayenne/SUV/Porsche",
    originalPrice: 45000,
    discountedPrice: 47000,
    isFavorite: true,
  },
  {
    id: 17,
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1528&auto=format&fit=crop",
    dealerName: "Dealer",
    dealerType: "Private Seller",
    dealerLogo:
      "https://images.unsplash.com/photo-1653499676737-becf2c9562c8?q=80&w=1170&auto=format&fit=crop",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/KIA",
    originalPrice: 15000,
    discountedPrice: 16000,
    isFavorite: false,
  },
  {
    id: 18,
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1470&auto=format&fit=crop",
    dealerName: "Dealer",
    dealerType: "Private Seller",
    dealerLogo:
      "https://images.unsplash.com/photo-1561758993-f2cb5722934c?q=80&w=1055&auto=format&fit=crop",
    carName: "Maserati Levante",
    carCategory: "Levante/SUV/Maserati",
    originalPrice: 38000,
    discountedPrice: 39900,
    isFavorite: true,
  },
];

const FilteredCarList = () => {
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = FILTERED_CARS.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pageItems = FILTERED_CARS.slice(startIndex, endIndex);

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
          {pageItems.map((car) => (
            <Link href={`/vehicles/${car.id}`} key={car.id}>
              <CarCard
                image={car.image}
                dealerLogo={car.dealerLogo}
                dealerName={car.dealerName}
                dealerType={car.dealerType}
                carName={car.carName}
                carCategory={car.carCategory}
                originalPrice={car.originalPrice}
                discountedPrice={car.discountedPrice}
                isFavorite={car.isFavorite}
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

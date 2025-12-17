"use client";

import { useState, useMemo } from "react";
import Container from "@/components/ui/container";
import DealersSearch from "./DealersSearch";
import DealersGrid from "./DealersGrid";
import LocationDropdown from "./LocationDropdown";
import { useGetAllDealersQuery } from "@/redux/apiSlice/dealerSlice";
import CarLoader from "@/components/ui/loader/CarLoader";
import { Dealer } from "./dealersData";

const DealersMainPage = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");

  const {
    data: dealersData,
    isLoading,
    isError,
  } = useGetAllDealersQuery(undefined);

  // Extract dealers from API response
  const dealers: Dealer[] = useMemo(() => {
    return dealersData?.data || [];
  }, [dealersData]);

  // Extract unique cities for the dropdown
  const cities = useMemo(() => {
    const citySet = new Set<string>();
    dealers.forEach((dealer) => {
      if (dealer.city) {
        // Handle cities that might have comma-separated values
        const cityName = dealer.city.split(",")[0].trim();
        if (cityName) citySet.add(cityName);
      }
    });
    return Array.from(citySet).sort();
  }, [dealers]);

  // Filter dealers based on search query
  const filteredByQuery = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dealers;

    return dealers.filter((dealer) => {
      return (
        dealer.name?.toLowerCase().includes(q) ||
        dealer.email?.toLowerCase().includes(q) ||
        dealer.city?.toLowerCase().includes(q) ||
        dealer.country?.toLowerCase().includes(q) ||
        dealer.address?.toLowerCase().includes(q)
      );
    });
  }, [dealers, query]);

  // Filter by selected city
  const filteredDealers = useMemo(() => {
    if (!city) return filteredByQuery;

    return filteredByQuery.filter((dealer) => {
      return dealer.city?.toLowerCase().includes(city.toLowerCase());
    });
  }, [filteredByQuery, city]);

  if (isLoading) return <CarLoader />;

  if (isError) {
    return (
      <div className="py-10 bg-gray-50 min-h-screen">
        <Container>
          <div className="text-center text-red-500">
            <p>Failed to load dealers. Please try again later.</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-10 bg-gray-50 min-h-screen">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center gap-3 w-[75%]">
              <DealersSearch value={query} onChange={setQuery} />
            </div>
            <div className="w-[25%]">
              <LocationDropdown
                value={city}
                onChange={setCity}
                options={cities}
              />
            </div>
          </div>
        </div>

        <div className="mb-20 text-center text-2xl text-gray-800">
          <h1>Search Top Dealers</h1>
        </div>

        <DealersGrid dealers={filteredDealers} />
      </Container>
    </div>
  );
};

export default DealersMainPage;

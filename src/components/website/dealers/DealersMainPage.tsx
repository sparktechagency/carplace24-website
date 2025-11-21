"use client";

import { useState } from "react";
import Container from "@/components/ui/container";
import DealersSearch from "./DealersSearch";
import DealersGrid from "./DealersGrid";
import LocationDropdown from "./LocationDropdown";
import { DEALERS } from "./dealersData";

const DealersMainPage = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const cities = Array.from(
    new Set(DEALERS.map((d) => d.location.split(",")[0].trim()))
  );
  const filtered = DEALERS.filter((d) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      d.name.toLowerCase().includes(q) ||
      d.location.toLowerCase().includes(q) ||
      d.type.toLowerCase().includes(q)
    );
  });
  const locationFiltered = filtered.filter((d) =>
    city ? d.location.toLowerCase().includes(city.toLowerCase()) : true
  );

  return (
    <div className="py-10 bg-gray-50">
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

        <DealersGrid dealers={locationFiltered} />
      </Container>
    </div>
  );
};

export default DealersMainPage;

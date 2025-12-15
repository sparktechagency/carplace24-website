"use client";

import { Suspense } from "react";
import FindNearestDealers from "@/components/shared/FindNearestDealers";
import FilteredCarList from "./FilteredCarList";
import FilterVehicles from "./FilterVehicles";
import { useVehicleFilters } from "@/lib/useVehicleFilters";
import CarLoader from "@/components/ui/loader/CarLoader";

const VehiclesContent = () => {
  const {
    filters,
    setFilter,
    setFilters,
    resetFilters,
    apiParams,
    hasActiveFilters,
  } = useVehicleFilters();

  return (
    <div className="min-h-screen">
      <FilterVehicles
        filters={filters}
        setFilter={setFilter}
        setFilters={setFilters}
        resetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
      />
      <FilteredCarList
        apiParams={apiParams}
        hasActiveFilters={hasActiveFilters}
      />
      <FindNearestDealers />
    </div>
  );
};

const VehiclesMainPage = () => {
  return (
    <Suspense fallback={<CarLoader />}>
      <VehiclesContent />
    </Suspense>
  );
};

export default VehiclesMainPage;

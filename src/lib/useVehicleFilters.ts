"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo, useState, useEffect } from "react";

export interface VehicleFilters {
  // Basic search
  searchTerm: string;
  vehicleName: string;
  brand: string;
  model: string;
  vinNo: string;

  // Year range
  yearFrom: number;
  yearTo: number;

  // Price range
  priceFrom: number;
  priceTo: number;

  // Condition & type
  condition: string;
  BodyType: string;

  // Mileage
  milesFrom: number;
  milesTo: number;

  // Warranty & Accident
  MfkWarranty: string;
  AccidentVehicle: string;

  // Tires & Season
  tires: string;
  season: string;

  // Special flags
  handicapAccessible: boolean;
  raceCar: boolean;
  tuning: boolean;

  // Colors
  exterior: string;
  interior: string;
  metallic: string;

  // Seats & Doors
  seatsFrom: number;
  seatsTo: number;
  doorsFrom: number;
  doorsTo: number;

  // Location
  city: string;
  country: string;

  // Powertrain
  fuelType: string;
  driveType: string;
  transmission: string;
  engineType: string;
  performance: string;

  // EV specific
  batteryCapacityFrom: number;
  batteryCapacityTo: number;
  rangeFrom: number;
  rangeTo: number;

  // Equipment (boolean flags)
  ABS: boolean;
  Camera: boolean;
  AdaptiveCruiseControl: boolean;
  AlarmSystem3: boolean;
  ElectricSeatAdjustment: boolean;
  Towbar: boolean;
  LeatherAlcantaraFabricSeats: boolean;
  HeatedVentilatedSeats: boolean;
  SunroofPanoramicRoof: boolean;
  AndroidAuto: boolean;
  NavigationSystem: boolean;
  ParkingSensors: boolean;
  HeadUpDisplay: boolean;
  XenonLEDHeadlights3: boolean;
  KeylessEntryStart: boolean;
  Isofix: boolean;
  StartStopSystem: boolean;
  TheftProtection: boolean;
  ClimateControl: boolean;
  SportsSeats: boolean;
  SpeedLimiter: boolean;
  StabilityControlESP: boolean;
  SoundSystem: boolean;

  // Pagination & Sorting
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
}

const currentYear = new Date().getFullYear();

export const defaultFilters: VehicleFilters = {
  searchTerm: "",
  vehicleName: "",
  brand: "",
  model: "",
  vinNo: "",
  yearFrom: 1950,
  yearTo: currentYear,
  priceFrom: 0,
  priceTo: 1000000,
  condition: "",
  BodyType: "",
  milesFrom: 0,
  milesTo: 400000,
  MfkWarranty: "",
  AccidentVehicle: "",
  tires: "",
  season: "",
  handicapAccessible: false,
  raceCar: false,
  tuning: false,
  exterior: "",
  interior: "",
  metallic: "",
  seatsFrom: 0,
  seatsTo: 0,
  doorsFrom: 0,
  doorsTo: 0,
  city: "",
  country: "",
  fuelType: "",
  driveType: "",
  transmission: "",
  engineType: "",
  performance: "",
  batteryCapacityFrom: 0,
  batteryCapacityTo: 0,
  rangeFrom: 0,
  rangeTo: 0,
  ABS: false,
  Camera: false,
  AdaptiveCruiseControl: false,
  AlarmSystem3: false,
  ElectricSeatAdjustment: false,
  Towbar: false,
  LeatherAlcantaraFabricSeats: false,
  HeatedVentilatedSeats: false,
  SunroofPanoramicRoof: false,
  AndroidAuto: false,
  NavigationSystem: false,
  ParkingSensors: false,
  HeadUpDisplay: false,
  XenonLEDHeadlights3: false,
  KeylessEntryStart: false,
  Isofix: false,
  StartStopSystem: false,
  TheftProtection: false,
  ClimateControl: false,
  SportsSeats: false,
  SpeedLimiter: false,
  StabilityControlESP: false,
  SoundSystem: false,
  page: 1,
  limit: 12,
  sortBy: "",
  sortOrder: "",
};

// Helper to parse boolean from URL
const parseBool = (val: string | null): boolean => val === "true";

// Helper to parse number from URL - returns fallback if value is null/empty
const parseNum = (val: string | null, fallback: number): number => {
  if (val === null || val === "") return fallback;
  const num = Number(val);
  return isNaN(num) ? fallback : num;
};

export function useVehicleFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse filters from URL
  const filters: VehicleFilters = useMemo(() => {
    return {
      searchTerm: searchParams.get("searchTerm") || defaultFilters.searchTerm,
      vehicleName:
        searchParams.get("vehicleName") || defaultFilters.vehicleName,
      brand: searchParams.get("brand") || defaultFilters.brand,
      model: searchParams.get("model") || defaultFilters.model,
      vinNo: searchParams.get("vinNo") || defaultFilters.vinNo,
      yearFrom: parseNum(searchParams.get("yearFrom"), defaultFilters.yearFrom),
      yearTo: parseNum(searchParams.get("yearTo"), defaultFilters.yearTo),
      priceFrom: parseNum(
        searchParams.get("priceFrom"),
        defaultFilters.priceFrom
      ),
      priceTo: parseNum(searchParams.get("priceTo"), defaultFilters.priceTo),
      condition: searchParams.get("condition") || defaultFilters.condition,
      BodyType: searchParams.get("BodyType") || defaultFilters.BodyType,
      milesFrom: parseNum(
        searchParams.get("milesFrom"),
        defaultFilters.milesFrom
      ),
      milesTo: parseNum(searchParams.get("milesTo"), defaultFilters.milesTo),
      MfkWarranty:
        searchParams.get("MfkWarranty") || defaultFilters.MfkWarranty,
      AccidentVehicle:
        searchParams.get("AccidentVehicle") || defaultFilters.AccidentVehicle,
      tires: searchParams.get("tires") || defaultFilters.tires,
      season: searchParams.get("season") || defaultFilters.season,
      handicapAccessible: parseBool(searchParams.get("handicapAccessible")),
      raceCar: parseBool(searchParams.get("raceCar")),
      tuning: parseBool(searchParams.get("tuning")),
      exterior: searchParams.get("exterior") || defaultFilters.exterior,
      interior: searchParams.get("interior") || defaultFilters.interior,
      metallic: searchParams.get("metallic") || defaultFilters.metallic,
      seatsFrom: parseNum(
        searchParams.get("seatsFrom"),
        defaultFilters.seatsFrom
      ),
      seatsTo: parseNum(searchParams.get("seatsTo"), defaultFilters.seatsTo),
      doorsFrom: parseNum(
        searchParams.get("doorsFrom"),
        defaultFilters.doorsFrom
      ),
      doorsTo: parseNum(searchParams.get("doorsTo"), defaultFilters.doorsTo),
      city: searchParams.get("city") || defaultFilters.city,
      country: searchParams.get("country") || defaultFilters.country,
      fuelType: searchParams.get("fuelType") || defaultFilters.fuelType,
      driveType: searchParams.get("driveType") || defaultFilters.driveType,
      transmission:
        searchParams.get("transmission") || defaultFilters.transmission,
      engineType: searchParams.get("engineType") || defaultFilters.engineType,
      performance:
        searchParams.get("performance") || defaultFilters.performance,
      batteryCapacityFrom: parseNum(
        searchParams.get("batteryCapacityFrom"),
        defaultFilters.batteryCapacityFrom
      ),
      batteryCapacityTo: parseNum(
        searchParams.get("batteryCapacityTo"),
        defaultFilters.batteryCapacityTo
      ),
      rangeFrom: parseNum(
        searchParams.get("rangeFrom"),
        defaultFilters.rangeFrom
      ),
      rangeTo: parseNum(searchParams.get("rangeTo"), defaultFilters.rangeTo),
      ABS: parseBool(searchParams.get("ABS")),
      Camera: parseBool(searchParams.get("Camera")),
      AdaptiveCruiseControl: parseBool(
        searchParams.get("AdaptiveCruiseControl")
      ),
      AlarmSystem3: parseBool(searchParams.get("AlarmSystem3")),
      ElectricSeatAdjustment: parseBool(
        searchParams.get("ElectricSeatAdjustment")
      ),
      Towbar: parseBool(searchParams.get("Towbar")),
      LeatherAlcantaraFabricSeats: parseBool(
        searchParams.get("LeatherAlcantaraFabricSeats")
      ),
      HeatedVentilatedSeats: parseBool(
        searchParams.get("HeatedVentilatedSeats")
      ),
      SunroofPanoramicRoof: parseBool(searchParams.get("SunroofPanoramicRoof")),
      AndroidAuto: parseBool(searchParams.get("AndroidAuto")),
      NavigationSystem: parseBool(searchParams.get("NavigationSystem")),
      ParkingSensors: parseBool(searchParams.get("ParkingSensors")),
      HeadUpDisplay: parseBool(searchParams.get("HeadUpDisplay")),
      XenonLEDHeadlights3: parseBool(searchParams.get("XenonLEDHeadlights3")),
      KeylessEntryStart: parseBool(searchParams.get("KeylessEntryStart")),
      Isofix: parseBool(searchParams.get("Isofix")),
      StartStopSystem: parseBool(searchParams.get("StartStopSystem")),
      TheftProtection: parseBool(searchParams.get("TheftProtection")),
      ClimateControl: parseBool(searchParams.get("ClimateControl")),
      SportsSeats: parseBool(searchParams.get("SportsSeats")),
      SpeedLimiter: parseBool(searchParams.get("SpeedLimiter")),
      StabilityControlESP: parseBool(searchParams.get("StabilityControlESP")),
      SoundSystem: parseBool(searchParams.get("SoundSystem")),
      page: parseNum(searchParams.get("page"), defaultFilters.page),
      limit: parseNum(searchParams.get("limit"), defaultFilters.limit),
      sortBy: searchParams.get("sortBy") || defaultFilters.sortBy,
      sortOrder: searchParams.get("sortOrder") || defaultFilters.sortOrder,
    };
  }, [searchParams]);

  // Update a single filter
  const setFilter = useCallback(
    <K extends keyof VehicleFilters>(key: K, value: VehicleFilters[K]) => {
      const params = new URLSearchParams(searchParams.toString());

      // Handle different types
      if (typeof value === "boolean") {
        if (value) {
          params.set(key, "true");
        } else {
          params.delete(key);
        }
      } else if (typeof value === "number") {
        if (value !== defaultFilters[key]) {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      } else if (value === "" || value === defaultFilters[key]) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(newUrl, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  // Update multiple filters at once
  const setFilters = useCallback(
    (newFilters: Partial<VehicleFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newFilters).forEach(([key, value]) => {
        const k = key as keyof VehicleFilters;
        if (typeof value === "boolean") {
          if (value) {
            params.set(key, "true");
          } else {
            params.delete(key);
          }
        } else if (typeof value === "number") {
          if (value !== defaultFilters[k]) {
            params.set(key, String(value));
          } else {
            params.delete(key);
          }
        } else if (value === "" || value === defaultFilters[k]) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(newUrl, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  // Reset all filters
  const resetFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  // Build API query params (only include non-default values)
  const apiParams = useMemo(() => {
    const params: Record<string, string | number | boolean> = {};

    // String fields
    if (filters.searchTerm) params.searchTerm = filters.searchTerm;
    if (filters.vehicleName) params.vehicleName = filters.vehicleName;
    if (filters.brand) params.brand = filters.brand;
    if (filters.model) params.model = filters.model;
    if (filters.vinNo) params.vinNo = filters.vinNo;
    if (filters.condition) params.condition = filters.condition;
    if (filters.BodyType) params.BodyType = filters.BodyType;
    if (filters.MfkWarranty) params.MfkWarranty = filters.MfkWarranty;
    if (filters.AccidentVehicle)
      params.AccidentVehicle = filters.AccidentVehicle;
    if (filters.tires) params.tires = filters.tires;
    if (filters.season) params.season = filters.season;
    if (filters.exterior) params.exterior = filters.exterior;
    if (filters.interior) params.interior = filters.interior;
    if (filters.metallic) params.metallic = filters.metallic;
    if (filters.city) params.city = filters.city;
    if (filters.country) params.country = filters.country;
    if (filters.fuelType) params.fuelType = filters.fuelType;
    if (filters.driveType) params.driveType = filters.driveType;
    if (filters.transmission) params.transmission = filters.transmission;
    if (filters.engineType) params.engineType = filters.engineType;
    if (filters.performance) params.performance = filters.performance;
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.sortOrder) params.sortOrder = filters.sortOrder;

    // Number ranges
    if (filters.yearFrom !== defaultFilters.yearFrom)
      params.yearFrom = filters.yearFrom;
    if (filters.yearTo !== defaultFilters.yearTo)
      params.yearTo = filters.yearTo;
    if (filters.priceFrom !== defaultFilters.priceFrom)
      params.priceFrom = filters.priceFrom;
    if (filters.priceTo !== defaultFilters.priceTo)
      params.priceTo = filters.priceTo;
    if (filters.milesFrom !== defaultFilters.milesFrom)
      params.milesFrom = filters.milesFrom;
    if (filters.milesTo !== defaultFilters.milesTo)
      params.milesTo = filters.milesTo;
    if (filters.seatsFrom !== defaultFilters.seatsFrom)
      params.seatsFrom = filters.seatsFrom;
    if (filters.seatsTo !== defaultFilters.seatsTo)
      params.seatsTo = filters.seatsTo;
    if (filters.doorsFrom !== defaultFilters.doorsFrom)
      params.doorsFrom = filters.doorsFrom;
    if (filters.doorsTo !== defaultFilters.doorsTo)
      params.doorsTo = filters.doorsTo;
    if (filters.batteryCapacityFrom !== defaultFilters.batteryCapacityFrom)
      params.batteryCapacityFrom = filters.batteryCapacityFrom;
    if (filters.batteryCapacityTo !== defaultFilters.batteryCapacityTo)
      params.batteryCapacityTo = filters.batteryCapacityTo;
    if (filters.rangeFrom !== defaultFilters.rangeFrom)
      params.rangeFrom = filters.rangeFrom;
    if (filters.rangeTo !== defaultFilters.rangeTo)
      params.rangeTo = filters.rangeTo;

    // Pagination
    if (filters.page !== defaultFilters.page) params.page = filters.page;
    if (filters.limit !== defaultFilters.limit) params.limit = filters.limit;

    // Boolean flags (special features)
    if (filters.handicapAccessible)
      params.handicapAccessible = filters.handicapAccessible;
    if (filters.raceCar) params.raceCar = filters.raceCar;
    if (filters.tuning) params.tuning = filters.tuning;

    // Equipment boolean flags
    if (filters.ABS) params.ABS = filters.ABS;
    if (filters.Camera) params.Camera = filters.Camera;
    if (filters.AdaptiveCruiseControl)
      params.AdaptiveCruiseControl = filters.AdaptiveCruiseControl;
    if (filters.AlarmSystem3) params.AlarmSystem3 = filters.AlarmSystem3;
    if (filters.ElectricSeatAdjustment)
      params.ElectricSeatAdjustment = filters.ElectricSeatAdjustment;
    if (filters.Towbar) params.Towbar = filters.Towbar;
    if (filters.LeatherAlcantaraFabricSeats)
      params.LeatherAlcantaraFabricSeats = filters.LeatherAlcantaraFabricSeats;
    if (filters.HeatedVentilatedSeats)
      params.HeatedVentilatedSeats = filters.HeatedVentilatedSeats;
    if (filters.SunroofPanoramicRoof)
      params.SunroofPanoramicRoof = filters.SunroofPanoramicRoof;
    if (filters.AndroidAuto) params.AndroidAuto = filters.AndroidAuto;
    if (filters.NavigationSystem)
      params.NavigationSystem = filters.NavigationSystem;
    if (filters.ParkingSensors) params.ParkingSensors = filters.ParkingSensors;
    if (filters.HeadUpDisplay) params.HeadUpDisplay = filters.HeadUpDisplay;
    if (filters.XenonLEDHeadlights3)
      params.XenonLEDHeadlights3 = filters.XenonLEDHeadlights3;
    if (filters.KeylessEntryStart)
      params.KeylessEntryStart = filters.KeylessEntryStart;
    if (filters.Isofix) params.Isofix = filters.Isofix;
    if (filters.StartStopSystem)
      params.StartStopSystem = filters.StartStopSystem;
    if (filters.TheftProtection)
      params.TheftProtection = filters.TheftProtection;
    if (filters.ClimateControl) params.ClimateControl = filters.ClimateControl;
    if (filters.SportsSeats) params.SportsSeats = filters.SportsSeats;
    if (filters.SpeedLimiter) params.SpeedLimiter = filters.SpeedLimiter;
    if (filters.StabilityControlESP)
      params.StabilityControlESP = filters.StabilityControlESP;
    if (filters.SoundSystem) params.SoundSystem = filters.SoundSystem;

    return params;
  }, [filters]);

  // Debounce the apiParams to prevent excessive API calls while sliding
  const [debouncedApiParams, setDebouncedApiParams] = useState(apiParams);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedApiParams(apiParams);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [apiParams]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.keys(debouncedApiParams).length > 0;
  }, [debouncedApiParams]);

  return {
    filters,
    setFilter,
    setFilters,
    resetFilters,
    apiParams: debouncedApiParams,
    hasActiveFilters,
  };
}

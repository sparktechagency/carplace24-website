"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/container";
import { AdvancedSearchForm } from "./types";
import {
  categories,
  conditions,
  buyLease,
  driveTypes,
  fuels,
  gearboxes,
  transmissions,
  performances,
  displacements,
  cylinders,
  warranties,
  accidents,
  interiorColors,
  metallicOptions,
  exteriorColors,
  seatsOptions,
  doorsOptions,
  fuelConsumptionOptions,
  energyEfficiencyClasses,
  euroStandards,
  euro6SubStandards,
  batteryOptions,
  countries,
  cities,
  zipCodes,
} from "./data/options";
import SearchHeader from "./sections/SearchHeader";
import PrimarySelectors from "./sections/PrimarySelectors";
import SecondarySelectors from "./sections/SecondarySelectors";
import SlidersSection from "./sections/SlidersSection";
import PowertrainSection from "./sections/PowertrainSection";
import PerformanceSection from "./sections/PerformanceSection";
import WarrantyAccidentSection from "./sections/WarrantyAccidentSection";
import EVInteriorSection from "./sections/EVInteriorSection";
import AppearanceTowingSection from "./sections/AppearanceTowingSection";
import WeightsSeatsSection from "./sections/WeightsSeatsSection";
import DoorsFuelCOSection from "./sections/DoorsFuelCOSection";
import EnergyEuroSection from "./sections/EnergyEuroSection";
import LocationRadiusSection from "./sections/LocationRadiusSection";
import EquipmentSection from "./sections/EquipmentSection";

const AdvancedSearch = () => {
  const router = useRouter();
  const [form, setForm] = useState<AdvancedSearchForm>({
    search: "",
    category: "",
    brand: "",
    model: "",
    condition: "",
    buyLease: "",
    driveType: "",
    price: { min: 1000, max: 2000 },
    year: { min: 2010, max: 2025 },
    mileage: { min: 0, max: 20000 },
    fuel: "",
    gearbox: "",
    transmission: "",
    performance: "",
    displacement: "",
    cylinders: "",
    warranty: "",
    accident: "",
    rangeKm: 500,
    battery: "",
    interiorColor: "",
    metallic: "",
    exteriorColor: "",
    towingKg: 50,
    curbKg: 25680,
    totalKg: 25680,
    seats: "",
    doors: "",
    fuelConsumption: "",
    coKg: 50,
    energyClass: "",
    euroStandard: "",
    euro6Standard: "",
    country: "",
    city: "",
    zipCode: "",
    radius: { min: 0, max: 20000 },
    equipment: [],
  });

  const setField = (field: keyof AdvancedSearchForm, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resultCount = useMemo(() => 12350, []);

  const restore = () => {
    setForm({
      search: "",
      category: "",
      brand: "",
      model: "",
      condition: "",
      buyLease: "",
      driveType: "",
      price: { min: 1000, max: 2000 },
      year: { min: 2010, max: 2025 },
      mileage: { min: 0, max: 20000 },
      fuel: "",
      gearbox: "",
      transmission: "",
      performance: "",
      displacement: "",
      cylinders: "",
      warranty: "",
      accident: "",
      rangeKm: 500,
      battery: "",
      interiorColor: "",
      metallic: "",
      exteriorColor: "",
      towingKg: 50,
      curbKg: 25680,
      totalKg: 25680,
      seats: "",
      doors: "",
      fuelConsumption: "",
      coKg: 50,
      energyClass: "",
      euroStandard: "",
      euro6Standard: "",
      country: "",
      city: "",
      zipCode: "",
      radius: { min: 0, max: 20000 },
      equipment: [],
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build API params from form - only include non-empty/non-default values
    const params = new URLSearchParams();

    // String fields - map to API param names
    if (form.search) params.set("searchTerm", form.search);
    if (form.brand) params.set("brand", form.brand);
    if (form.model) params.set("model", form.model);
    if (form.category) params.set("BodyType", form.category);
    if (form.condition) params.set("condition", form.condition);
    if (form.driveType) params.set("driveType", form.driveType);
    if (form.fuel) params.set("fuelType", form.fuel);
    if (form.transmission) params.set("transmission", form.transmission);
    if (form.warranty) params.set("MfkWarranty", form.warranty);
    if (form.accident) params.set("AccidentVehicle", form.accident);
    if (form.interiorColor) params.set("interior", form.interiorColor);
    if (form.exteriorColor) params.set("exterior", form.exteriorColor);
    if (form.metallic) params.set("metallic", form.metallic);
    if (form.seats) params.set("seatsFrom", form.seats);
    if (form.doors) params.set("doorsFrom", form.doors);
    if (form.country) params.set("country", form.country);
    if (form.city) params.set("city", form.city);
    if (form.performance) params.set("performance", form.performance);

    // Year range
    if (form.year.min !== 2010) params.set("yearFrom", String(form.year.min));
    if (form.year.max !== 2025) params.set("yearTo", String(form.year.max));

    // Price range
    if (form.price.min !== 1000)
      params.set("priceFrom", String(form.price.min));
    if (form.price.max !== 2000) params.set("priceTo", String(form.price.max));

    // Mileage range
    if (form.mileage.min !== 0)
      params.set("milesFrom", String(form.mileage.min));
    if (form.mileage.max !== 20000)
      params.set("milesTo", String(form.mileage.max));

    // Range (EV)
    if (form.rangeKm !== 500) params.set("rangeFrom", String(form.rangeKm));

    // Equipment - map to boolean flags
    const equipmentMapping: Record<string, string> = {
      ABS: "ABS",
      Camera: "Camera",
      "Adaptive Cruise Control": "AdaptiveCruiseControl",
      "Alarm System": "AlarmSystem3",
      "Electric Seat Adjustment": "ElectricSeatAdjustment",
      Towbar: "Towbar",
      "Leather/Alcantara Seats": "LeatherAlcantaraFabricSeats",
      "Heated/Ventilated Seats": "HeatedVentilatedSeats",
      "Sunroof/Panoramic Roof": "SunroofPanoramicRoof",
      "Android Auto": "AndroidAuto",
      "Navigation System": "NavigationSystem",
      "Parking Sensors": "ParkingSensors",
      "Head-Up Display": "HeadUpDisplay",
      "Xenon/LED Headlights": "XenonLEDHeadlights3",
      "Keyless Entry/Start": "KeylessEntryStart",
      ISOFIX: "Isofix",
      "Start/Stop System": "StartStopSystem",
      "Theft Protection": "TheftProtection",
      "Climate Control": "ClimateControl",
      "Sports Seats": "SportsSeats",
      "Speed Limiter": "SpeedLimiter",
      ESP: "StabilityControlESP",
      "Sound System": "SoundSystem",
    };

    form.equipment.forEach((eq) => {
      const apiKey = equipmentMapping[eq];
      if (apiKey) {
        params.set(apiKey, "true");
      }
    });

    // Navigate to vehicles page with params
    const queryString = params.toString();
    router.push(queryString ? `/vehicles?${queryString}` : "/vehicles");
  };

  return (
    <div className="pb-20 bg-gray-50">
      <h1 className="text-3xl py-20 text-center text-gray-800">
        Advanced Search
      </h1>
      <Container>
        <form onSubmit={submit}>
          <SearchHeader
            value={form.search}
            resultCount={resultCount}
            onChange={(v) => setField("search", v)}
            onRestore={restore}
          />

          <PrimarySelectors
            values={{
              category: form.category,
              brand: form.brand,
              model: form.model,
            }}
            onChange={(f, v) => setField(f, v)}
            options={{ categories }}
          />

          <SecondarySelectors
            values={{
              condition: form.condition,
              buyLease: form.buyLease,
              driveType: form.driveType,
            }}
            onChange={(f, v) => setField(f, v)}
            options={{ conditions, buyLease, driveTypes }}
          />

          {/* <SlidersSection
            price={form.price}
            year={form.year}
            mileage={form.mileage}
            onChange={(f, v) => setField(f, v)}
          /> */}

          <PowertrainSection
            values={{
              fuel: form.fuel,
              gearbox: form.gearbox,
              transmission: form.transmission,
            }}
            onChange={(f, v) => setField(f, v)}
            options={{ fuels, gearboxes, transmissions }}
          />

          <PerformanceSection
            values={{
              performance: form.performance,
              displacement: form.displacement,
              cylinders: form.cylinders,
            }}
            onChange={(f, v) => setField(f, v)}
            options={{ performances, displacements, cylinders }}
          />

          <WarrantyAccidentSection
            values={{ warranty: form.warranty, accident: form.accident }}
            onChange={(f, v) => setField(f, v)}
            options={{ warranties, accidents }}
          />

          <EVInteriorSection
            values={{
              rangeKm: form.rangeKm,
              battery: form.battery,
              interiorColor: form.interiorColor,
            }}
            onNumberChange={(f, v) => setField(f, v)}
            onSelectChange={(f, v) => setField(f, v)}
            options={{ batteryOptions, interiorColors }}
          />

          <AppearanceTowingSection
            values={{
              metallic: form.metallic,
              exteriorColor: form.exteriorColor,
              towingKg: form.towingKg,
            }}
            onNumberChange={(f, v) => setField(f, v)}
            onSelectChange={(f, v) => setField(f, v)}
            options={{ metallicOptions, exteriorColors }}
          />

          <WeightsSeatsSection
            values={{
              curbKg: form.curbKg,
              totalKg: form.totalKg,
              seats: form.seats,
            }}
            onNumberChange={(f, v) => setField(f, v)}
            onSelectChange={(f, v) => setField(f, v)}
            options={{ seatsOptions }}
          />

          <DoorsFuelCOSection
            values={{
              doors: form.doors,
              fuelConsumption: form.fuelConsumption,
              coKg: form.coKg,
            }}
            onNumberChange={(f, v) => setField(f, v)}
            onSelectChange={(f, v) => setField(f, v)}
            options={{ doorsOptions, fuelConsumptionOptions }}
          />

          <EnergyEuroSection
            values={{
              energyClass: form.energyClass,
              euroStandard: form.euroStandard,
              euro6Standard: form.euro6Standard,
            }}
            onChange={(f, v) => setField(f, v)}
            options={{
              energyEfficiencyClasses,
              euroStandards,
              euro6SubStandards,
            }}
          />

          <LocationRadiusSection
            values={{
              country: form.country,
              city: form.city,
              zipCode: form.zipCode,
              radius: form.radius,
            }}
            onSelectChange={(f, v) => setField(f, v)}
            onRadiusChange={(v) => setField("radius", v)}
            options={{ countries, cities, zipCodes }}
          />

          <EquipmentSection
            selected={form.equipment}
            onToggle={(label) =>
              setField(
                "equipment",
                form.equipment.includes(label)
                  ? form.equipment.filter((l) => l !== label)
                  : [...form.equipment, label],
              )
            }
          />
        </form>
      </Container>
    </div>
  );
};

export default AdvancedSearch;

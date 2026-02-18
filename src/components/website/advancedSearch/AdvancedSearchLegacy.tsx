"use client";

import { useMemo, useState } from "react";
import Container from "@/components/ui/container";
import { useGetAllColorsQuery } from "@/redux/apiSlice/brandAndModalSlice";
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
  metallicOptions,
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

const AdvancedSearchLegacy = () => {
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState({ min: 1000, max: 2000 });
  const [year, setYear] = useState({ min: 2010, max: 2025 });
  const [mileage, setMileage] = useState({ min: 0, max: 20000 });
  const [radius, setRadius] = useState({ min: 0, max: 20000 });

  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [condition, setCondition] = useState("");
  const [buyLeaseVal, setBuyLeaseVal] = useState("");
  const [driveType, setDriveType] = useState("");
  const [fuel, setFuel] = useState("");
  const [gearbox, setGearbox] = useState("");
  const [transmission, setTransmission] = useState("");
  const [performance, setPerformance] = useState("");
  const [displacement, setDisplacement] = useState("");
  const [cylindersVal, setCylindersVal] = useState("");
  const [warranty, setWarranty] = useState("");
  const [accident, setAccident] = useState("");
  const [rangeKm, setRangeKm] = useState(500);
  const [battery, setBattery] = useState("");
  const [interiorColor, setInteriorColor] = useState("");
  const [metallic, setMetallic] = useState("");
  const [exteriorColor, setExteriorColor] = useState("");
  const [towingKg, setTowingKg] = useState(50);
  const [curbKg, setCurbKg] = useState(1000);
  const [totalKg, setTotalKg] = useState(1000);
  const [seats, setSeats] = useState("");
  const [doors, setDoors] = useState("");
  const [fuelConsumption, setFuelConsumption] = useState("");
  const [coKg, setCoKg] = useState(50);
  const [energyClass, setEnergyClass] = useState("");
  const [euroStandard, setEuroStandard] = useState("");
  const [euro6Standard, setEuro6Standard] = useState("");
  const [countryVal, setCountryVal] = useState("");
  const [cityVal, setCityVal] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  // Dynamic colors from API
  const { data: colorsResponse } = useGetAllColorsQuery(undefined);
  const colorOptions = useMemo(() => {
    const allOption = { value: "", label: "All" };
    const colorsData = colorsResponse?.data || [];
    const dynamicOptions = colorsData.map((c: any) => ({
      value: c.color,
      label: c.color,
    }));
    return [allOption, ...dynamicOptions];
  }, [colorsResponse]);

  const resultCount = useMemo(() => 12350, []);

  const restore = () => {
    setSearch("");
    setPrice({ min: 1000, max: 2000 });
    setYear({ min: 2010, max: 2025 });
    setMileage({ min: 0, max: 20000 });
    setRadius({ min: 0, max: 20000 });
    setCategory("");
    setBrand("");
    setModel("");
    setCondition("");
    setBuyLeaseVal("");
    setDriveType("");
    setFuel("");
    setGearbox("");
    setTransmission("");
    setPerformance("");
    setDisplacement("");
    setCylindersVal("");
    setWarranty("");
    setAccident("");
    setRangeKm(500);
    setBattery("");
    setInteriorColor("");
    setMetallic("");
    setExteriorColor("");
    setTowingKg(50);
    setCurbKg(1000);
    setTotalKg(1000);
    setSeats("");
    setDoors("");
    setFuelConsumption("");
    setCoKg(50);
    setEnergyClass("");
    setEuroStandard("");
    setEuro6Standard("");
    setCountryVal("");
    setCityVal("");
    setZipCode("");
    setSelectedEquipment([]);
  };

  // Field setter helpers for section components
  const handleSlider = (
    field: "price" | "year" | "mileage",
    value: { min: number; max: number },
  ) => {
    if (field === "price") setPrice(value);
    else if (field === "year") setYear(value);
    else setMileage(value);
  };

  return (
    <div className="py-10 bg-gray-50">
      <Container>
        <SearchHeader
          value={search}
          resultCount={resultCount}
          onChange={setSearch}
          onRestore={restore}
        />

        <PrimarySelectors
          values={{ category, brand, model }}
          onChange={(f, v) => {
            if (f === "category") setCategory(v);
            else if (f === "brand") setBrand(v);
            else setModel(v);
          }}
          options={{ categories }}
        />

        <SecondarySelectors
          values={{ condition, buyLease: buyLeaseVal, driveType }}
          onChange={(f, v) => {
            if (f === "condition") setCondition(v);
            else if (f === "buyLease") setBuyLeaseVal(v);
            else setDriveType(v);
          }}
          options={{ conditions, buyLease, driveTypes }}
        />

        <SlidersSection
          price={price}
          year={year}
          mileage={mileage}
          onChange={handleSlider}
        />

        <PowertrainSection
          values={{ fuel, gearbox, transmission }}
          onChange={(f, v) => {
            if (f === "fuel") setFuel(v);
            else if (f === "gearbox") setGearbox(v);
            else setTransmission(v);
          }}
          options={{ fuels, gearboxes, transmissions }}
        />

        <PerformanceSection
          values={{
            performance,
            displacement,
            cylinders: cylindersVal,
          }}
          onChange={(f, v) => {
            if (f === "performance") setPerformance(v);
            else if (f === "displacement") setDisplacement(v);
            else setCylindersVal(v);
          }}
          options={{ performances, displacements, cylinders }}
        />

        <WarrantyAccidentSection
          values={{ warranty, accident }}
          onChange={(f, v) => {
            if (f === "warranty") setWarranty(v);
            else setAccident(v);
          }}
          options={{ warranties, accidents }}
        />

        <EVInteriorSection
          values={{ rangeKm, battery, interiorColor }}
          onNumberChange={(_f, v) => setRangeKm(v)}
          onSelectChange={(f, v) => {
            if (f === "battery") setBattery(v);
            else setInteriorColor(v);
          }}
          options={{ batteryOptions, interiorColors: colorOptions }}
        />

        <AppearanceTowingSection
          values={{ metallic, exteriorColor, towingKg }}
          onNumberChange={(_f, v) => setTowingKg(v)}
          onSelectChange={(f, v) => {
            if (f === "metallic") setMetallic(v);
            else setExteriorColor(v);
          }}
          options={{ metallicOptions, exteriorColors: colorOptions }}
        />

        <WeightsSeatsSection
          values={{ curbKg, totalKg, seats }}
          onNumberChange={(f, v) => {
            if (f === "curbKg") setCurbKg(v);
            else setTotalKg(v);
          }}
          onSelectChange={(_f, v) => setSeats(v)}
          options={{ seatsOptions }}
        />

        <DoorsFuelCOSection
          values={{ doors, fuelConsumption, coKg }}
          onNumberChange={(_f, v) => setCoKg(v)}
          onSelectChange={(f, v) => {
            if (f === "doors") setDoors(v);
            else setFuelConsumption(v);
          }}
          options={{ doorsOptions, fuelConsumptionOptions }}
        />

        <EnergyEuroSection
          values={{ energyClass, euroStandard, euro6Standard }}
          onChange={(f, v) => {
            if (f === "energyClass") setEnergyClass(v);
            else if (f === "euroStandard") setEuroStandard(v);
            else setEuro6Standard(v);
          }}
          options={{
            energyEfficiencyClasses,
            euroStandards,
            euro6SubStandards,
          }}
        />

        <LocationRadiusSection
          values={{
            country: countryVal,
            city: cityVal,
            zipCode,
            radius,
          }}
          onSelectChange={(f, v) => {
            if (f === "country") setCountryVal(v);
            else if (f === "city") setCityVal(v);
            else setZipCode(v);
          }}
          onRadiusChange={setRadius}
          options={{ countries, cities, zipCodes }}
        />

        <EquipmentSection
          selected={selectedEquipment}
          onToggle={(label) =>
            setSelectedEquipment((prev) =>
              prev.includes(label)
                ? prev.filter((l) => l !== label)
                : [...prev, label],
            )
          }
        />
      </Container>
    </div>
  );
};

export default AdvancedSearchLegacy;

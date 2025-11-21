"use client";

import { useMemo, useState } from "react";
import { Search as SearchIcon, RotateCcw } from "lucide-react";
import Container from "@/components/ui/container";
import SelectDropdown from "@/components/ui/SelectDropdown";
import { Button } from "@/components/ui/button";

const RangeSlider = ({
  min,
  max,
  step = 1,
  value,
  onChange,
}: {
  min: number;
  max: number;
  step?: number;
  value: { min: number; max: number };
  onChange: (v: { min: number; max: number }) => void;
}) => {
  const setMin = (v: number) => {
    const next = Math.min(v, value.max);
    onChange({ min: next, max: value.max });
  };
  const setMax = (v: number) => {
    const next = Math.max(v, value.min);
    onChange({ min: value.min, max: next });
  };
  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div className="relative h-10">
      <div className="mt-5 h-2 bg-gray-200 rounded-full" />
      <div
        className="absolute h-2 bg-green-600 rounded-full top-1/12 -translate-y-1/2"
        style={{
          left: `${pct(value.min)}%`,
          right: `${100 - pct(value.max)}%`,
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value.min}
        onChange={(e) => setMin(Number(e.target.value))}
        className="range-track-transparent range-thumb w-full appearance-none bg-transparent absolute left-0 right-0 top-1/12 -translate-y-3/3 z-20"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value.max}
        onChange={(e) => setMax(Number(e.target.value))}
        className="range-track-transparent range-thumb w-full appearance-none bg-transparent absolute left-0 right-0 top-1/12 -translate-y-3/3 z-20"
      />
    </div>
  );
};

const AdvancedSearch = () => {
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState({ min: 1000, max: 2000 });
  const [year, setYear] = useState({ min: 2010, max: 2025 });
  const [mileage, setMileage] = useState({ min: 0, max: 20000 });

  const categories = [
    { value: "", label: "All" },
    { value: "sedan", label: "Sedan" },
    { value: "suv", label: "SUV" },
    { value: "hatchback", label: "Hatchback" },
    { value: "coupe", label: "Coupe" },
  ];
  const brands = [
    { value: "", label: "All" },
    { value: "bmw", label: "BMW" },
    { value: "audi", label: "Audi" },
    { value: "mercedes", label: "Mercedes" },
    { value: "toyota", label: "Toyota" },
  ];
  const models = [
    { value: "", label: "All" },
    { value: "3-series", label: "3 Series" },
    { value: "a4", label: "A4" },
    { value: "c-class", label: "C Class" },
    { value: "corolla", label: "Corolla" },
  ];
  const conditions = [
    { value: "", label: "All" },
    { value: "new", label: "New" },
    { value: "used", label: "Used" },
    { value: "certified", label: "Certified" },
  ];
  const buyLease = [
    { value: "", label: "All" },
    { value: "buy", label: "Buy" },
    { value: "lease", label: "Lease" },
  ];
  const driveTypes = [
    { value: "", label: "All" },
    { value: "fwd", label: "FWD" },
    { value: "rwd", label: "RWD" },
    { value: "awd", label: "AWD" },
  ];
  const fuels = [
    { value: "", label: "All" },
    { value: "petrol", label: "Petrol" },
    { value: "diesel", label: "Diesel" },
    { value: "hybrid", label: "Hybrid" },
    { value: "electric", label: "Electric" },
  ];
  const gearboxes = [
    { value: "", label: "All" },
    { value: "manual", label: "Manual" },
    { value: "automatic", label: "Automatic" },
    { value: "semi-auto", label: "Semi-auto" },
  ];
  const transmissions = [
    { value: "", label: "All" },
    { value: "5", label: "5-speed" },
    { value: "6", label: "6-speed" },
    { value: "7", label: "7-speed" },
  ];
  const performances = [
    { value: "", label: "All" },
    { value: "100", label: "100 PS" },
    { value: "200", label: "200 PS" },
    { value: "300", label: "300 PS" },
  ];
  const displacements = [
    { value: "", label: "All" },
    { value: "1000-2000", label: "1000-2000" },
    { value: "2000-3000", label: "2000-3000" },
    { value: "3000-4000", label: "3000-4000" },
  ];
  const cylinders = [
    { value: "", label: "All" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "6", label: "6" },
    { value: "8", label: "8" },
  ];
  const warranties = [
    { value: "", label: "All" },
    { value: "mfk", label: "MFK" },
    { value: "warranty", label: "Warranty" },
  ];
  const accidents = [
    { value: "", label: "All" },
    { value: "yes", label: "Accident Vehicles" },
    { value: "no", label: "No Accident" },
  ];
  const interiorColors = [
    { value: "", label: "All" },
    { value: "black", label: "Black" },
    { value: "gray", label: "Gray" },
    { value: "beige", label: "Beige" },
    { value: "brown", label: "Brown" },
  ];
  const exteriorColors = [
    { value: "", label: "All" },
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "silver", label: "Silver" },
    { value: "green", label: "Green" },
  ];
  const metallicOptions = [
    { value: "", label: "Yes/No" },
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];
  const seatsOptions = [
    { value: "", label: "All" },
    { value: "2", label: "2" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "7", label: "7" },
  ];
  const doorsOptions = [
    { value: "", label: "All" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];
  const fuelConsumptionOptions = [
    { value: "", label: "All" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];
  const energyEfficiencyClasses = [
    { value: "", label: "A-G" },
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
    { value: "E", label: "E" },
    { value: "F", label: "F" },
    { value: "G", label: "G" },
  ];
  const euroStandards = [
    { value: "", label: "Euro 1 - Euro 6" },
    { value: "euro-1", label: "Euro 1" },
    { value: "euro-2", label: "Euro 2" },
    { value: "euro-3", label: "Euro 3" },
    { value: "euro-4", label: "Euro 4" },
    { value: "euro-5", label: "Euro 5" },
    { value: "euro-6", label: "Euro 6" },
  ];
  const euro6SubStandards = [
    { value: "", label: "6a-6e" },
    { value: "6a", label: "6a" },
    { value: "6b", label: "6b" },
    { value: "6c", label: "6c" },
    { value: "6d", label: "6d" },
    { value: "6e", label: "6e" },
  ];
  const countries = [
    { value: "", label: "All" },
    { value: "usa", label: "USA" },
    { value: "germany", label: "Germany" },
    { value: "switzerland", label: "Switzerland" },
    { value: "france", label: "France" },
    { value: "italy", label: "Italy" },
    { value: "uk", label: "UK" },
  ];
  const cities = [
    { value: "", label: "All" },
    { value: "new-york", label: "New York" },
    { value: "berlin", label: "Berlin" },
    { value: "zurich", label: "Zurich" },
    { value: "paris", label: "Paris" },
    { value: "rome", label: "Rome" },
    { value: "london", label: "London" },
  ];
  const zipCodes = [
    { value: "", label: "All" },
    { value: "10001", label: "10001" },
    { value: "10115", label: "10115" },
    { value: "8001", label: "8001" },
    { value: "75001", label: "75001" },
    { value: "00185", label: "00185" },
    { value: "SW1A", label: "SW1A" },
  ];
  const [radius, setRadius] = useState({ min: 0, max: 20000 });
  const equipmentOptions: { label: string; count: number }[] = [
    { label: "ABS", count: 128151 },
    { label: "Accesso e accensione senza chiave", count: 81695 },
    { label: "Aiuti al parcheggio", count: 66207 },
    { label: "Altoparlante", count: 65203 },
    { label: "Alzacristalli elettrici", count: 97030 },
    { label: "Android Auto", count: 64373 },
    { label: "Apple CarPlay", count: 66654 },
    { label: "Aria condizionata", count: 134856 },
    { label: "Climatizzatore automatico", count: 123996 },
    { label: "Assistente di corsia", count: 85471 },
    { label: "Assistente di frenata automatico", count: 81098 },
    { label: "Bloccaggio differenziale", count: 46545 },
    { label: "Cerchi in lega", count: 127143 },
    { label: "Controllo di velocità", count: 116990 },
    { label: "Controllo di velocità adattivo", count: 75991 },
    { label: "Controllo elettronico della stabilità (ESP)", count: 121589 },
    { label: "Coperture dei sedili", count: 120854 },
    { label: "Alcantara", count: 19472 },
    { label: "Interni in tessuto", count: 73920 },
    { label: "Sedili in pelle", count: 59464 },
    { label: "Dispositivo antifurto", count: 17593 },
    { label: "Elementi cromati", count: 10469 },
    { label: "Fari", count: 102674 },
    { label: "Fari allo laser", count: 2781 },
    { label: "Fari LED", count: 87272 },
    { label: "Fari allo xeno", count: 18285 },
    { label: "Fari adattivi", count: 30467 },
    { label: "Gancio traino", count: 30142 },
    { label: "Gancio di traino rimovibile", count: 9381 },
    { label: "Gancio di traino orientabile", count: 16402 },
    { label: "Gancio di traino fisso", count: 21764 },
    { label: "Head-up Display", count: 36664 },
    { label: "Interfaccia Bluetooth", count: 94226 },
    { label: "ISOFIX", count: 109058 },
    { label: "Pedana", count: 2210 },
    { label: "Pittura speciale", count: 3739 },
    { label: "Porta scorrevole", count: 5269 },
    { label: "Portapacchi", count: 244 },
    { label: "Porte ad ali di gabbiano", count: 1852 },
    { label: "Portellone posteriore elettrico", count: 23826 },
    { label: "Radio DAB", count: 100705 },
    { label: "Regolazione elettrica dei sedili", count: 88236 },
    { label: "Ricarica rapida", count: 44088 },
    { label: "Riscaldamento ausiliario", count: 11668 },
    { label: "Schienale", count: 1052 },
    { label: "Sedili riscaldati", count: 105055 },
    { label: "Sedili sportivi", count: 53142 },
    { label: "Sedili ventilati", count: 25404 },
    { label: "Sensori di parcheggio anteriori", count: 94268 },
    { label: "Sensori di parcheggio posteriori", count: 111643 },
    { label: "Silenziatore personalizzato", count: 2702 },
    { label: "Sistema di allarme", count: 49690 },
    { label: "Sistema di monitoraggio angolo cieco", count: 73349 },
    { label: "Sistema di navigazione", count: 93986 },
    { label: "Navigazione", count: 93643 },
    { label: "Sistema di navigazione portatile", count: 1295 },
    { label: "Sistema start-stop", count: 78881 },
    { label: "Sospensioni pneumatiche", count: 14890 },
    { label: "Sospensioni rinforzate", count: 556 },
    { label: "Strumentazione aggiuntiva", count: 49132 },
    { label: "Telecamera a 360°", count: 46528 },
    { label: "Telecamera posteriore", count: 95905 },
    { label: "Tetto panoramico", count: 38438 },
    { label: "Tetto rigido", count: 1005 },
    { label: "Tettuccio apribile", count: 33975 },
    { label: "Valigia", count: 2518 },
    { label: "Vivavoce", count: 67216 },
  ];
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const equipmentColumns = 4;
  const perColEquip = Math.ceil(equipmentOptions.length / equipmentColumns);
  const chunkedEquip = Array.from({ length: equipmentColumns }, (_, i) =>
    equipmentOptions.slice(i * perColEquip, i * perColEquip + perColEquip)
  );
  const toggleEquip = (label: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const [rangeKm, setRangeKm] = useState(500);
  const [batteryCap, setBatteryCap] = useState("");
  const batteryOptions = [
    { value: "", label: "All" },
    { value: "0-20", label: "0-20 kWh" },
    { value: "20-50", label: "20-50 kWh" },
    { value: "50-100", label: "50-100 kWh" },
    { value: "100+", label: "100+ kWh" },
  ];
  const [towingKg, setTowingKg] = useState(50);
  const [curbKg, setCurbKg] = useState(25680);
  const [totalKg, setTotalKg] = useState(25680);
  const [coKg, setCoKg] = useState(50);

  const resultCount = useMemo(() => 12350, []);

  const restore = () => {
    setSearch("");
    setPrice({ min: 1000, max: 2000 });
    setYear({ min: 2010, max: 2025 });
    setMileage({ min: 0, max: 20000 });
  };

  return (
    <div className="py-10 bg-gray-50">
      <Container>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Find your choice"
            className="flex-1 h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="h-12 w-12 rounded-lg border flex items-center justify-center"
            onClick={restore}
          >
            <RotateCcw className="h-5 w-5 text-gray-600" />
          </button>
          <Button className="h-12 px-5 rounded-lg">
            <SearchIcon className="mr-2" /> {resultCount.toLocaleString()}{" "}
            result
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectDropdown
            id="category"
            options={categories}
            label="Vehicle Category"
          />
          <SelectDropdown id="brand" options={brands} label="Brand" />
          <SelectDropdown id="model" options={models} label="Model" />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectDropdown
            id="condition"
            options={conditions}
            label="Condition"
          />
          <SelectDropdown id="buylease" options={buyLease} label="Buy/Lease" />
          <SelectDropdown id="drive" options={driveTypes} label="Drive type" />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8">
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">
              Price Range
            </div>
            <div className="flex items-center gap-10 w-full">
              <div className="flex items-center gap-4 mb-3">
                <div className="relative w-40">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    className="w-full pl-7 pr-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={price.min}
                    onChange={(e) => {
                      const v = Number(e.target.value || 0);
                      setPrice((prev) => ({
                        min: Math.min(v, prev.max),
                        max: prev.max,
                      }));
                    }}
                  />
                </div>
                <span className="text-gray-500">-</span>
                <div className="relative w-40">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    className="w-full pl-7 pr-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={price.max}
                    onChange={(e) => {
                      const v = Number(e.target.value || 0);
                      setPrice((prev) => ({
                        min: prev.min,
                        max: Math.max(v, prev.min),
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="w-full">
                <RangeSlider
                  min={0}
                  max={100000}
                  step={100}
                  value={price}
                  onChange={setPrice}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Year</div>
            <div className="flex items-center gap-10 w-full">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-40">
                  <input
                    type="number"
                    className="w-full px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={year.min}
                    onChange={(e) => {
                      const v = Number(e.target.value || 0);
                      setYear((prev) => ({
                        min: Math.min(v, prev.max),
                        max: prev.max,
                      }));
                    }}
                  />
                </div>
                <span className="text-gray-500">-</span>
                <div className="w-40">
                  <input
                    type="number"
                    className="w-full px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={year.max}
                    onChange={(e) => {
                      const v = Number(e.target.value || 0);
                      setYear((prev) => ({
                        min: prev.min,
                        max: Math.max(v, prev.min),
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="w-full">
                <RangeSlider
                  min={1950}
                  max={2025}
                  step={1}
                  value={year}
                  onChange={setYear}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">
              Mileage
            </div>
            <div className="flex items-center gap-10 w-full">
              <div className="flex items-center gap-4 mb-3">
                <div className="relative w-40">
                  <input
                    type="number"
                    className="w-full pr-10 px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={mileage.min}
                    onChange={(e) => {
                      const v = Number(e.target.value || 0);
                      setMileage((prev) => ({
                        min: Math.min(v, prev.max),
                        max: prev.max,
                      }));
                    }}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    km
                  </span>
                </div>
                <span className="text-gray-500">-</span>
                <div className="relative w-40">
                  <input
                    type="number"
                    className="w-full pr-10 px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={mileage.max}
                    onChange={(e) => {
                      const v = Number(e.target.value || 0);
                      setMileage((prev) => ({
                        min: prev.min,
                        max: Math.max(v, prev.min),
                      }));
                    }}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    km
                  </span>
                </div>
              </div>
              <div className="w-full">
                <RangeSlider
                  min={0}
                  max={400000}
                  step={1000}
                  value={mileage}
                  onChange={setMileage}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectDropdown id="fuel" options={fuels} label="Fuel" />
          <SelectDropdown id="gearbox" options={gearboxes} label="Gearbox" />
          <SelectDropdown
            id="transmission"
            options={transmissions}
            label="Transmission"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectDropdown
            id="performance"
            options={performances}
            label="Performance"
          />
          <SelectDropdown
            id="displacement"
            options={displacements}
            label="Engine displacement"
          />
          <SelectDropdown
            id="cylinders"
            options={cylinders}
            label="Cylinders"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectDropdown
            id="warranty"
            options={warranties}
            label="MFK & Warranty"
          />
          <SelectDropdown
            id="accident"
            options={accidents}
            label="Accident Vehicles"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Range</div>
            <div className="relative">
              <input
                type="number"
                className="w-full pr-10 px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={rangeKm}
                onChange={(e) => setRangeKm(Number(e.target.value || 0))}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">km</span>
            </div>
          </div>
          <SelectDropdown id="battery" options={batteryOptions} label="Battery capacity" />
          <SelectDropdown id="interiorColor" options={interiorColors} label="Interior Color" />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectDropdown id="metallic" options={metallicOptions} label="Metallic" />
          <SelectDropdown id="exteriorColor" options={exteriorColors} label="Exterior Color" />
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Towing capacity</div>
            <div className="relative">
              <input
                type="number"
                className="w-full pr-10 px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={towingKg}
                onChange={(e) => setTowingKg(Number(e.target.value || 0))}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">kg</span>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Curb weight</div>
            <div className="relative">
              <input
                type="number"
                className="w-full pr-10 px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={curbKg}
                onChange={(e) => setCurbKg(Number(e.target.value || 0))}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">kg</span>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Total weight</div>
            <div className="relative">
              <input
                type="number"
                className="w-full pr-10 px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={totalKg}
                onChange={(e) => setTotalKg(Number(e.target.value || 0))}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">kg</span>
            </div>
          </div>
          <SelectDropdown id="seats" options={seatsOptions} label="Number of seats" />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectDropdown id="doors" options={doorsOptions} label="Number of doors" />
          <SelectDropdown id="fuelConsumption" options={fuelConsumptionOptions} label="Fuel consumption" />
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">CO Emissions</div>
            <div className="relative">
              <input
                type="number"
                className="w-full pr-10 px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={coKg}
                onChange={(e) => setCoKg(Number(e.target.value || 0))}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">kg</span>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectDropdown id="energyClass" options={energyEfficiencyClasses} label="Energy efficiency class" />
          <SelectDropdown id="euroStandard" options={euroStandards} label="Euro Standard" />
          <SelectDropdown id="euro6Standard" options={euro6SubStandards} label="Euro 6 Standard" />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectDropdown id="country" options={countries} label="Country" />
          <SelectDropdown id="city" options={cities} label="City" />
          <SelectDropdown id="zipCode" options={zipCodes} label="ZIP code" />
        </div>

        <div className="mt-6">
          <div className="text-sm font-medium text-gray-700 mb-2">Radius</div>
          <div className="flex items-center gap-10 w-full">
            <div className="flex items-center gap-4 mb-3">
              <div className="relative w-40">
                <input
                  type="number"
                  className="w-full pr-10 px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={radius.min}
                  onChange={(e) => {
                    const v = Number(e.target.value || 0);
                    setRadius((prev) => ({ min: Math.min(v, prev.max), max: prev.max }));
                  }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">km</span>
              </div>
              <span className="text-gray-500">-</span>
              <div className="relative w-40">
                <input
                  type="number"
                  className="w-full pr-10 px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={radius.max}
                  onChange={(e) => {
                    const v = Number(e.target.value || 0);
                    setRadius((prev) => ({ min: prev.min, max: Math.max(v, prev.min) }));
                  }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">km</span>
              </div>
            </div>
            <div className="w-full">
              <RangeSlider min={0} max={50000} step={100} value={radius} onChange={setRadius} />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="text-sm font-medium text-gray-700 mb-3">Equipment</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {chunkedEquip.map((col, cIdx) => (
              <div key={cIdx} className="space-y-3">
                {col.map(({ label, count }, idx) => {
                  const id = `adv-equip-${cIdx}-${idx}`;
                  const checked = selectedEquipment.includes(label);
                  return (
                    <label key={id} htmlFor={id} className="flex items-center gap-2 text-gray-800">
                      <input
                        id={id}
                        type="checkbox"
                        className="h-4 w-4 border-gray-300 rounded"
                        checked={checked}
                        onChange={() => toggleEquip(label)}
                      />
                      <span className="flex-1 text-sm md:text-base">{label}</span>
                      <span className="text-xs text-gray-500">{count.toLocaleString()}</span>
                    </label>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdvancedSearch;

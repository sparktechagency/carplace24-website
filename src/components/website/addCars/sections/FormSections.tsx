"use client";

import SelectDropdown from "../SelectDropdown";
import FormSection from "../FormSection";

interface FormSectionsProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

export const Pricing = ({ formData, handleInputChange }: FormSectionsProps) => {
  return (
    <FormSection title="Pricing">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="regularPrice"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Regular Price
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              $
            </span>
            <input
              type="text"
              id="regularPrice"
              placeholder="0.00"
              className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.regularPrice || ""}
              onChange={(e) => handleInputChange("regularPrice", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="offerPrice"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Offer Price
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              $
            </span>
            <input
              type="text"
              id="offerPrice"
              placeholder="0.00"
              className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.offerPrice || ""}
              onChange={(e) => handleInputChange("offerPrice", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="leasingRate"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Leasing Rate
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              $
            </span>
            <input
              type="text"
              id="leasingRate"
              placeholder="0.00"
              className="w-full pl-8 pr-20 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.leasingRate || ""}
              onChange={(e) => handleInputChange("leasingRate", e.target.value)}
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 text-sm">
              /Month
            </span>
          </div>
        </div>
      </div>
    </FormSection>
  );
};

export const TechnicalSpecifications = ({ formData, handleInputChange }: FormSectionsProps) => {
  return (
    <FormSection title="Technical Specifications">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectDropdown
          id="fuel-type"
          label="Fuel Type"
          options={[
            { value: "petrol", label: "Petrol" },
            { value: "diesel", label: "Diesel" },
            { value: "electric", label: "Electric" },
            { value: "hybrid", label: "Hybrid" },
            { value: "plugin-hybrid", label: "Plug-in Hybrid" },
          ]}
          value={formData.fuelType}
          onChange={(e) => handleInputChange("fuelType", e.target.value)}
        />
        <SelectDropdown
          id="drive-type"
          label="Drive Type"
          options={[
            { value: "awd", label: "AWD" },
            { value: "fwd", label: "FWD" },
            { value: "rwd", label: "RWD" },
            { value: "4wd", label: "4WD" },
          ]}
          value={formData.driveType}
          onChange={(e) => handleInputChange("driveType", e.target.value)}
        />
        <SelectDropdown
          id="transmission"
          label="Transmission"
          options={[
            { value: "manual", label: "Manual" },
            { value: "automatic", label: "Automatic" },
            { value: "semi-automatic", label: "Semi-Automatic" },
            { value: "cvt", label: "CVT" },
          ]}
          value={formData.transmission}
          onChange={(e) => handleInputChange("transmission", e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Performance (HP)
          </label>
          <input
            type="text"
            placeholder="Horsepower PS"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.performance}
            onChange={(e) => handleInputChange("performance", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Engine Displacement
          </label>
          <input
            type="text"
            placeholder="cm³"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.engineDisplacement}
            onChange={(e) =>
              handleInputChange("engineDisplacement", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Cylinders
          </label>
          <input
            type="text"
            placeholder="Number of cylinders"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.cylinders}
            onChange={(e) => handleInputChange("cylinders", e.target.value)}
          />
        </div>
      </div>
    </FormSection>
  );
};

export const ElectricHybridSpecific = ({ formData, handleInputChange }: FormSectionsProps) => {
  return (
    <FormSection title="Electric & Hybrid Specific">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Range
          </label>
          <input
            type="text"
            placeholder="WLTP/km"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.range}
            onChange={(e) => handleInputChange("range", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Battery Capacity
          </label>
          <input
            type="text"
            placeholder="kWh"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.batteryCapacity}
            onChange={(e) => handleInputChange("batteryCapacity", e.target.value)}
          />
        </div>
      </div>
    </FormSection>
  );
};

export const WeightInformation = ({ formData, handleInputChange }: FormSectionsProps) => {
  return (
    <FormSection title="Weight Information">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Towing capacity
          </label>
          <div className="relative">
            <input
              type="text"
              id="towing-capacity"
              placeholder="kg"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.towingCapacity || ""}
              onChange={(e) => handleInputChange("towingCapacity", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total weight
          </label>
          <div className="relative">
            <input
              type="text"
              id="total-weight"
              placeholder="kg"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.totalWeight || ""}
              onChange={(e) => handleInputChange("totalWeight", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Curb weight
          </label>
          <div className="relative">
            <input
              type="text"
              id="curb-weight"
              placeholder="kg"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.curbWeight || ""}
              onChange={(e) => handleInputChange("curbWeight", e.target.value)}
            />
          </div>
        </div>
      </div>
    </FormSection>
  );
};

export const Equipment = ({ formData, handleInputChange }: FormSectionsProps) => {
  const equipmentOptions: string[] = [
    "ABS",
    "360° camera",
    "Adaptive cruise control",
    "Alarm system",
    "Electric seat adjustment",
    "Towbar",
    "Leather / Alcantara / fabric seats",
    "Heated / ventilated seats",
    "Sunroof / panoramic roof",
    "Android Auto",
    "Navigation system (built-in / portable)",
    "Parking sensors (front, rear) / Parking assist",
    "Head-up display",
    "Xenon / LED / Laser headlights",
    "Keyless entry / start",
    "Isofix",
    "Start-stop system",
    "Theft protection",
    "Climate control (manual / automatic)",
    "Sports seats",
    "Speed limiter",
    "Stability control (ESP)",
    "Sound system",
  ];

  const selected: string[] = formData.equipmentFeatures || [];

  const toggleOption = (label: string) => {
    const next = selected.includes(label)
      ? selected.filter((l) => l !== label)
      : [...selected, label];
    handleInputChange("equipmentFeatures", next);
  };

  return (
    <FormSection title="Equipment">
      {/* Checkboxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {equipmentOptions.map((label, idx) => {
          const id = `equip-${idx}`;
          const checked = selected.includes(label);
          return (
            <label key={id} htmlFor={id} className="flex items-center gap-2 text-gray-800">
              <input
                id={id}
                type="checkbox"
                className="h-4 w-4 border-gray-300 rounded"
                checked={checked}
                onChange={() => toggleOption(label)}
              />
              <span className="text-sm md:text-base">{label}</span>
            </label>
          );
        })}
      </div>

      {/* Optional: equipment weight input retained */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Equipment Weight
          </label>
          <div className="relative">
            <input
              type="text"
              id="equipment-curb-weight"
              placeholder="kg"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.equipmentCurbWeight || ""}
              onChange={(e) => handleInputChange("equipmentCurbWeight", e.target.value)}
            />
          </div>
        </div>
      </div>
    </FormSection>
  );
};

export const Extras = ({ formData, handleInputChange }: FormSectionsProps) => {
  return (
    <FormSection title="Extras">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <SelectDropdown
            id="tires"
            label="Tires"
            options={[
              { value: "4wd", label: "4WD" },
              { value: "awd", label: "AWD" },
              { value: "2wd", label: "2WD" }
            ]}
            value={formData.tires || ""}
            onChange={(e) => handleInputChange("tires", e.target.value)}
          />
        </div>
        <div>
          <SelectDropdown
            id="summer-winter"
            label="Summer /Winter"
            options={[
              { value: "summer", label: "Summer" },
              { value: "winter", label: "Winter" },
              { value: "all-season", label: "All Season" }
            ]}
            value={formData.summerWinter || ""}
            onChange={(e) => handleInputChange("summerWinter", e.target.value)}
          />
        </div>
        <div>
          <SelectDropdown
            id="handicap-accessible"
            label="Handicap accessible"
            options={[
              { value: "yes", label: "yes" },
              { value: "no", label: "no" }
            ]}
            value={formData.handicapAccessible || ""}
            onChange={(e) => handleInputChange("handicapAccessible", e.target.value)}
          />
        </div>
        <div>
          <SelectDropdown
            id="race-car"
            label="Race Car"
            options={[
              { value: "yes", label: "yes" },
              { value: "no", label: "no" }
            ]}
            value={formData.raceCar || ""}
            onChange={(e) => handleInputChange("raceCar", e.target.value)}
          />
        </div>
        <div>
          <SelectDropdown
            id="tuning"
            label="Tuning"
            options={[
              { value: "yes", label: "yes" },
              { value: "no", label: "no" }
            ]}
            value={formData.tuning || ""}
            onChange={(e) => handleInputChange("tuning", e.target.value)}
          />
        </div>
      </div>
    </FormSection>
  );
};

export const Colour = ({ formData, handleInputChange }: FormSectionsProps) => {
  return (
    <FormSection title="Colour">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Exterior colour</label>
          <div className="relative">
            <input
              type="text"
              id="exterior-colour"
              placeholder="Black, Blue"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.exteriorColour || ""}
              onChange={(e) => handleInputChange("exteriorColour", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Interior Colour</label>
          <div className="relative">
            <input
              type="text"
              id="interior-colour"
              placeholder="White, Ash"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.interiorColour || ""}
              onChange={(e) => handleInputChange("interiorColour", e.target.value)}
            />
          </div>
        </div>
      </div>
    </FormSection>
  );
};

export const SeatsAndDoors = ({ formData, handleInputChange }: FormSectionsProps) => {
  return (
    <FormSection title="Seats & Doors">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Seats & Door</label>
          <div className="relative">
            <input
              type="text"
              id="seats-door"
              placeholder="5 Seats"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.seatsAndDoor || ""}
              onChange={(e) => handleInputChange("seatsAndDoor", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Door</label>
          <div className="relative">
            <input
              type="text"
              id="door"
              placeholder="4"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.door || ""}
              onChange={(e) => handleInputChange("door", e.target.value)}
            />
          </div>
        </div>
      </div>
    </FormSection>
  );
};

export const EnergyAndEnvironment = ({ formData, handleInputChange }: FormSectionsProps) => {
  return (
    <FormSection title="Energy & Environment">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Consumption</label>
          <div className="relative">
            <input
              type="text"
              id="fuel-consumption"
              placeholder="l/100 km"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.fuelConsumption || ""}
              onChange={(e) => handleInputChange("fuelConsumption", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Co emissions</label>
          <div className="relative">
            <input
              type="text"
              id="co-emissions"
              placeholder="g/km"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.coEmissions || ""}
              onChange={(e) => handleInputChange("coEmissions", e.target.value)}
            />
          </div>
        </div>
        <div>
          <SelectDropdown
            id="energy-efficiency"
            label="Energy efficiency class"
            options={[
              { value: "euro1", label: "Euro 1 - euro 6" },
              { value: "euro2", label: "Euro 2" },
              { value: "euro3", label: "Euro 3" },
              { value: "euro4", label: "Euro 4" },
              { value: "euro5", label: "Euro 5" },
              { value: "euro6", label: "Euro 6" }
            ]}
            value={formData.energyEfficiencyClass || ""}
            onChange={(e) => handleInputChange("energyEfficiencyClass", e.target.value)}
          />
        </div>
      </div>
    </FormSection>
  );
};

export const EuroStandard = ({ formData, handleInputChange }: FormSectionsProps) => {
  return (
    <FormSection title="Euro Standard">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fuel type</label>
          <div className="relative">
            <input
              type="text"
              id="euro-fuel-type"
              placeholder="2010"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.euroFuelType || ""}
              onChange={(e) => handleInputChange("euroFuelType", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
          <div className="relative">
            <input
              type="text"
              id="euro-transmission"
              placeholder="32000"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.euroTransmission || ""}
              onChange={(e) => handleInputChange("euroTransmission", e.target.value)}
            />
          </div>
        </div>
      </div>
    </FormSection>
  );
};

export const Location = ({ formData, handleInputChange }: FormSectionsProps) => {
  return (
    <FormSection title="Location">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <div className="relative">
            <input
              type="text"
              id="country"
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.country || ""}
              onChange={(e) => handleInputChange("country", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <div className="relative">
            <input
              type="text"
              id="city"
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.city || ""}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Zip code</label>
          <div className="relative">
            <input
              type="text"
              id="zip-code"
              placeholder="Zip code"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.zipCode || ""}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          placeholder="Enter product description"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          value={formData.description || ""}
          onChange={(e) => handleInputChange("description", e.target.value)}
        ></textarea>
      </div>
    </FormSection>
  );
};
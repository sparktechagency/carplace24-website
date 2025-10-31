"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import SelectDropdown from "./SelectDropdown";
import ImageUploader from "./ImageUploader";
import FormSection from "./FormSection";
import {
  TechnicalSpecifications,
  ElectricHybridSpecific,
  WeightInformation,
  Equipment,
  Extras,
  Colour,
  SeatsAndDoors,
  EnergyAndEnvironment,
  EuroStandard,
  Location,
  Pricing,
} from "./sections/FormSections";

const AddCarsPage = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    vehicleName: "",
    vinNo: "",
    categories: "",
    brand: "",
    model: "",
    year: "",
    condition: "",
    mileage: "",
    warranty: "",
    accident: "",
    bodyType: "",
    regularPrice: "",
    offerPrice: "",
    leasingRate: "",
    fuelType: "",
    driveType: "",
    transmission: "",
    performance: "",
    engineDisplacement: "",
    cylinders: "",
    range: "",
    batteryCapacity: "",
    towingCapacity: "",
    totalWeight: "",
    curbWeight: "",
    equipmentCurbWeight: "",
    equipmentTransmission: "",
    tires: "",
    summerWinter: "",
    handicapAccessible: "",
    raceCar: "",
    tuning: "",
    exteriorColour: "",
    interiorColour: "",
    seatsAndDoor: "",
    door: "",
    fuelConsumption: "",
    coEmissions: "",
    energyEfficiencyClass: "",
    euroFuelType: "",
    euroTransmission: "",
    country: "",
    city: "",
    zipCode: "",
    description: "",
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Vehicle</h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the details below to list your vehicle
          </p>
        </div>

        {/* Main Form */}
        <div className="space-y-6">
          {/* Vehicle Images */}
          <FormSection title="Vehicle Images">
            <ImageUploader images={images} setImages={setImages} />
          </FormSection>

          {/* Basic Information */}
          <FormSection title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Vehicle Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. BMW 3 Series"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.vehicleName}
                  onChange={(e) =>
                    handleInputChange("vehicleName", e.target.value)
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="vinNo"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  VIN No.
                </label>
                <input
                  type="text"
                  id="vinNo"
                  placeholder="1GCVKREC8EZ157379"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.vinNo}
                  onChange={(e) => handleInputChange("vinNo", e.target.value)}
                />
              </div>

              <div>
                <SelectDropdown
                  id="categories"
                  label="Categories"
                  options={[
                    { value: "Van", label: "Van" },
                    { value: "SUV", label: "SUV" },
                    { value: "Sedan", label: "Sedan" },
                    { value: "Truck", label: "Truck" },
                  ]}
                  value={formData.categories}
                  onChange={(e) =>
                    handleInputChange("categories", e.target.value)
                  }
                />
              </div>

              <div>
                <SelectDropdown
                  id="brand"
                  label="Brand"
                  options={[
                    { value: "Audi", label: "Audi" },
                    { value: "BMW", label: "BMW" },
                    { value: "Mercedes", label: "Mercedes" },
                    { value: "Toyota", label: "Toyota" },
                  ]}
                  value={formData.brand}
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                />
              </div>

              <div>
                <SelectDropdown
                  id="model"
                  label="Model"
                  options={[
                    { value: "Audi", label: "Audi" },
                    { value: "A4", label: "A4" },
                    { value: "A6", label: "A6" },
                    { value: "Q5", label: "Q5" },
                  ]}
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Year
                </label>
                <input
                  type="text"
                  id="year"
                  placeholder="2010"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                />
              </div>

              <div>
                <SelectDropdown
                  id="condition"
                  label="Condition"
                  options={[
                    { value: "New", label: "New" },
                    { value: "Used", label: "Used" },
                    { value: "Certified", label: "Certified" },
                  ]}
                  value={formData.condition}
                  onChange={(e) =>
                    handleInputChange("condition", e.target.value)
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="mileage"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Mileage
                </label>
                <input
                  type="text"
                  id="mileage"
                  placeholder="32000"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.mileage}
                  onChange={(e) => handleInputChange("mileage", e.target.value)}
                />
              </div>

              <div>
                <SelectDropdown
                  id="warranty"
                  label="MFK Warranty"
                  options={[
                    { value: "With warranty", label: "With warranty" },
                    { value: "No warranty", label: "No warranty" },
                  ]}
                  value={formData.warranty}
                  onChange={(e) =>
                    handleInputChange("warranty", e.target.value)
                  }
                />
              </div>

              <div>
                <SelectDropdown
                  id="accident"
                  label="Accident Vehicle"
                  options={[
                    { value: "Accident vehicle", label: "Accident vehicle" },
                    { value: "No accident", label: "No accident" },
                  ]}
                  value={formData.accident}
                  onChange={(e) =>
                    handleInputChange("accident", e.target.value)
                  }
                />
              </div>

              <div>
                <SelectDropdown
                  id="bodyType"
                  label="Body Type"
                  options={[
                    { value: "SUV", label: "SUV" },
                    { value: "Sedan", label: "Sedan" },
                    { value: "Coupe", label: "Coupe" },
                    { value: "Truck", label: "Truck" },
                  ]}
                  value={formData.bodyType}
                  onChange={(e) =>
                    handleInputChange("bodyType", e.target.value)
                  }
                />
              </div>
            </div>
          </FormSection>

          {/* Pricing */}
          <Pricing formData={formData} handleInputChange={handleInputChange} />

          {/* Technical Specifications */}
          <TechnicalSpecifications
            formData={formData}
            handleInputChange={handleInputChange}
          />

          {/* Electric & Hybrid Specific */}
          <ElectricHybridSpecific
            formData={formData}
            handleInputChange={handleInputChange}
          />

          {/* Weight Information */}
          <WeightInformation
            formData={formData}
            handleInputChange={handleInputChange}
          />

          {/* Equipment */}
          <Equipment
            formData={formData}
            handleInputChange={handleInputChange}
          />

          {/* Extras */}
          <Extras formData={formData} handleInputChange={handleInputChange} />

          {/* Colour */}
          <Colour formData={formData} handleInputChange={handleInputChange} />

          {/* Seats & Doors */}
          <SeatsAndDoors
            formData={formData}
            handleInputChange={handleInputChange}
          />

          {/* Energy & Environment */}
          <EnergyAndEnvironment
            formData={formData}
            handleInputChange={handleInputChange}
          />

          {/* Euro Standard */}
          <EuroStandard
            formData={formData}
            handleInputChange={handleInputChange}
          />

          {/* Location */}
          <Location formData={formData} handleInputChange={handleInputChange} />

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              List Vehicle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCarsPage;

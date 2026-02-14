"use client";

import SelectDropdown from "./SelectDropdown";

interface BasicInfoSectionProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  brandOptions: any[];
  modelOptions: any[];
}

const BasicInfoSection = ({
  formData,
  handleInputChange,
  brandOptions,
  modelOptions,
}: BasicInfoSectionProps) => {
  return (
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
          onChange={(e) => handleInputChange("vehicleName", e.target.value)}
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
          id="brand"
          label="Brand"
          options={brandOptions}
          value={formData.brand}
          onChange={(e) => {
            const val = e.target.value;
            handleInputChange("brand", val);
            handleInputChange("model", "");
          }}
        />
      </div>

      <div>
        <SelectDropdown
          id="model"
          label="Model"
          options={modelOptions}
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
          onChange={(e) => handleInputChange("condition", e.target.value)}
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
          onChange={(e) => handleInputChange("warranty", e.target.value)}
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
          onChange={(e) => handleInputChange("accident", e.target.value)}
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
          onChange={(e) => handleInputChange("bodyType", e.target.value)}
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;

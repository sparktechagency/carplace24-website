"use client";

import SelectDropdown from "../SelectDropdown";
import ImageUploader from "../ImageUploader";

interface BasicInformationProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const BasicInformation = ({ images, setImages }: BasicInformationProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="vehicleName"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Vehicle Name
            </label>
            <input
              type="text"
              id="vehicleName"
              placeholder="Enter vehicle name"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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
              />
            </div>
            <SelectDropdown
              id="categories"
              label="Categories"
              options={[
                { value: "Van", label: "Van" },
                { value: "SUV", label: "SUV" },
                { value: "Sedan", label: "Sedan" },
                { value: "Truck", label: "Truck" },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SelectDropdown
              id="brand"
              label="Brand"
              options={[
                { value: "Audi", label: "Audi" },
                { value: "BMW", label: "BMW" },
                { value: "Mercedes", label: "Mercedes" },
                { value: "Toyota", label: "Toyota" },
              ]}
            />
            <SelectDropdown
              id="model"
              label="Model"
              options={[
                { value: "Audi", label: "Audi" },
                { value: "A4", label: "A4" },
                { value: "A6", label: "A6" },
                { value: "Q5", label: "Q5" },
              ]}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
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
              />
            </div>
            <SelectDropdown
              id="condition"
              label="Condition"
              options={[
                { value: "New", label: "New" },
                { value: "Used", label: "Used" },
                { value: "Certified", label: "Certified" },
              ]}
            />
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
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <SelectDropdown
              id="warranty"
              label="MFK Warranty"
              options={[
                { value: "With warranty", label: "With warranty" },
                { value: "No warranty", label: "No warranty" },
              ]}
            />
            <SelectDropdown
              id="accident"
              label="Accident Vehicle"
              options={[
                { value: "Accident vehicle", label: "Accident vehicle" },
                { value: "No accident", label: "No accident" },
              ]}
            />
            <SelectDropdown
              id="bodyType"
              label="Body Type"
              options={[
                { value: "SUV", label: "SUV" },
                { value: "Sedan", label: "Sedan" },
                { value: "Coupe", label: "Coupe" },
                { value: "Truck", label: "Truck" },
              ]}
            />
          </div>
        </div>

        {/* Right Section - Images */}
        <div>
          <ImageUploader images={images} setImages={setImages} />
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
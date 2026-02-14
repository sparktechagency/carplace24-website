"use client";

import { useRef } from "react";
import Container from "@/components/ui/container";
import FormSection from "./FormSection";
import ImageUploader from "./ImageUploader";
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
  Pricing,
} from "./FormSections";
import { useAddCarForm } from "./useAddCarForm";
import AddCarHeader from "./AddCarHeader";
import SubscriptionWarning from "./SubscriptionWarning";
import BasicInfoSection from "./BasicInfoSection";
import AboutCarSection from "./AboutCarSection";

const AddCarsPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    images,
    setImages,
    formData,
    handleInputChange,
    handleSubmit,
    handleBulkUpload,
    isUploadingBulk,
    isDealer,
    showSubWarning,
    brandOptions,
    modelOptions,
  } = useAddCarForm();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <SubscriptionWarning showSubWarning={showSubWarning} />

      <Container>
        <div className="px-4">
          <AddCarHeader
            isDealer={isDealer}
            isUploadingBulk={isUploadingBulk}
            handleBulkUpload={handleBulkUpload}
            fileInputRef={(el: HTMLInputElement | null) => {
              (fileInputRef as any).current = el;
            }}
          />

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Vehicle Images */}
            <FormSection title="Vehicle Images">
              <ImageUploader images={images} setImages={setImages} />
            </FormSection>

            {/* Basic Information */}
            <FormSection title="Basic Information">
              <BasicInfoSection
                formData={formData}
                handleInputChange={handleInputChange}
                brandOptions={brandOptions}
                modelOptions={modelOptions}
              />
            </FormSection>

            {/* About Car */}
            <FormSection title="About Car">
              <AboutCarSection
                formData={formData}
                handleInputChange={handleInputChange}
              />
            </FormSection>

            {/* Pricing */}
            <Pricing
              formData={formData}
              handleInputChange={handleInputChange}
            />

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

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Vehicle
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AddCarsPage;

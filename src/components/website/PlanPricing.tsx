"use client";

import { FaCheck } from "react-icons/fa";
import { useState } from "react";

interface PlanFeature {
  label: string;
  light: string | boolean | number;
  medium: string | boolean | number;
  large: string | boolean | number;
}

interface PlanData {
  features: PlanFeature[];
  titles: {
    light: string;
    medium: string;
    large: string;
  };
  pricing: {
    light: string;
    medium: string;
    large: string;
  };
}

const PlanPricing = () => {
  const [activeTab, setActiveTab] = useState<"private" | "dealer">("private");

  const privatePlanData: PlanData = {
    titles: {
      light: "PRIVATE LIGHT",
      medium: "PRIVATE MEDIUM",
      large: "PRIVATE LARGE",
    },
    pricing: {
      light: "14 days / 9.90 CHF",
      medium: "30 days / 19.90 CHF",
      large: "60 days / 29.90 CHF",
    },
    features: [
      {
        label: "Number of vehicles",
        light: "01",
        medium: "02",
        large: "03",
      },
      {
        label: "Duration of listing",
        light: "14 Days",
        medium: "14 Days",
        large: "14 Days",
      },
      {
        label: "Online immediately",
        light: true,
        medium: true,
        large: true,
      },
      {
        label: "Visible to everyone",
        light: true,
        medium: true,
        large: true,
      },
      {
        label: "Number of images",
        light: "10 per vehicle",
        medium: "10 per vehicle",
        large: "15 per vehicle",
      },
      {
        label: "Credit card / PayPal",
        light: true,
        medium: true,
        large: true,
      },
    ],
  };

  const dealerPlanData: PlanData = {
    titles: {
      light: "DEALER LIGHT",
      medium: "DEALER MEDIUM",
      large: "DEALER LARGE",
    },
    pricing: {
      light: "30 days / 29.90 CHF",
      medium: "60 days / 59.90 CHF",
      large: "90 days / 99.90 CHF",
    },
    features: [
      {
        label: "Number of vehicles",
        light: "10",
        medium: "25",
        large: "50+",
      },
      {
        label: "Duration of listing",
        light: "30 Days",
        medium: "60 Days",
        large: "90 Days",
      },
      {
        label: "Online immediately",
        light: true,
        medium: true,
        large: true,
      },
      {
        label: "Visible to everyone",
        light: true,
        medium: true,
        large: true,
      },
      {
        label: "Number of images",
        light: "15 per vehicle",
        medium: "20+ per vehicle",
        large: "20+ per vehicle",
      },
      {
        label: "Credit card / PayPal",
        light: true,
        medium: true,
        large: true,
      },
    ],
  };

  const activePlanData =
    activeTab === "private" ? privatePlanData : dealerPlanData;
  const features = activePlanData.features;

  const renderValue = (value: string | boolean | number) => {
    if (typeof value === "boolean") {
      return value ? (
        <FaCheck className="text-green-500 mx-auto" />
      ) : (
        <span className="text-gray-300">-</span>
      );
    }
    return value;
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-6 py-2 text-sm w-[180px] cursor-pointer font-medium border ${
              activeTab === "private"
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            } rounded-l-lg focus:z-10 focus:outline-none`}
            onClick={() => setActiveTab("private")}
          >
            Private Seller
          </button>
          <button
            type="button"
            className={`px-6 py-2 text-sm w-[180px] cursor-pointer font-medium border ${
              activeTab === "dealer"
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            } rounded-r-lg focus:z-10 focus:outline-none`}
            onClick={() => setActiveTab("dealer")}
          >
            Dealer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* First column - Feature labels */}
        <div className="hidden md:block border rounded-lg overflow-hidden shadow-sm">
          {/* Placeholder for the price row */}
          <div className="h-[60px]"></div>

          <div className="h-[60px] flex items-center px-5 border-t">Price</div>

          {features.map((feature, index) => (
            <div
              key={`feature-${index}`}
              className={`h-[60px] flex px-5 items-center ${
                index % 2 === 0 ? "bg-gray-100" : ""
              }`}
            >
              <span className="text-gray-700">{feature.label}</span>
            </div>
          ))}

          {/* Empty space for the Buy button */}
          <div className="h-[60px]"></div>
        </div>

        {/* Light Plan */}
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <div className="relative">
            <div className="bg-white p-4 text-center">
              <h3 className="text-primary font-bold text-xl mb-2">
                {activePlanData.titles.light}
              </h3>
            </div>
            <div className="bg-primary text-white p-3 text-center">
              <p className="font-medium">{activePlanData.pricing.light}</p>
            </div>
          </div>

          {/* Mobile feature labels + values */}
          <div className="md:hidden">
            {features.map((feature, index) => (
              <div
                key={`mobile-feature-${index}`}
                className={`p-3 flex justify-between items-center ${
                  index % 2 === 0 ? "bg-gray-100" : ""
                }`}
              >
                <span className="text-gray-700">{feature.label}</span>
                <span className="font-medium">
                  {renderValue(feature.light)}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop values only */}
          <div className="hidden md:block">
            {features.map((feature, index) => (
              <div
                key={`light-${index}`}
                className={`h-[60px] flex items-center justify-center ${
                  index % 2 === 0 ? "bg-gray-100" : ""
                }`}
              >
                <span className="font-medium">
                  {renderValue(feature.light)}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 text-center">
            <button className="bg-primary text-white py-2 px-8 rounded hover:bg-primary-dark transition duration-300">
              Buy
            </button>
          </div>
        </div>

        {/* Medium Plan */}
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <div className="relative">
            <div className="bg-white p-4 text-center">
              <h3 className="text-primary font-bold text-xl mb-2">
                {activePlanData.titles.medium}
              </h3>
            </div>
            <div className="bg-primary text-white p-3 text-center">
              <p className="font-medium">{activePlanData.pricing.medium}</p>
            </div>
          </div>

          {/* Mobile feature labels + values */}
          <div className="md:hidden">
            {features.map((feature, index) => (
              <div
                key={`mobile-feature-${index}`}
                className={`p-3 flex justify-between items-center ${
                  index % 2 === 0 ? "bg-gray-100" : ""
                }`}
              >
                <span className="text-gray-700">{feature.label}</span>
                <span className="font-medium">
                  {renderValue(feature.medium)}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop values only */}
          <div className="hidden md:block">
            {features.map((feature, index) => (
              <div
                key={`medium-${index}`}
                className={`h-[60px] flex items-center justify-center ${
                  index % 2 === 0 ? "bg-gray-100" : ""
                }`}
              >
                <span className="font-medium">
                  {renderValue(feature.medium)}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 text-center">
            <button className="bg-primary text-white py-2 px-8 rounded hover:bg-primary-dark transition duration-300">
              Buy
            </button>
          </div>
        </div>

        {/* Large Plan */}
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <div className="relative">
            <div className="bg-white p-4 text-center">
              <h3 className="text-primary font-bold text-xl mb-2">
                {activePlanData.titles.large}
              </h3>
            </div>
            <div className="bg-primary text-white p-3 text-center">
              <p className="font-medium">{activePlanData.pricing.large}</p>
            </div>
          </div>

          {/* Mobile feature labels + values */}
          <div className="md:hidden">
            {features.map((feature, index) => (
              <div
                key={`mobile-feature-${index}`}
                className={`p-3 flex justify-between items-center ${
                  index % 2 === 0 ? "bg-gray-100" : ""
                }`}
              >
                <span className="text-gray-700">{feature.label}</span>
                <span className="font-medium">
                  {renderValue(feature.large)}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop values only */}
          <div className="hidden md:block">
            {features.map((feature, index) => (
              <div
                key={`large-${index}`}
                className={`h-[60px] flex items-center justify-center ${
                  index % 2 === 0 ? "bg-gray-100" : ""
                }`}
              >
                <span className="font-medium">
                  {renderValue(feature.large)}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 text-center">
            <button className="bg-primary cursor-pointer text-white py-2 px-8 rounded hover:bg-primary-dark transition duration-300">
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanPricing;

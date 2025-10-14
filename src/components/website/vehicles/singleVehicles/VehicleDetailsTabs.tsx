"use client";

import { useState } from "react";
import Container from "@/components/ui/container";
import { CAR_DETAILS } from "./carData";

const VehicleDetailsTabs = () => {
  const [activeTab, setActiveTab] = useState<"basic" | "hours" | "reviews">(
    "basic"
  );

  return (
    <section className="py-4 min-h-[520px]">
      <Container>
        <div className="border-b flex gap-6 text-sm">
          <button
            className={
              "pb-3 cursor-pointer" +
              (activeTab === "basic"
                ? " border-b-2 border-primary text-primary"
                : " text-gray-600")
            }
            onClick={() => setActiveTab("basic")}
          >
            Vehicle Basic Info
          </button>
          <button
            className={
              "pb-3 cursor-pointer" +
              (activeTab === "hours"
                ? " border-b-2 border-primary text-primary"
                : " text-gray-600")
            }
            onClick={() => setActiveTab("hours")}
          >
            Opening Hours
          </button>
          <button
            className={
              "pb-3 cursor-pointer" +
              (activeTab === "reviews"
                ? " border-b-2 border-primary text-primary"
                : " text-gray-600")
            }
            onClick={() => setActiveTab("reviews")}
          >
            Sellers Review
          </button>
        </div>

        {/* Summary icons */}
        {activeTab === "basic" && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CAR_DETAILS.summary.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Basic & Technical Info */}
        {activeTab === "basic" && (
          <div className="mt-6">
            <h3 className="text-sm text-green-600 font-medium">
              Basic Information
            </h3>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {CAR_DETAILS.basicInformation.map((row, i) => (
                <div key={i} className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">{row.name}</span>
                  <span className="text-gray-800">{row.value}</span>
                </div>
              ))}
            </div>

            <h3 className="mt-6 text-sm text-green-600 font-medium">
              Technical Information
            </h3>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {CAR_DETAILS.technicalInformation.map((row, i) => (
                <div key={i} className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">{row.name}</span>
                  <span className="text-gray-800">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "hours" && (
          <div className="mt-6 text-sm text-gray-700">
            <p>Mon–Fri: 9:00–18:00</p>
            <p>Sat: 10:00–16:00</p>
            <p>Sun: Closed</p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="mt-6 text-sm text-gray-700">
            <p>No reviews yet.</p>
          </div>
        )}
      </Container>
    </section>
  );
};

export default VehicleDetailsTabs;

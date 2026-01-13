"use client";

import { useState, useEffect } from "react";
import Container from "@/components/ui/container";
import Image from "next/image";

const CarsGallery = ({ carDetails }: { carDetails: any }) => {
  const [activeImage, setActiveImage] = useState(carDetails?.images?.[0] || "");
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);

  useEffect(() => {
    if (carDetails?.images?.length) {
      setActiveImage(carDetails.images[0]);
    }
  }, [carDetails]);

  const handleTestDriveClick = () => {
    setIsTestDriveOpen(true);
  };

  const handleCloseTestDrive = () => {
    setIsTestDriveOpen(false);
  };

  if (!carDetails) return null;

  return (
    <section className="py-8">
      <Container>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-5/6">
              <div className="rounded-lg overflow-hidden border h-full">
                {activeImage && (
                  <Image
                    src={activeImage}
                    alt={carDetails.title || "Car Image"}
                    className="w-full h-[300px] sm:h-[400px] md:h-[600px] object-fit"
                    width={1000}
                    height={600}
                  />
                )}
              </div>
            </div>

            <div className="w-full md:w-1/6 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[600px] scrollbar-thin">
              {carDetails.images?.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={
                    "rounded-md overflow-hidden border shrink-0 w-16 h-16 md:w-full md:h-[80px] cursor-pointer" +
                    (activeImage === img ? "border-primary" : "")
                  }
                >
                  <Image
                    src={img}
                    alt={`thumb-${idx}`}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold">
                {carDetails.title}
              </h1>
              <p className="text-gray-600 mt-1">{carDetails.subtitle}</p>

              <div className="mt-3 flex items-end gap-3">
                <span className="text-2xl font-bold">
                  ${carDetails.price?.current?.toLocaleString() || 0}
                </span>
                {carDetails.price?.original > 0 && (
                  <span className="text-red-500 line-through">
                    ${carDetails.price?.original?.toLocaleString()}
                  </span>
                )}
                <span className="text-blue-600 text-sm">
                  {carDetails.price?.monthly}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CarsGallery;

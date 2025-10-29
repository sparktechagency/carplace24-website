"use client";

import { useState } from "react";
import Container from "@/components/ui/container";
import { Mail, Phone, Share2, Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { CAR_DETAILS } from "./carData";
import TestDriveModal from "./TestDriveModal";

const CarDetails = () => {
  const [activeImage, setActiveImage] = useState(CAR_DETAILS.images[0]);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);

  const handleTestDriveClick = () => {
    setIsTestDriveOpen(true);
  };

  const handleCloseTestDrive = () => {
    setIsTestDriveOpen(false);
  };

  return (
    <section className="py-8">
      <Container>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-5/6">
              <div className="rounded-lg overflow-hidden border h-full">
                <Image
                  src={activeImage}
                  alt={CAR_DETAILS.title}
                  className="w-full h-[300px] sm:h-[400px] md:h-[600px] object-cover"
                  width={34341000}
                  height={3434500}
                />
              </div>
            </div>

            {/* Thumbnails - scrollable list showing all images */}
            <div className="w-full md:w-1/6 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[600px] scrollbar-thin">
              {CAR_DETAILS.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={
                    "rounded-md overflow-hidden border flex-shrink-0 w-16 h-16 md:w-full md:h-[80px] cursor-pointer" +
                    (activeImage === img ? " border-primary" : "")
                  }
                >
                  <Image
                    src={img}
                    alt={`thumb-${idx}`}
                    className="w-full h-full object-cover"
                    width={56100}
                    height={66100}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details section (moved below) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column: Title and pricing */}
            <div>
              <h1 className="text-xl md:text-2xl font-semibold">
                {CAR_DETAILS.title}
              </h1>
              <p className="text-gray-600 mt-1">{CAR_DETAILS.subtitle}</p>

              <div className="mt-3 flex items-end gap-3">
                <span className="text-2xl font-bold">
                  ${CAR_DETAILS.price.current.toLocaleString()}
                </span>
                <span className="text-red-500 line-through">
                  ${CAR_DETAILS.price.original.toLocaleString()}
                </span>
                <span className="text-blue-600 text-sm">
                  {CAR_DETAILS.price.monthly}
                </span>
              </div>
            </div>

            {/* Right column: Dealer box */}
            <div>
              <div className="p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Image
                    src={CAR_DETAILS.dealer.logo}
                    alt="dealer"
                    className="h-10 w-10 rounded-full object-cover"
                    width={100}
                    height={100}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {CAR_DETAILS.dealer.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {CAR_DETAILS.dealer.type}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={
                          "h-4 w-4" +
                          (i < Math.round(CAR_DETAILS.dealer.rating)
                            ? " text-yellow-500"
                            : " text-gray-300")
                        }
                        fill={
                          i < Math.round(CAR_DETAILS.dealer.rating)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    ))}
                  </div>
                  <span>({CAR_DETAILS.dealer.reviews})</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex mt-2 items-center gap-1">
                    <MapPin className="h-4 w-4" /> {CAR_DETAILS.dealer.address}
                  </div>
                  <a
                    href="#"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Share2 className="h-4 w-4" /> Share Link
                  </a>
                </div>
                {/* Actions */}
                <div className="mt-3 flex flex-col gap-2">
                  <button className="h-10 rounded-md bg-green-600 hover:bg-green-600/90 text-white flex items-center justify-center gap-2 cursor-pointer">
                    <Mail className="h-4 w-4" /> Send Mail
                  </button>
                  <button className="h-10 rounded-md border border-green-600 text-green-700 flex items-center justify-center gap-2 cursor-pointer">
                    <Phone className="h-4 w-4" /> Contact
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <button className="px-3 h-9 rounded-md border text-sm cursor-pointer">
                    Compare
                  </button>
                  <button
                    className="px-3 h-9 rounded-md border text-sm cursor-pointer"
                    onClick={handleTestDriveClick}
                  >
                    Test Drive
                  </button>
                  <button className="px-3 h-9 rounded-md border text-sm flex items-center gap-2 cursor-pointer">
                    <Heart className="h-4 w-4" /> Favorite
                  </button>
                </div>
                <TestDriveModal
                  isOpen={isTestDriveOpen}
                  onClose={handleCloseTestDrive}
                  carName={CAR_DETAILS.title}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CarDetails;

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Image gallery */}
          <div>
            <div className="rounded-lg overflow-hidden border">
              <Image
                src={activeImage}
                alt={CAR_DETAILS.title}
                className="w-full h-[300px] sm:h-[360px] object-cover"
                width={500}
                height={300}
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {CAR_DETAILS.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={
                    "rounded-md overflow-hidden border h-16 cursor-pointer" +
                    (activeImage === img ? " border-primary" : "")
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

          {/* Right: Title, pricing, dealer and actions */}
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

            {/* Dealer box */}
            <div className="mt-4 p-3 border w-[80%] rounded-lg">
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
                <Share2 className="h-4 w-4 ml-2" />
                <a href="#" className="text-blue-600 flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {CAR_DETAILS.dealer.address}
                </a>
              </div>

              {/* Actions */}
              <div className="mt-3 flex flex-col gap-2">
                <button className="h-10 rounded-md bg-green-600 text-white flex items-center justify-center gap-2 cursor-pointer">
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
      </Container>
    </section>
  );
};

export default CarDetails;

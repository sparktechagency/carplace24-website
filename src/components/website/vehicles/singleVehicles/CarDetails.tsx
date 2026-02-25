"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import { Mail, Phone, Share2, Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { CAR_DETAILS } from "./carData";
import TestDriveModal from "./TestDriveModal";
import CarImageGallery from "./CarImageGallery";
import {
  addToCompare,
  isInCompare,
  toggleFavorite,
  isInFavorites,
  VEHICLE_STORAGE_EVENT,
} from "@/lib/vehicleStorage";
import toast from "react-hot-toast";

type Details = any;

const CarDetails = ({
  details = CAR_DETAILS,
  rawCar,
}: {
  details?: Details;
  rawCar?: any;
}) => {
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const carId = String(details?.id || "");

  const [isCompared, setIsCompared] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const checkStorage = () => {
      if (carId) {
        setIsCompared(isInCompare(carId));
        setIsBookmarked(isInFavorites(carId));
      }
    };

    checkStorage();

    window.addEventListener(VEHICLE_STORAGE_EVENT, checkStorage);
    window.addEventListener("storage", checkStorage);
    window.addEventListener("focus", checkStorage);

    return () => {
      window.removeEventListener(VEHICLE_STORAGE_EVENT, checkStorage);
      window.removeEventListener("storage", checkStorage);
      window.removeEventListener("focus", checkStorage);
    };
  }, [carId]);

  const handleTestDriveClick = () => {
    setIsTestDriveOpen(true);
  };

  const handleCloseTestDrive = () => {
    setIsTestDriveOpen(false);
  };

  const handleCompare = () => {
    const res = addToCompare(rawCar || details);
    if (res.success) {
      toast.success(res.message);
      setIsCompared(true);
    } else {
      toast.error(res.message);
    }
  };

  const handleBookmark = () => {
    const res = toggleFavorite(rawCar || details);
    setIsBookmarked(res.isAdded);
    toast.success(res.message);
  };

  return (
    <section className="py-8">
      <Container>
        <div className="flex flex-col gap-6">
          <CarImageGallery images={details.images} title={details.title} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold">
                {details.title}
              </h1>
              <p className="text-gray-600 mt-1">{details.subtitle}</p>

              <div className="mt-3 flex items-end gap-3">
                <span className="text-2xl font-bold">
                  CHF{" "}
                  {details.price.current?.toLocaleString?.() ||
                    details.price.current}
                </span>
                <span className="text-red-500 line-through">
                  CHF{" "}
                  {details.price.original?.toLocaleString?.() ||
                    details.price.original}
                </span>
                <span className="text-blue-600 text-sm">
                  {details.price.monthly}
                </span>
              </div>
              <div>
                <h3 className="mt-6 text-sm text-green-600 font-medium">
                  Description
                </h3>
                <p className="mt-3">{details.aboutCar}</p>
              </div>
            </div>

            <div>
              <div className="p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Image
                    src={details.dealer.logo}
                    alt="dealer"
                    className="h-10 w-10 rounded-full object-cover"
                    width={100}
                    height={100}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{details.dealer.name}</p>
                    <p className="text-xs text-gray-500">
                      {details.dealer.type}
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
                          (i < Math.round(details.dealer.rating)
                            ? " text-yellow-500"
                            : " text-gray-300")
                        }
                        fill={
                          i < Math.round(details.dealer.rating)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    ))}
                  </div>
                  <span>({details.dealer.reviews})</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex mt-2 items-center gap-1">
                    <MapPin className="h-4 w-4" /> {details.dealer.address}
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
                <div className="mt-2 flex items-center gap-2 w-full">
                  <button
                    className={`px-3 h-9 w-1/3 rounded-md border text-sm cursor-pointer ${
                      isCompared ? "bg-blue-600 text-white border-blue-600" : ""
                    }`}
                    onClick={handleCompare}
                    disabled={isCompared}
                  >
                    {isCompared ? "Added to Compare" : "Compare"}
                  </button>
                  <button
                    className="px-3 h-9 w-1/3 rounded-md border text-sm cursor-pointer"
                    onClick={handleTestDriveClick}
                  >
                    Test Drive
                  </button>
                  <button
                    className={`px-3 h-9 w-1/3 rounded-md border text-sm text-center flex items-center gap-2 cursor-pointer ${
                      isBookmarked ? "bg-red-600 text-white border-red-600" : ""
                    }`}
                    onClick={handleBookmark}
                  >
                    <Heart className="h-4 w-4" />
                    {isBookmarked ? "Favorited" : "Favorite"}
                  </button>
                </div>
                <TestDriveModal
                  isOpen={isTestDriveOpen}
                  onClose={handleCloseTestDrive}
                  carName={details.title}
                  carId={carId}
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

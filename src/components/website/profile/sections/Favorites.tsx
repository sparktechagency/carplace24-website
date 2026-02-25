"use client";

import { getFavoriteCars, toggleFavorite } from "@/lib/vehicleStorage";
import { getImageUrl } from "@/lib/getImageUrl";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

const Favorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = () => {
    const data = getFavoriteCars();
    setFavorites(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const favoriteCount = favorites.length;

  const removeFavorite = (car: any) => {
    const res = toggleFavorite(car);
    toast.success("Removed from favorites");
    loadFavorites();
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Favorites</h2>
        <p className="text-gray-600">Your saved vehicles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteCount === 0 && (
          <div className="col-span-full text-center text-gray-600 py-12">
            No favorite cars yet
          </div>
        )}
        {favorites.map((car: any) => (
          <div
            key={car._id || car.id}
            className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              <Image
                src={getImageUrl(car?.basicInformation?.productImage?.[0])}
                alt={car?.basicInformation?.vehicleName}
                fill
                className="object-cover"
              />
              <button
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-600"
                aria-label="Remove from favorites"
                onClick={() => removeFavorite(car)}
              >
                <FaHeart />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                {car?.basicInformation?.vehicleName}
              </h3>
              <p className="font-semibold text-blue-600 mb-2">
                CHF{" "}
                {car?.basicInformation?.OfferPrice?.toLocaleString?.() ||
                  car?.basicInformation?.OfferPrice ||
                  ""}
              </p>
              <p className="text-gray-600 text-sm mb-4"></p>
              <Link
                href={`/vehicles/${car?._id || car?.id}`}
                className="block w-full text-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;

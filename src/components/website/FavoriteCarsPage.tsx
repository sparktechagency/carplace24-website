"use client";

import { useState } from "react";
import Container from "../ui/container";
import { Button } from "../ui/button";
import { FaHeart, FaSearch, FaTrash, FaEye } from "react-icons/fa";
import Image from "next/image";
import {
  useGetBookmarkCarsQuery,
  useToggleBookmarkCarMutation,
} from "@/redux/apiSlice/compareSlice";
import CarLoader from "../ui/loader/CarLoader";
import { getImageUrl } from "@/lib/getImageUrl";
import toast from "react-hot-toast";
import Link from "next/link";

const FavoriteCarsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: getFavoriteCars,
    isLoading,
    refetch,
  } = useGetBookmarkCarsQuery({});
  const [toggleBookmark, { isLoading: toggling }] =
    useToggleBookmarkCarMutation();

  if (isLoading) {
    return <CarLoader />;
  }

  const favoriteCars = getFavoriteCars?.data || [];
  console.log(favoriteCars);

  const favoriteCount = Array.isArray(favoriteCars) ? favoriteCars.length : 0;

  // Filter cars based on search term
  const filteredCars = favoriteCars?.filter(
    (car: any) =>
      car?.car?.basicInformation?.vehicleName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      car?.car?.basicInformation?.brand?.brand
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      car?.car?.basicInformation?.model?.model
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Remove car from favorites
  const removeFavorite = async (favItem: any) => {
    const carId = favItem?.car?._id || favItem?.carId || favItem?.id;
    if (!carId) {
      toast.error("Missing car id");
      return;
    }
    try {
      const res = await toggleBookmark({ car: carId }).unwrap();
      if (res?.success) {
        toast.success("Removed from favorites");
        refetch();
      } else {
        toast.error(res?.message || "Failed to remove");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to remove");
    }
  };

  return (
    <div className="py-8 min-h-screen">
      <Container>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <FaHeart className="text-red-500" /> My Favorite Cars
              </h1>
              <p className="text-gray-500 mt-1">
                {favoriteCount} {favoriteCount === 1 ? "car" : "cars"} saved to
                your favorites
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search favorites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* No favorites message */}
          {favoriteCount === 0 && (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <FaHeart className="mx-auto text-gray-300 text-5xl mb-4" />
              <h3 className="text-xl font-medium text-gray-700">
                No favorite cars yet
              </h3>
              <p className="text-gray-500 mt-2">
                Browse cars and click the heart icon to add them to your
                favorites
              </p>
              <Button className="mt-4">Browse Cars</Button>
            </div>
          )}

          {/* Favorites grid */}
          {favoriteCount > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars?.map((car: any) => (
                <div
                  key={car._id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  {/* Car image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      width={500}
                      height={300}
                      src={getImageUrl(
                        car?.car?.basicInformation?.productImage?.[0]
                      )}
                      alt={car?.car?.basicInformation?.vehicleName}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeFavorite(car)}
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                      title="Remove from favorites"
                      disabled={toggling}
                    >
                      <FaTrash className="text-red-500" />
                    </button>
                  </div>

                  {/* Car details */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg">
                      {car?.car?.basicInformation?.vehicleName}
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-semibold text-lg">
                        $
                        {car?.car?.basicInformation?.OfferPrice?.toLocaleString()}
                      </span>
                      <span className="text-gray-500">
                        {/* {car?.car?.basicInformation?.location} */}
                      </span>
                    </div>

                    {/* Car specs */}
                    <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
                      <div>Year: {car?.car?.basicInformation?.year}</div>
                      <div>
                        Horspower:{" "}
                        {car?.car?.technicalInformation?.engineDisplacement}
                      </div>
                      <div>Fuel: {car.car?.technicalInformation?.fuelType}</div>
                      <div>
                        Transmission:{" "}
                        {car?.car?.technicalInformation?.transmission}
                      </div>
                    </div>

                    {/* Features */}
                    {/* <div className="mt-3 flex flex-wrap gap-1">
                      {car?.features
                        ?.slice(0, 3)
                        ?.map((feature: string, index: number) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      {car.features.length > 3 && (
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                          +{car.features.length - 3} more
                        </span>
                      )}
                    </div> */}

                    {/* Action button */}
                    <Link href={`/vehicles/${car?.car?._id}`}>
                      <Button
                        className="w-full mt-4 flex items-center cursor-pointer justify-center gap-2"
                        variant="outline"
                      >
                        <FaEye /> View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No search results */}
          {favoriteCount > 0 && filteredCars.length === 0 && (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <FaSearch className="mx-auto text-gray-300 text-5xl mb-4" />
              <h3 className="text-xl font-medium text-gray-700">
                No matching cars found
              </h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your search term
              </p>
              <Button className="mt-4" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default FavoriteCarsPage;

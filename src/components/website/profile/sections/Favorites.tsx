"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import {
  useGetBookmarkCarsQuery,
  useToggleBookmarkCarMutation,
} from "@/redux/apiSlice/compareSlice";
import { getImageUrl } from "@/lib/getImageUrl";
import toast from "react-hot-toast";
import CarLoader from "@/components/ui/loader/CarLoader";

const Favorites = () => {
  const {
    data: bookmarkData,
    isLoading,
    refetch,
  } = useGetBookmarkCarsQuery(undefined);
  const [toggleBookmark, { isLoading: toggling }] =
    useToggleBookmarkCarMutation();

  if (isLoading) {
    return <CarLoader />;
  }

  const favorites =
    (bookmarkData as any)?.data?.data ||
    (bookmarkData as any)?.data ||
    (bookmarkData as any)?.items ||
    (bookmarkData as any)?.bookmarks ||
    (bookmarkData as any)?.results ||
    [];

  const favoriteCount = Array.isArray(favorites) ? favorites.length : 0;

  const removeFavorite = async (item: any) => {
    const carId = item?.car?._id || item?.carId || item?.id;
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
            key={car._id}
            className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              <Image
                src={getImageUrl(car?.car?.basicInformation?.productImage?.[0])}
                alt={car?.car?.basicInformation?.vehicleName}
                fill
                className="object-cover"
              />
              <button
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-600"
                aria-label="Remove from favorites"
                onClick={() => removeFavorite(car)}
                disabled={toggling}
              >
                <FaHeart />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                {car?.car?.basicInformation?.vehicleName}
              </h3>
              <p className="font-semibold text-blue-600 mb-2">
                $
                {car?.car?.basicInformation?.OfferPrice?.toLocaleString?.() ||
                  car?.car?.basicInformation?.OfferPrice ||
                  ""}
              </p>
              <p className="text-gray-600 text-sm mb-4"></p>
              <Link
                href={`/vehicles/${car?.car?._id || car?.carId || car?.id}`}
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

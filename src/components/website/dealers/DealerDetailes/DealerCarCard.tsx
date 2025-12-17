import { getImageUrl } from "@/lib/getImageUrl";
import Link from "next/link";
import { Car } from "./types";

interface Props {
  car: Car;
}

const DealerCarCard = ({ car }: Props) => {
  const { basicInformation, technicalInformation } = car;

  // Get the first product image
  const getCarImage = () => {
    const images = basicInformation.productImage;
    if (!images || images.length === 0) return "/images/car-placeholder.png";
    return getImageUrl(images[0]);
  };

  return (
    <Link href={`/vehicles/${car._id}`} className="h-full">
      <div className="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group h-full flex flex-col">
        {/* Car Image */}
        <div className="relative overflow-hidden flex-shrink-0">
          <img
            src={getCarImage()}
            alt={basicInformation.vehicleName}
            className="w-full h-[180px] object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 rounded bg-primary text-white text-xs font-medium">
              {basicInformation.condition}
            </span>
          </div>
          {car.status === "ACTIVE" && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 rounded bg-green-500 text-white text-xs font-medium">
                Active
              </span>
            </div>
          )}
        </div>

        {/* Car Details */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">
            {basicInformation.vehicleName}
          </h3>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>{basicInformation.year}</span>
            <span>•</span>
            <span>{basicInformation.miles?.toLocaleString()} miles</span>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3 min-h-[28px]">
            {technicalInformation.fuelType && (
              <span className="px-2 py-1 bg-gray-100 rounded">
                {technicalInformation.fuelType}
              </span>
            )}
            {technicalInformation.transmission && (
              <span className="px-2 py-1 bg-gray-100 rounded">
                {technicalInformation.transmission}
              </span>
            )}
            {basicInformation.BodyType && (
              <span className="px-2 py-1 bg-gray-100 rounded">
                {basicInformation.BodyType}
              </span>
            )}
          </div>

          {/* Price - pushed to bottom */}
          <div className="flex items-center gap-2 mt-auto">
            <span className="font-bold text-lg text-primary">
              ${basicInformation.OfferPrice?.toLocaleString()}
            </span>
            {basicInformation.RegularPrice > basicInformation.OfferPrice && (
              <span className="text-gray-400 line-through text-sm">
                ${basicInformation.RegularPrice?.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DealerCarCard;

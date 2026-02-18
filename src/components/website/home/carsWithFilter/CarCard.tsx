import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/getImageUrl";

interface CarCardProps {
  image: string;
  dealerLogo: string;
  dealerName: string;
  dealerType: string;
  carName: string;
  carCategory: string;
  originalPrice: number;
  discountedPrice: number;
  isFavorite?: boolean;
}

const CarCard = ({
  image,
  dealerLogo,
  dealerName,
  dealerType,
  carName,
  carCategory,
  originalPrice,
  discountedPrice,
  isFavorite = false,
}: CarCardProps) => {
  return (
    <div className="rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="relative shrink-0">
        <img
          src={getImageUrl(image)}
          alt={carName}
          width={300}
          height={200}
          className="w-full h-[180px] p-2 rounded-t-xl object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/80 rounded-full hover:bg-white"
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "fill-primary text-primary" : "text-gray-500"
            }`}
          />
        </Button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={getImageUrl(dealerLogo)}
            alt={dealerName}
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <div>
            <p className="text-sm text-gray-600">{dealerName}</p>
            <p className="text-xs text-gray-500">{dealerType}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-medium text-lg leading-tight line-clamp-2 h-11 mb-1">
            {carName}
          </h3>
          <p className="text-sm text-gray-500">{carCategory || "-"}</p>
        </div>

        <div className="mt-auto flex items-center gap-2">
          <span className="font-semibold text-lg text-primary">
            ${(originalPrice ?? 0).toLocaleString()}
          </span>
          {discountedPrice > 0 && (
            <span className="text-red-500 line-through text-sm">
              ${(discountedPrice ?? 0).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCard;

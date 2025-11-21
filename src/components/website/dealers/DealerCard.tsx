import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { Dealer } from "./dealersData";

type Props = { dealer: Dealer };

const DealerCard = ({ dealer }: Props) => {
  const ratingStars = Array.from(
    { length: 5 },
    (_, i) => i < Math.round(dealer.rating)
  );

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="p-4 flex items-center gap-3">
        <Image
          src={dealer.logo}
          alt={dealer.name}
          width={56}
          height={56}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-800">{dealer.name}</h3>
            <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
              {dealer.type}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            {ratingStars.map((on, i) => (
              <Star
                key={i}
                className={
                  on ? "h-4 w-4 text-yellow-500" : "h-4 w-4 text-gray-300"
                }
                fill={on ? "currentColor" : "none"}
              />
            ))}
            <span className="text-xs text-gray-500">({dealer.reviews})</span>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-600 gap-1">
            <MapPin className="h-4 w-4" />
            <span>{dealer.location}</span>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="flex gap-2">
          <button className="flex-1 h-9 rounded-md border bg-primary text-white hover:bg-primary/90 cursor-pointer">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealerCard;

import Image from "next/image";
import { MapPin, CheckCircle, Mail, Phone } from "lucide-react";
import { Dealer } from "./dealersData";
import Link from "next/link";
import { getImageUrl } from "@/lib/getImageUrl";

type Props = { dealer: Dealer };

const DealerCard = ({ dealer }: Props) => {
  // Build location string from available fields
  const getLocation = () => {
    const parts = [];
    if (dealer.city) parts.push(dealer.city);
    if (dealer.country) parts.push(dealer.country);
    return parts.length > 0 ? parts.join(", ") : "Location not specified";
  };

  // Get dealer type label
  const getDealerType = () => {
    if (dealer.verified && dealer.isSubscribed) return "Verified";
    if (dealer.isSubscribed) return "Subscribed";
    return "Dealer";
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 flex items-center gap-3">
        <Image
          src={getImageUrl(dealer.profile)}
          alt={dealer.name}
          width={56}
          height={56}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <h3 className="font-medium text-gray-800">{dealer.name}</h3>
              {dealer.verified && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </div>
            <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
              {getDealerType()}
            </span>
          </div>

          {dealer.email && (
            <div className="mt-1 flex items-center text-sm text-gray-500 gap-1">
              <Mail className="h-3 w-3" />
              <span className="truncate">{dealer.email}</span>
            </div>
          )}

          {dealer.mobileNumber && (
            <div className="mt-1 flex items-center text-sm text-gray-500 gap-1">
              <Phone className="h-3 w-3" />
              <span>{dealer.mobileNumber}</span>
            </div>
          )}

          <div className="mt-2 flex items-center text-sm text-gray-600 gap-1">
            <MapPin className="h-4 w-4" />
            <span>{getLocation()}</span>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="flex gap-2">
          <Link
            href={`/dealers/${dealer._id}`}
            className="flex-1 h-9 rounded-md border bg-primary text-white hover:bg-primary/90 cursor-pointer flex items-center justify-center"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DealerCard;

import { getImageUrl } from "@/lib/getImageUrl";
import { MapPin, Mail, Phone, CheckCircle, Building } from "lucide-react";
import Image from "next/image";
import { DealerProfile } from "./types";

interface Props {
  dealer: DealerProfile;
}

const DealerProfileCard = ({ dealer }: Props) => {
  // Build location string
  const getLocation = () => {
    const parts = [];
    if (dealer.address) parts.push(dealer.address);
    if (dealer.city) parts.push(dealer.city);
    if (dealer.country) parts.push(dealer.country);
    return parts.length > 0 ? parts.join(", ") : null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Image */}
        <div className="shrink-0">
          <Image
            src={getImageUrl(dealer.profile)}
            alt={dealer.name}
            width={150}
            height={150}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary/20"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {dealer.name}
            </h1>
            {dealer.isSubscribed && (
              <CheckCircle className="h-6 w-6 text-green-500" />
            )}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {dealer.role === "DELEAR" ? "Dealer" : dealer.role}
            </span>
            {dealer.isSubscribed && (
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                Subscribed
              </span>
            )}
          </div>

          {dealer.about && <p className="text-gray-600 mb-4">{dealer.about}</p>}

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dealer.email && (
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4 text-primary" />
                <span>{dealer.email}</span>
              </div>
            )}

            {dealer.mobileNumber && (
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4 text-primary" />
                <span>{dealer.mobileNumber}</span>
              </div>
            )}

            {getLocation() && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{getLocation()}</span>
              </div>
            )}

            {dealer.zipCode && (
              <div className="flex items-center gap-2 text-gray-600">
                <Building className="h-4 w-4 text-primary" />
                <span>ZIP: {dealer.zipCode}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerProfileCard;

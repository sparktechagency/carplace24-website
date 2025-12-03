import Container from "@/components/ui/container";
import CarCard from "./CarCard";
import Link from "next/link";
import { getImageUrl } from "@/lib/getImageUrl";

// Sample data for the cars
const CARS_DATA = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
    dealerName: "Shakil Pepe",
    dealerType: "Private Seller",
    dealerLogo:
      "https://i.ibb.co.com/S76dkw9p/Screenshot-2025-10-09-111337.png",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    dealerName: "Shakil Pepe",
    dealerType: "Private Seller",
    dealerLogo: "https://i.ibb.co.com/hF8qFB5L/Rectangle-5330.png",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
    dealerName: "Shakil Pepe",
    dealerType: "Private Seller",
    dealerLogo: "https://i.ibb.co.com/hS0WqTw/profilepicturev2.jpg",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
    dealerName: "Shakil Pepe",
    dealerType: "Finest Seller",
    dealerLogo: "https://i.ibb.co.com/Xk4RMbMy/Untitled-design-2.png",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
  },
];

const YouMayLike = ({
  carsData,
  isLoading,
}: {
  carsData: any[];
  isLoading: boolean;
}) => {
  return (
    <div className="py-8 md:px-4 bg-gray-50 pb-20 pt-10">
      <Container>
        <h2 className="text-3xl font-semibold mb-8">You may like</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {!isLoading &&
            carsData.map((car) => (
              <Link key={car._id} href={`/vehicles/${car._id}`}>
                <CarCard
                  key={car._id}
                  image={getImageUrl(
                    car.basicInformation?.productImage?.[0] || ""
                  )}
                  dealerLogo={car.createdBy?.profile}
                  dealerName={car.createdBy?.name}
                  dealerType={car.dealerType ?? ""}
                  carName={car.basicInformation?.vehicleName}
                  carCategory={car.basicInformation?.BodyType}
                  originalPrice={car.basicInformation?.RegularPrice}
                  discountedPrice={car.basicInformation?.OfferPrice}
                />
              </Link>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default YouMayLike;

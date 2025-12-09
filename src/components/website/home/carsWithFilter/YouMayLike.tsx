import Container from "@/components/ui/container";
import CarCard from "./CarCard";
import Link from "next/link";
import { getImageUrl } from "@/lib/getImageUrl";


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

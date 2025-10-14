import CarDetails from "@/components/website/vehicles/singleVehicles/CarDetails";
import VehicleDetailsTabs from "@/components/website/vehicles/singleVehicles/VehicleDetailsTabs";
import SellerMapSection from "@/components/website/vehicles/singleVehicles/SellerMapSection";
import RelatedCars from "@/components/website/vehicles/singleVehicles/RelatedCars";

export default function Page() {
  return (
    <main>
      <CarDetails />
      <VehicleDetailsTabs />
      <SellerMapSection />
      <RelatedCars />
    </main>
  );
}
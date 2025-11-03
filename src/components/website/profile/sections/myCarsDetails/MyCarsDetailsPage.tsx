import VehicleDetailsTabs from "@/components/website/vehicles/singleVehicles/VehicleDetailsTabs";
import CarsGallery from "./CarsGallery";

const MyCarsDetailsPage = ({ id }: { id: string }) => {
  console.log(id);
  return (
    <div>
      <CarsGallery />
      <VehicleDetailsTabs />
    </div>
  );
};

export default MyCarsDetailsPage;

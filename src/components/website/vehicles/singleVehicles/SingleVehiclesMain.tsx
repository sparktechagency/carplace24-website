import CarDetails from "./CarDetails";
import VehicleDetailsTabs from "./VehicleDetailsTabs";

const SingleVehiclesMain = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <CarDetails />
      <VehicleDetailsTabs />
    </div>
  );
};

export default SingleVehiclesMain;

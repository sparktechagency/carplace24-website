import CarDetails from "./CarDetails";
import RelatedCars from "./RelatedCars";
import SellerMapSection from "./SellerMapSection";
import VehicleDetailsTabs from "./VehicleDetailsTabs";

const SingleVehiclesMain = ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  return (
    <div>
      <CarDetails />
      <VehicleDetailsTabs />
      <SellerMapSection />
      <RelatedCars />
    </div>
  );
};

export default SingleVehiclesMain;

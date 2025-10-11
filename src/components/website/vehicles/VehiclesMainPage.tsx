import FindNearestDealers from "@/components/shared/FindNearestDealers";
import FilteredCarList from "./FilteredCarList";
import FilterVehicles from "./FilterVehicles";

const VehiclesMainPage = () => {
  return (
    <div className="min-h-screen">
      <FilterVehicles />
      <FilteredCarList />
      <FindNearestDealers />
    </div>
  );
};

export default VehiclesMainPage;

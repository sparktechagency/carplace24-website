import FilterSection from "./FilterSection";
import PopularCars from "./PopularCars";
import YouMayLike from "./YouMayLike";

const CarsWithFilter = () => {
  return (
    <div className="relative clear-start">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-4">
        <FilterSection />
      </div>

      <PopularCars />
      <YouMayLike />
    </div>
  );
};

export default CarsWithFilter;

import FilterSection from "./FilterSection";
import PopularCars from "./PopularCars";
import YouMayLike from "./YouMayLike";

const CarsWithFilter = () => {
  return (
    <div className="relative clear-start">
      <div className="md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10 px-4">
        <FilterSection />
      </div>

      <PopularCars />
      <YouMayLike />
    </div>
  );
};

export default CarsWithFilter;

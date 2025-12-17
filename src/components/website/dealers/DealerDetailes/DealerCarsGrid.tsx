import { Car } from "./types";
import DealerCarCard from "./DealerCarCard";

interface Props {
  cars: Car[];
}

const DealerCarsGrid = ({ cars }: Props) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Vehicles from this Dealer
        </h2>
        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
          {cars?.length || 0} vehicles
        </span>
      </div>

      {cars && cars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map((car) => (
            <DealerCarCard key={car._id} car={car} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-10 text-center text-gray-500">
          <p>No vehicles listed by this dealer yet.</p>
        </div>
      )}
    </div>
  );
};

export default DealerCarsGrid;

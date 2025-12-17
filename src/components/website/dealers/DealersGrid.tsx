import DealerCard from "./DealerCard";
import { Dealer } from "./dealersData";

type Props = {
  dealers: Dealer[];
};

const DealersGrid = ({ dealers }: Props) => {
  if (!dealers || dealers.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No dealers found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dealers.map((d) => (
        <DealerCard key={d._id} dealer={d} />
      ))}
    </div>
  );
};

export default DealersGrid;

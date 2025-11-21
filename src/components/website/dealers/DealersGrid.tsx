import DealerCard from "./DealerCard";
import { Dealer } from "./dealersData";

type Props = {
  dealers: Dealer[];
};

const DealersGrid = ({ dealers }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dealers.map((d) => (
        <DealerCard key={d.id} dealer={d} />
      ))}
    </div>
  );
};

export default DealersGrid;
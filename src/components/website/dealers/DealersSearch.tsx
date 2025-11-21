import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

const DealersSearch = ({ value, onChange }: Props) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search dealers"
        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DealersSearch;

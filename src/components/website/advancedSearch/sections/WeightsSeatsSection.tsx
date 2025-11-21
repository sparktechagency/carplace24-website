type Props = {
  values: { curbKg: number; totalKg: number; seats: string };
  onNumberChange: (field: "curbKg" | "totalKg", value: number) => void;
  onSelectChange: (field: "seats", value: string) => void;
  options: { seatsOptions: any[] };
};

import SelectDropdown from "@/components/ui/SelectDropdown";

const WeightsSeatsSection = ({ values, onNumberChange, onSelectChange, options }: Props) => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <div className="text-sm font-medium text-gray-700 mb-2">Curb weight</div>
        <div className="relative">
          <input type="number" className="w-full pr-10 px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={values.curbKg} onChange={(e) => onNumberChange("curbKg", Number(e.target.value || 0))} name="curbKg" />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">kg</span>
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-700 mb-2">Total weight</div>
        <div className="relative">
          <input type="number" className="w-full pr-10 px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={values.totalKg} onChange={(e) => onNumberChange("totalKg", Number(e.target.value || 0))} name="totalKg" />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">kg</span>
        </div>
      </div>
      <SelectDropdown id="seats" options={options.seatsOptions} label="Number of seats" value={values.seats} onChange={(e) => onSelectChange("seats", e.target.value)} />
    </div>
  );
};

export default WeightsSeatsSection;
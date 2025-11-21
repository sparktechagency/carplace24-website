import SelectDropdown from "@/components/ui/SelectDropdown";

type Props = {
  values: { doors: string; fuelConsumption: string; coKg: number };
  onNumberChange: (field: "coKg", value: number) => void;
  onSelectChange: (field: "doors" | "fuelConsumption", value: string) => void;
  options: { doorsOptions: any[]; fuelConsumptionOptions: any[] };
};

const DoorsFuelCOSection = ({ values, onNumberChange, onSelectChange, options }: Props) => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <SelectDropdown id="doors" options={options.doorsOptions} label="Number of doors" value={values.doors} onChange={(e) => onSelectChange("doors", e.target.value)} />
      <SelectDropdown id="fuelConsumption" options={options.fuelConsumptionOptions} label="Fuel consumption" value={values.fuelConsumption} onChange={(e) => onSelectChange("fuelConsumption", e.target.value)} />
      <div>
        <div className="text-sm font-medium text-gray-700 mb-2">CO Emissions</div>
        <div className="relative">
          <input type="number" className="w-full pr-10 px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={values.coKg} onChange={(e) => onNumberChange("coKg", Number(e.target.value || 0))} name="coKg" />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">kg</span>
        </div>
      </div>
    </div>
  );
};

export default DoorsFuelCOSection;
import SelectDropdown from "@/components/ui/SelectDropdown";

type Props = {
  values: { rangeKm: number; battery: string; interiorColor: string };
  onNumberChange: (field: "rangeKm", value: number) => void;
  onSelectChange: (field: "battery" | "interiorColor", value: string) => void;
  options: { batteryOptions: any[]; interiorColors: any[] };
};

const EVInteriorSection = ({ values, onNumberChange, onSelectChange, options }: Props) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <div className="text-sm font-medium text-gray-700 mb-2">Range</div>
        <div className="relative">
          <input type="number" className="w-full pr-10 px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={values.rangeKm} onChange={(e) => onNumberChange("rangeKm", Number(e.target.value || 0))} name="rangeKm" />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">km</span>
        </div>
      </div>
      <SelectDropdown id="battery" options={options.batteryOptions} label="Battery capacity" value={values.battery} onChange={(e) => onSelectChange("battery", e.target.value)} />
      <SelectDropdown id="interiorColor" options={options.interiorColors} label="Interior Color" value={values.interiorColor} onChange={(e) => onSelectChange("interiorColor", e.target.value)} />
    </div>
  );
};

export default EVInteriorSection;
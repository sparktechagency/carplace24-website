import SelectDropdown from "@/components/ui/SelectDropdown";
import RangeSlider from "../components/RangeSlider";

type Props = {
  values: { country: string; city: string; zipCode: string; radius: { min: number; max: number } };
  onSelectChange: (field: "country" | "city" | "zipCode", value: string) => void;
  onRadiusChange: (value: { min: number; max: number }) => void;
  options: { countries: any[]; cities: any[]; zipCodes: any[] };
};

const LocationRadiusSection = ({ values, onSelectChange, onRadiusChange, options }: Props) => {
  return (
    <>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectDropdown id="country" options={options.countries} label="Country" value={values.country} onChange={(e) => onSelectChange("country", e.target.value)} />
        <SelectDropdown id="city" options={options.cities} label="City" value={values.city} onChange={(e) => onSelectChange("city", e.target.value)} />
        <SelectDropdown id="zipCode" options={options.zipCodes} label="ZIP code" value={values.zipCode} onChange={(e) => onSelectChange("zipCode", e.target.value)} />
      </div>
      <div className="mt-6">
        <div className="text-sm font-medium text-gray-700 mb-2">Radius</div>
        <div className="flex items-center gap-10 w-full">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative w-40">
              <input type="number" className="w-full pr-10 px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={values.radius.min} onChange={(e) => onRadiusChange({ min: Math.min(Number(e.target.value || 0), values.radius.max), max: values.radius.max })} name="radiusMin" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">km</span>
            </div>
            <span className="text-gray-500">-</span>
            <div className="relative w-40">
              <input type="number" className="w-full pr-10 px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={values.radius.max} onChange={(e) => onRadiusChange({ min: values.radius.min, max: Math.max(Number(e.target.value || 0), values.radius.min) })} name="radiusMax" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">km</span>
            </div>
          </div>
          <div className="w-full">
            <RangeSlider min={0} max={50000} step={100} value={values.radius} onChange={onRadiusChange} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationRadiusSection;
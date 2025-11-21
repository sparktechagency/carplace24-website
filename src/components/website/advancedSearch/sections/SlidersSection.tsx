import RangeSlider from "../components/RangeSlider";

type Props = {
  price: { min: number; max: number };
  year: { min: number; max: number };
  mileage: { min: number; max: number };
  onChange: (field: "price" | "year" | "mileage", value: { min: number; max: number }) => void;
};

const SlidersSection = ({ price, year, mileage, onChange }: Props) => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-8">
      <div>
        <div className="text-sm font-medium text-gray-700 mb-2">Price Range</div>
        <div className="flex items-center gap-10 w-full">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative w-40">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input type="number" className="w-full pl-7 pr-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={price.min} onChange={(e) => onChange("price", { min: Math.min(Number(e.target.value || 0), price.max), max: price.max })} name="priceMin" />
            </div>
            <span className="text-gray-500">-</span>
            <div className="relative w-40">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input type="number" className="w-full pl-7 pr-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={price.max} onChange={(e) => onChange("price", { min: price.min, max: Math.max(Number(e.target.value || 0), price.min) })} name="priceMax" />
            </div>
          </div>
          <div className="w-full">
            <RangeSlider min={0} max={100000} step={100} value={price} onChange={(v) => onChange("price", v)} />
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-gray-700 mb-2">Year</div>
        <div className="flex items-center gap-10 w-full">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-40">
              <input type="number" className="w-full px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={year.min} onChange={(e) => onChange("year", { min: Math.min(Number(e.target.value || 0), year.max), max: year.max })} name="yearMin" />
            </div>
            <span className="text-gray-500">-</span>
            <div className="w-40">
              <input type="number" className="w-full px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={year.max} onChange={(e) => onChange("year", { min: year.min, max: Math.max(Number(e.target.value || 0), year.min) })} name="yearMax" />
            </div>
          </div>
          <div className="w-full">
            <RangeSlider min={1950} max={2025} step={1} value={year} onChange={(v) => onChange("year", v)} />
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-gray-700 mb-2">Mileage</div>
        <div className="flex items-center gap-10 w-full">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative w-40">
              <input type="number" className="w-full pr-10 px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={mileage.min} onChange={(e) => onChange("mileage", { min: Math.min(Number(e.target.value || 0), mileage.max), max: mileage.max })} name="mileageMin" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">km</span>
            </div>
            <span className="text-gray-500">-</span>
            <div className="relative w-40">
              <input type="number" className="w-full pr-10 px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={mileage.max} onChange={(e) => onChange("mileage", { min: mileage.min, max: Math.max(Number(e.target.value || 0), mileage.min) })} name="mileageMax" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">km</span>
            </div>
          </div>
          <div className="w-full">
            <RangeSlider min={0} max={400000} step={1000} value={mileage} onChange={(v) => onChange("mileage", v)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidersSection;
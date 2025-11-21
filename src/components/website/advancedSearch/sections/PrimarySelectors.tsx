import SelectDropdown from "@/components/ui/SelectDropdown";

type Props = {
  values: { category: string; brand: string; model: string };
  onChange: (field: "category" | "brand" | "model", value: string) => void;
  options: { categories: any[]; brands: any[]; models: any[] };
};

const PrimarySelectors = ({ values, onChange, options }: Props) => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <SelectDropdown id="category" options={options.categories} label="Vehicle Category" value={values.category} onChange={(e) => onChange("category", e.target.value)} />
      <SelectDropdown id="brand" options={options.brands} label="Brand" value={values.brand} onChange={(e) => onChange("brand", e.target.value)} />
      <SelectDropdown id="model" options={options.models} label="Model" value={values.model} onChange={(e) => onChange("model", e.target.value)} />
    </div>
  );
};

export default PrimarySelectors;
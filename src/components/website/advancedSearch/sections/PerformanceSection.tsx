import SelectDropdown from "@/components/ui/SelectDropdown";

type Props = {
  values: { performance: string; displacement: string; cylinders: string };
  onChange: (field: "performance" | "displacement" | "cylinders", value: string) => void;
  options: { performances: any[]; displacements: any[]; cylinders: any[] };
};

const PerformanceSection = ({ values, onChange, options }: Props) => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <SelectDropdown id="performance" options={options.performances} label="Performance" value={values.performance} onChange={(e) => onChange("performance", e.target.value)} />
      <SelectDropdown id="displacement" options={options.displacements} label="Engine displacement" value={values.displacement} onChange={(e) => onChange("displacement", e.target.value)} />
      <SelectDropdown id="cylinders" options={options.cylinders} label="Cylinders" value={values.cylinders} onChange={(e) => onChange("cylinders", e.target.value)} />
    </div>
  );
};

export default PerformanceSection;
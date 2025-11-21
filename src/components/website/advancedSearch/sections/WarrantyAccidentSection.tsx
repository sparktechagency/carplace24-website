import SelectDropdown from "@/components/ui/SelectDropdown";

type Props = {
  values: { warranty: string; accident: string };
  onChange: (field: "warranty" | "accident", value: string) => void;
  options: { warranties: any[]; accidents: any[] };
};

const WarrantyAccidentSection = ({ values, onChange, options }: Props) => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <SelectDropdown id="warranty" options={options.warranties} label="MFK & Warranty" value={values.warranty} onChange={(e) => onChange("warranty", e.target.value)} />
      <SelectDropdown id="accident" options={options.accidents} label="Accident Vehicles" value={values.accident} onChange={(e) => onChange("accident", e.target.value)} />
    </div>
  );
};

export default WarrantyAccidentSection;
import SelectDropdown from "@/components/ui/SelectDropdown";

type Props = {
  values: { energyClass: string; euroStandard: string; euro6Standard: string };
  onChange: (field: "energyClass" | "euroStandard" | "euro6Standard", value: string) => void;
  options: { energyEfficiencyClasses: any[]; euroStandards: any[]; euro6SubStandards: any[] };
};

const EnergyEuroSection = ({ values, onChange, options }: Props) => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <SelectDropdown id="energyClass" options={options.energyEfficiencyClasses} label="Energy efficiency class" value={values.energyClass} onChange={(e) => onChange("energyClass", e.target.value)} />
      <SelectDropdown id="euroStandard" options={options.euroStandards} label="Euro Standard" value={values.euroStandard} onChange={(e) => onChange("euroStandard", e.target.value)} />
      <SelectDropdown id="euro6Standard" options={options.euro6SubStandards} label="Euro 6 Standard" value={values.euro6Standard} onChange={(e) => onChange("euro6Standard", e.target.value)} />
    </div>
  );
};

export default EnergyEuroSection;
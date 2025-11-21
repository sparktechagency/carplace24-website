import SelectDropdown from "@/components/ui/SelectDropdown";

type Props = {
  values: { condition: string; buyLease: string; driveType: string };
  onChange: (field: "condition" | "buyLease" | "driveType", value: string) => void;
  options: { conditions: any[]; buyLease: any[]; driveTypes: any[] };
};

const SecondarySelectors = ({ values, onChange, options }: Props) => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <SelectDropdown id="condition" options={options.conditions} label="Condition" value={values.condition} onChange={(e) => onChange("condition", e.target.value)} />
      <SelectDropdown id="buylease" options={options.buyLease} label="Buy/Lease" value={values.buyLease} onChange={(e) => onChange("buyLease", e.target.value)} />
      <SelectDropdown id="drive" options={options.driveTypes} label="Drive type" value={values.driveType} onChange={(e) => onChange("driveType", e.target.value)} />
    </div>
  );
};

export default SecondarySelectors;
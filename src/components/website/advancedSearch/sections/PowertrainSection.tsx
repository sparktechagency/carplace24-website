import SelectDropdown from "@/components/ui/SelectDropdown";

type Props = {
  values: { fuel: string; gearbox: string; transmission: string };
  onChange: (field: "fuel" | "gearbox" | "transmission", value: string) => void;
  options: { fuels: any[]; gearboxes: any[]; transmissions: any[] };
};

const PowertrainSection = ({ values, onChange, options }: Props) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <SelectDropdown id="fuel" options={options.fuels} label="Fuel" value={values.fuel} onChange={(e) => onChange("fuel", e.target.value)} />
      <SelectDropdown id="gearbox" options={options.gearboxes} label="Gearbox" value={values.gearbox} onChange={(e) => onChange("gearbox", e.target.value)} />
      <SelectDropdown id="transmission" options={options.transmissions} label="Transmission" value={values.transmission} onChange={(e) => onChange("transmission", e.target.value)} />
    </div>
  );
};

export default PowertrainSection;
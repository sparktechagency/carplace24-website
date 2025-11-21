import { EQUIPMENT_OPTIONS } from "../data/equipment";

type Props = {
  selected: string[];
  onToggle: (label: string) => void;
};

const EquipmentSection = ({ selected, onToggle }: Props) => {
  const columns = 4;
  const perCol = Math.ceil(EQUIPMENT_OPTIONS.length / columns);
  const chunked = Array.from({ length: columns }, (_, i) => EQUIPMENT_OPTIONS.slice(i * perCol, i * perCol + perCol));
  return (
    <div className="mt-10">
      <div className="text-sm font-medium text-gray-700 mb-3">Equipment</div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {chunked.map((col, cIdx) => (
          <div key={cIdx} className="space-y-3">
            {col.map(({ label, count }, idx) => {
              const id = `equip-${cIdx}-${idx}`;
              const checked = selected.includes(label);
              return (
                <label key={id} htmlFor={id} className="flex items-center gap-2 text-gray-800">
                  <input id={id} type="checkbox" className="h-4 w-4 border-gray-300 rounded" checked={checked} onChange={() => onToggle(label)} />
                  <span className="flex-1 text-sm md:text-base">{label}</span>
                  <span className="text-xs text-gray-500">{count.toLocaleString()}</span>
                </label>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentSection;
"use client";

interface AboutCarSectionProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const AboutCarSection = ({
  formData,
  handleInputChange,
}: AboutCarSectionProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        About Car
      </label>
      <textarea
        placeholder="Tell us more about this car..."
        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
        value={formData.aboutCar}
        onChange={(e) => handleInputChange("aboutCar", e.target.value)}
      />
    </div>
  );
};

export default AboutCarSection;

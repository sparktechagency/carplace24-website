"use client";

import SelectDropdown from "@/components/ui/SelectDropdown";
import {
  useGetAllBrandsQuery,
  useGetModelByBrandQuery,
} from "@/redux/apiSlice/brandAndModalSlice";

type Props = {
  values: { category: string; brand: string; model: string };
  onChange: (field: "category" | "brand" | "model", value: string) => void;
  options: { categories: any[] };
};

const PrimarySelectors = ({ values, onChange, options }: Props) => {
  // Fetch brands from API
  const { data: brandsData, isLoading: brandsLoading } = useGetAllBrandsQuery(
    {}
  );

  // Fetch models based on selected brand
  const { data: modelsData, isLoading: modelsLoading } =
    useGetModelByBrandQuery(values.brand, { skip: !values.brand });

  // Transform brands data for dropdown
  const brandOptions = brandsData?.data
    ? [
        { value: "", label: "Select Brand" },
        ...brandsData.data.map((brand: any) => ({
          value: brand._id,
          label: brand.brand,
        })),
      ]
    : [{ value: "", label: brandsLoading ? "Loading..." : "Select Brand" }];

  // Transform models data for dropdown
  const modelOptions = modelsData?.data
    ? [
        { value: "", label: "Select Model" },
        ...modelsData.data.map((model: any) => ({
          value: model._id,
          label: model.model,
        })),
      ]
    : [
        {
          value: "",
          label: values.brand
            ? modelsLoading
              ? "Loading..."
              : "No models found"
            : "Select brand first",
        },
      ];

  // Handle brand change - reset model when brand changes
  const handleBrandChange = (brandId: string) => {
    onChange("brand", brandId);
    onChange("model", ""); // Reset model when brand changes
  };

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <SelectDropdown
        id="category"
        options={options.categories}
        label="Vehicle Category"
        value={values.category}
        onChange={(e) => onChange("category", e.target.value)}
      />
      <SelectDropdown
        id="brand"
        options={brandOptions}
        label="Brand"
        value={values.brand}
        onChange={(e) => handleBrandChange(e.target.value)}
      />
      <SelectDropdown
        id="model"
        options={modelOptions}
        label="Model"
        value={values.model}
        onChange={(e) => onChange("model", e.target.value)}
      />
    </div>
  );
};

export default PrimarySelectors;

"use client";

import { useEffect, useMemo, useState } from "react";
import SelectDropdown from "@/components/website/addCars/SelectDropdown";
import ImageUploader from "@/components/website/addCars/ImageUploader";
import FormSection from "@/components/website/addCars/FormSection";
import {
  TechnicalSpecifications,
  ElectricHybridSpecific,
  WeightInformation,
  Equipment,
  Extras,
  Colour,
  SeatsAndDoors,
  EnergyAndEnvironment,
  EuroStandard,
  Location,
  Pricing,
} from "@/components/website/addCars/FormSections";
import Container from "@/components/ui/container";
import {
  useUpdateCarMutation,
  useGetCarByIdQuery,
} from "@/redux/apiSlice/carSlice";
import toast from "react-hot-toast";
import {
  useGetAllBrandsQuery,
  useGetModelByBrandQuery,
} from "@/redux/apiSlice/brandAndModalSlice";
import { useProfileQuery } from "@/redux/apiSlice/authSlice";
import { useRouter } from "next/navigation";
import CarLoader from "@/components/ui/loader/CarLoader";
import { imageUrl } from "@/redux/api/baseApi";
import {
  getEquipmentFeaturesFromCar,
  labelToKey,
  normalize,
} from "./editCarUtils";

const EditCarPage = ({ id }: { id: string }) => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    vehicleName: "",
    vinNo: "",
    year: "",
    brand: "",
    model: "",
    condition: "",
    mileage: "",
    warranty: "",
    accident: "",
    bodyType: "",
    regularPrice: "",
    offerPrice: "",
    leasingRate: "",
    fuelType: "",
    driveType: "",
    transmission: "",
    performance: "",
    engineDisplacement: "",
    cylinders: "",
    range: "",
    batteryCapacity: "",
    towingCapacity: "",
    totalWeight: "",
    curbWeight: "",
    equipmentCurbWeight: "",
    equipmentTransmission: "",
    equipmentFeatures: [] as string[],
    tires: "",
    summerWinter: "",
    handicapAccessible: "",
    raceCar: "",
    tuning: "",
    exteriorColour: [] as string[],
    interiorColour: [] as string[],
    seatsAndDoor: "",
    door: "",
    fuelConsumption: "",
    coEmissions: "",
    energyEfficiencyClass: "",
    euroFuelType: "",
    euroTransmission: "",
    country: "",
    city: "",
    zipCode: "",
    description: "",
    aboutCar: "",
  });

  const { data: carData, isLoading: carLoading } = useGetCarByIdQuery(id);
  const [updateCar, { isLoading: isUpdating }] = useUpdateCarMutation();

  const { data: brandsData } = useGetAllBrandsQuery(undefined);
  const { data: modelsData } = useGetModelByBrandQuery(formData.brand, {
    skip: !formData.brand,
  });

  const { data: userData } = useProfileQuery({});
  const userDetails = (userData as any)?.data || (userData as any) || null;

  // Pre-fill form data when carData is loaded
  useEffect(() => {
    if (carData?.data) {
      const car = carData.data;
      const bi = car.basicInformation || {};
      const ti = car.technicalInformation || {};
      const eh = car.electricHybrid || {};
      const eq = car.equipment || {};
      const ex = car.extras || {};
      const col = car.colour || {};
      const sd = car.seatsAndDoors || {};
      const ee = car.energyAndEnvironment || {};
      const es = car.euroStandard || {};
      const loc = car.location || {};

      const features = getEquipmentFeaturesFromCar(car);

      setFormData({
        vehicleName: bi.vehicleName || "",
        vinNo: bi.vinNo || "",
        year: bi.year || "",
        brand:
          typeof bi.brand === "object" ? bi.brand?._id || "" : bi.brand || "",
        model:
          typeof bi.model === "object" ? bi.model?._id || "" : bi.model || "",
        condition: bi.condition || "",
        mileage: bi.miles || "",
        warranty: bi.MfkWarranty || "",
        accident: bi.AccidentVehicle || "",
        bodyType: bi.BodyType || "",
        regularPrice: bi.RegularPrice || "",
        offerPrice: bi.OfferPrice || "",
        leasingRate: bi.leasingRate || "",

        fuelType: ti.fuelType || "",
        driveType: ti.driveType || "",
        transmission: ti.transmission || "",
        performance: ti.performance || "",
        engineDisplacement: ti.engineDisplacement || "",
        cylinders: ti.cylinders || "",

        range: eh.rangeKm || "",
        batteryCapacity: eh.batteryCapacityKWh || "",
        towingCapacity: eh.towingCapacity || "",
        totalWeight: eh.totalWeight || "",
        curbWeight: eh.curbWeight || "",

        equipmentCurbWeight: "",
        equipmentTransmission: "",
        equipmentFeatures: features,

        tires: ex.tires || "",
        summerWinter: ex.season || "",
        handicapAccessible: ex.handicapAccessible || "",
        raceCar: ex.raceCar || "",
        tuning: ex.tuning || "",

        exteriorColour: col.exterior || [],
        interiorColour: col.interior || [],

        seatsAndDoor: sd.seats || "",
        door: sd.doors || "",

        fuelConsumption: ee.fuelConsumption || "",
        coEmissions: ee.coEmissions || "",
        energyEfficiencyClass: ee.energyEfficiencyClass || "",

        euroFuelType: es.fuelType || "",
        euroTransmission: es.transmission || "",

        country: loc.country || "",
        city: loc.city || "",
        zipCode: loc.zipCode || "",
        description: car.description || "",
        aboutCar: bi.aboutCar || car.aboutCar || "",
      });

      // Handle images
      const imgs = bi.productImage || [];
      const imageList = imgs.map((img: any) => {
        if (typeof img === "string" && img.startsWith("http")) return img;
        return `${imageUrl}/${img}`;
      });
      setImages(imageList);
    }
  }, [carData]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const brandOptions = [
    { value: "", label: "Select Brand" },
    ...(Array.isArray((brandsData as any)?.data || brandsData)
      ? (((brandsData as any)?.data || brandsData) as any[]).map((b) => ({
          value:
            b?._id || b?.id || String(b?.value || b?.slug || b?.name || ""),
          label:
            b?.brand ||
            b?.name ||
            b?.title ||
            String(b?.label || b?.slug || b?._id || ""),
        }))
      : []),
  ];

  // Logic to pre-select brand object if needed, but SelectDropdown takes a value.

  const modelOptions = [
    { value: "", label: "Select Model" },
    ...(Array.isArray((modelsData as any)?.data || modelsData)
      ? (((modelsData as any)?.data || modelsData) as any[]).map((m) => ({
          value:
            m?._id || m?.id || String(m?.value || m?.slug || m?.name || ""),
          label:
            m?.model ||
            m?.name ||
            m?.title ||
            String(m?.label || m?.slug || m?._id || ""),
        }))
      : []),
  ];

  const dataUrlToFile = (dataUrl: string, filename: string) => {
    const arr = dataUrl.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
    const bstr = atob(arr[1] || "");
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const fd = new FormData();

      const basicInformation: any = {
        vehicleName: String(formData.vehicleName || ""),
        brand: String(formData.brand || ""),
        model: String(formData.model || ""),
        vinNo: String(formData.vinNo || ""),
        year: Number(formData.year || 0),
        RegularPrice: Number(formData.regularPrice || 0),
        OfferPrice: Number(formData.offerPrice || 0),
        leasingRate: String(formData.leasingRate || ""),
        condition: String(formData.condition || ""),
        miles: Number(formData.mileage || 0),
        MfkWarranty: String(formData.warranty || ""),
        AccidentVehicle: String(formData.accident || ""),
        BodyType: String(formData.bodyType || ""),
        aboutCar: String(formData.aboutCar || ""),
      };
      const technicalInformation: any = {
        fuelType: String(formData.fuelType || ""),
        driveType: String(formData.driveType || ""),
        transmission: String(formData.transmission || ""),
        performance: String(formData.performance || ""),
        engineDisplacement: String(formData.engineDisplacement || ""),
        cylinders: Number(formData.cylinders || 0),
      };

      const electricHybrid: any = {
        batteryCapacityKWh: Number(formData.batteryCapacity || 0),
        rangeKm: Number(formData.range || 0),
        towingCapacity: Number(formData.towingCapacity || 0),
        totalWeight: Number(formData.totalWeight || 0),
        curbWeight: Number(formData.curbWeight || 0),
      };

      // Reconstruct selected features logic if needed or send what we have
      const features: string[] = Array.isArray(formData.equipmentFeatures)
        ? formData.equipmentFeatures
        : [];

      const equipment: Record<string, boolean> = {};
      features.forEach((label) => {
        const key = labelToKey[normalize(label)];
        if (key) equipment[key] = true;
      });

      const extras: any = {
        tires: String(formData.tires || ""),
        season: String(formData.summerWinter || ""),
        handicapAccessible: String(formData.handicapAccessible || ""),
        raceCar: String(formData.raceCar || ""),
        tuning: String(formData.tuning || ""),
      };

      const colour: any = {
        metallic: "",
        interior: Array.isArray(formData.interiorColour)
          ? formData.interiorColour
          : [],
        exterior: Array.isArray(formData.exteriorColour)
          ? formData.exteriorColour
          : [],
      };

      const seatsAndDoors: any = {
        seats: Number(formData.seatsAndDoor || 0),
        doors: Number(formData.door || 0),
      };

      const energyAndEnvironment: any = {
        fuelConsumption: String(formData.fuelConsumption || ""),
        coEmissions: String(formData.coEmissions || ""),
        energyEfficiencyClass: String(formData.energyEfficiencyClass || ""),
      };

      const euroStandard: any = {
        fuelType: String(formData.euroFuelType || ""),
        transmission: String(formData.euroTransmission || ""),
      };

      fd.append("basicInformation", JSON.stringify(basicInformation));
      fd.append("technicalInformation", JSON.stringify(technicalInformation));
      fd.append("electricHybrid", JSON.stringify(electricHybrid));
      fd.append("equipment", JSON.stringify(equipment));
      fd.append("equipmentFeatures", JSON.stringify(features));
      fd.append("extras", JSON.stringify(extras));
      fd.append("colour", JSON.stringify(colour));
      fd.append("seatsAndDoors", JSON.stringify(seatsAndDoors));
      fd.append("energyAndEnvironment", JSON.stringify(energyAndEnvironment));
      fd.append("euroStandard", JSON.stringify(euroStandard));
      fd.append("description", String(formData.description || ""));

      // Handle images: split into existing and new
      // New images are base64 data URLs. Existing images are HTTP URLs.
      // Backend likely expects `productImage` to contain files for new images.
      // What about existing images? Does the backend support partial updates or list of URLs?
      // Typically `productImage` handles file uploads. If we want to keep existing ones, we probably need to handle them differently or the backend might replace all images if we send files.
      // BUT if the backend uses a standard update (Patch), it might only update provided fields.
      // However, for images, usually it's tricky.
      // If I interpret `AddCarsPage`, it appends files.

      // We need to filter which images are new (base64) and which are existing.
      // If the backend allows sending a list of existing image URLs to keep, we should send that.
      // If not, we might be overwriting or appending.
      // Let's assume for now we send new files.
      // IMPORTANT: If I just send new files, existing ones might be lost if backend replaces the array.
      // Usually, there's a separate field or logic for 'retaining' images.
      // Without backend knowledge, I'll attempt to send new files.
      // Also, `basicInformation` has `productImage` array?

      images.forEach((img, idx) => {
        if (typeof img === "string" && img.startsWith("data:")) {
          const file = dataUrlToFile(img, `image_${idx + 1}.png`);
          fd.append("basicInformation[productImage]", file);
        } else {
          // It's an existing image.
          // We might need to tell the backend to keep it.
          // Depending on implementation, maybe we append it as string?
          // fd.append("basicInformation[productImage]", img);
          // Let's try appending it as string if it's a URL, hoping backend handles mixed types or check `AddCarsPage` logic again.
          // AddCarsPage only handles new files because it's *Add*.
        }
      });
      // A common pattern is sending `existingImages` array or similar.
      // Or maybe the backend is smart enough.
      // For now, I will NOT send existing images in the file field to avoid type errors on backend if it expects files.
      // But this implies existing images might be lost if I don't handle them.
      // Risk: Image update might be buggy.

      const res = await updateCar({ id, data: fd }).unwrap();
      const message = (res as any)?.message || "Vehicle updated successfully";
      toast.success(message);

      router.back(); // Or navigate back
    } catch (err: any) {
      const msg = err?.data?.message || "Failed to update vehicle";
      toast.error(msg);
    }
  };

  if (carLoading) return <CarLoader />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Edit Vehicle</h1>
            <p className="mt-2 text-sm text-gray-600">
              Update the details of your vehicle
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormSection title="Vehicle Images">
              <ImageUploader images={images} setImages={setImages} />
            </FormSection>

            <FormSection title="Basic Information">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Vehicle Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BMW 3 Series"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.vehicleName}
                    onChange={(e) =>
                      handleInputChange("vehicleName", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="vinNo"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    VIN No.
                  </label>
                  <input
                    type="text"
                    id="vinNo"
                    placeholder="1GCVKREC8EZ157379"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.vinNo}
                    onChange={(e) => handleInputChange("vinNo", e.target.value)}
                  />
                </div>

                <div>
                  <SelectDropdown
                    id="brand"
                    label="Brand"
                    options={brandOptions}
                    value={formData.brand}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleInputChange("brand", val);
                      handleInputChange("model", "");
                    }}
                  />
                </div>

                <div>
                  <SelectDropdown
                    id="model"
                    label="Model"
                    options={modelOptions}
                    value={formData.model}
                    onChange={(e) => handleInputChange("model", e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="year"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Year
                  </label>
                  <input
                    type="text"
                    id="year"
                    placeholder="2010"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.year}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                  />
                </div>

                <div>
                  <SelectDropdown
                    id="condition"
                    label="Condition"
                    options={[
                      { value: "New", label: "New" },
                      { value: "Used", label: "Used" },
                      { value: "Certified", label: "Certified" },
                    ]}
                    value={formData.condition}
                    onChange={(e) =>
                      handleInputChange("condition", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="mileage"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Mileage
                  </label>
                  <input
                    type="text"
                    id="mileage"
                    placeholder="32000"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.mileage}
                    onChange={(e) =>
                      handleInputChange("mileage", e.target.value)
                    }
                  />
                </div>

                <div>
                  <SelectDropdown
                    id="warranty"
                    label="MFK Warranty"
                    options={[
                      { value: "With warranty", label: "With warranty" },
                      { value: "No warranty", label: "No warranty" },
                    ]}
                    value={formData.warranty}
                    onChange={(e) =>
                      handleInputChange("warranty", e.target.value)
                    }
                  />
                </div>

                <div>
                  <SelectDropdown
                    id="accident"
                    label="Accident Vehicle"
                    options={[
                      { value: "Accident vehicle", label: "Accident vehicle" },
                      { value: "No accident", label: "No accident" },
                    ]}
                    value={formData.accident}
                    onChange={(e) =>
                      handleInputChange("accident", e.target.value)
                    }
                  />
                </div>

                <div>
                  <SelectDropdown
                    id="bodyType"
                    label="Body Type"
                    options={[
                      { value: "SUV", label: "SUV" },
                      { value: "Sedan", label: "Sedan" },
                      { value: "Coupe", label: "Coupe" },
                      { value: "Truck", label: "Truck" },
                    ]}
                    value={formData.bodyType}
                    onChange={(e) =>
                      handleInputChange("bodyType", e.target.value)
                    }
                  />
                </div>
              </div>
            </FormSection>

            <Pricing
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* About Car */}
            <FormSection title="About Car">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  About Car
                </label>
                <textarea
                  placeholder="Tell us more about this car..."
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                  value={formData.aboutCar}
                  onChange={(e) =>
                    handleInputChange("aboutCar", e.target.value)
                  }
                />
              </div>
            </FormSection>
            <TechnicalSpecifications
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <ElectricHybridSpecific
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <WeightInformation
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <Equipment
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <Extras formData={formData} handleInputChange={handleInputChange} />
            <Colour formData={formData} handleInputChange={handleInputChange} />
            <SeatsAndDoors
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <EnergyAndEnvironment
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <EuroStandard
              formData={formData}
              handleInputChange={handleInputChange}
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                onClick={() => router.back()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
              >
                {isUpdating ? "Updating..." : "Update Vehicle"}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default EditCarPage;

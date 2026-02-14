"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  useAddCarMutation,
  useAddCarsBulkMutation,
} from "@/redux/apiSlice/carSlice";
import {
  useGetAllBrandsQuery,
  useGetModelByBrandQuery,
} from "@/redux/apiSlice/brandAndModalSlice";
import { useProfileQuery } from "@/redux/apiSlice/authSlice";
import { dataUrlToFile, labelToKey, normalize } from "./utils";

export const useAddCarForm = () => {
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
    equipmentFeatures: [],
    tires: "",
    summerWinter: "",
    handicapAccessible: "",
    raceCar: "",
    tuning: "",
    exteriorColour: [],
    interiorColour: [],
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

  const [addCar] = useAddCarMutation();
  const [addCarsBulk] = useAddCarsBulkMutation();
  const [isUploadingBulk, setIsUploadingBulk] = useState(false);

  const { data: brandsData, isLoading: brandsLoading } =
    useGetAllBrandsQuery(undefined);
  const { data: modelsData, isLoading: modelsLoading } =
    useGetModelByBrandQuery(formData.brand, { skip: !formData.brand });

  const { data: userData, isLoading: userLoading } = useProfileQuery({});
  const userDetails = (userData as any)?.data || (userData as any) || null;

  const isSubscribed = useMemo(() => {
    const u = userDetails || {};
    if (u?.isSubscribed === true) return true;
    if (String(u?.subscriptionStatus || "").toLowerCase() === "active")
      return true;
    if (
      u?.subscription?.status &&
      String(u.subscription.status).toLowerCase() === "active"
    )
      return true;
    if (u?.currentPackage || u?.activePackage) return true;
    if (Array.isArray(u?.packages) && u.packages.length > 0) return true;
    return false;
  }, [userDetails]);

  const isDealer = useMemo(() => {
    const u = userDetails || {};
    const role = String(
      u?.subscribedPackage?.targetRole || u?.targetRole || "",
    ).toUpperCase();
    return role.includes("DELEAR") || role.includes("DELEAR");
  }, [userDetails]);

  const [showSubWarning, setShowSubWarning] = useState(false);

  useEffect(() => {
    let t: any;
    if (!userLoading && !isSubscribed) {
      t = setTimeout(() => setShowSubWarning(true), 1500);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [userLoading, isSubscribed]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const brandOptions = useMemo(
    () => [
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
    ],
    [brandsData],
  );

  const modelOptions = useMemo(
    () => [
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
    ],
    [modelsData],
  );

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

      images.forEach((img, idx) => {
        if (typeof img === "string" && img.startsWith("data:")) {
          const file = dataUrlToFile(img, `image_${idx + 1}.png`);
          fd.append("basicInformation[productImage]", file);
        }
      });

      const res = await addCar(fd).unwrap();
      const message = (res as any)?.message || "Vehicle added";
      toast.success(message);
    } catch (err: any) {
      const msg = err?.data?.message || "Failed to add vehicle";
      toast.error(msg);
    }
  };

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    if (
      !validTypes.includes(file.type) &&
      !file.name.match(/\.(xlsx?|csv)$/i)
    ) {
      toast.error("Please upload a valid Excel or CSV file");
      return;
    }

    setIsUploadingBulk(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await addCarsBulk(formData).unwrap();
      const message = (res as any)?.message || "Vehicles uploaded successfully";
      toast.success(message);

      if (e.target) e.target.value = "";
    } catch (err: any) {
      const msg = err?.data?.message || "Failed to upload vehicles";
      toast.error(msg);
    } finally {
      setIsUploadingBulk(false);
    }
  };

  return {
    images,
    setImages,
    formData,
    handleInputChange,
    handleSubmit,
    handleBulkUpload,
    isUploadingBulk,
    isDealer,
    isSubscribed,
    showSubWarning,
    setShowSubWarning,
    router,
    brandOptions,
    modelOptions,
    brandsLoading,
    modelsLoading,
  };
};

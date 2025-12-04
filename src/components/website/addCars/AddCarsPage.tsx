"use client";

import { useState } from "react";
import SelectDropdown from "./SelectDropdown";
import ImageUploader from "./ImageUploader";
import FormSection from "./FormSection";
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
} from "./sections/FormSections";
import Container from "@/components/ui/container";
import { useAddCarMutation } from "@/redux/apiSlice/carSlice";
import toast from "react-hot-toast";
import {
  useGetAllBrandsQuery,
  useGetModelByBrandQuery,
} from "@/redux/apiSlice/brandAndModalSlice";

const AddCarsPage = () => {
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
  });

  const [addCar] = useAddCarMutation();
  const { data: brandsData, isLoading: brandsLoading } =
    useGetAllBrandsQuery(undefined);
  const { data: modelsData, isLoading: modelsLoading } =
    useGetModelByBrandQuery(formData.brand, { skip: !formData.brand });

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
      const normalize = (s: string) =>
        String(s || "")
          .trim()
          .toLowerCase();
      const labelToKey: Record<string, string> = {
        abs: "ABS",
        "accesso e accensione senza chiave": "KeylessEntryStart",
        "aiuti al parcheggio": "ParkingAssist",
        altoparlante: "SoundSystem",
        "alzacristalli elettrici": "ElectricWindows",
        "android auto": "AndroidAuto",
        "apple carplay": "AppleCarPlay",
        "aria condizionata": "AirConditioning",
        "climatizzatore automatico": "ClimateControl",
        "assistente di corsia": "LaneAssist",
        "assistente di frenata automatico": "AutomaticBrakeAssist",
        "bloccaggio differenziale": "DifferentialLock",
        "cerchi in lega": "AlloyWheels",
        "controllo di velocità": "CruiseControl",
        "controllo di velocità adattivo": "AdaptiveCruiseControl",
        "controllo elettronico della stabilità (esp)": "StabilityControlESP",
        "coperture dei sedili": "SeatCovers",
        alcantara: "Alcantara",
        "interni in tessuto": "FabricSeats",
        "sedili in pelle": "LeatherSeats",
        "dispositivo antifurto": "AntiTheftDevice",
        "elementi cromati": "ChromeElements",
        fari: "Headlights",
        "fari allo laser": "LaserHeadlights",
        "fari led": "LEDHeadlights",
        "fari allo xeno": "XenonHeadlights",
        "fari adattivi": "AdaptiveHeadlights",
        "gancio traino": "Towbar",
        "gancio di traino rimovibile": "DetachableTowbar",
        "gancio di traino orientabile": "SwivelTowbar",
        "gancio di traino fisso": "FixedTowbar",
        "head-up display": "HeadUpDisplay",
        "interfaccia bluetooth": "Bluetooth",
        isofix: "Isofix",
        pedana: "Footboard",
        "pittura speciale": "SpecialPaint",
        "porta scorrevole": "SlidingDoor",
        portapacchi: "RoofRack",
        "porte ad ali di gabbiano": "GullwingDoors",
        "portellone posteriore elettrico": "ElectricTailgate",
        "radio dab": "RadioDAB",
        "regolazione elettrica dei sedili": "ElectricSeatAdjustment",
        "ricarica rapida": "FastCharging",
        "riscaldamento ausiliario": "AuxiliaryHeating",
        schienale: "BackRest",
        "sedili riscaldati": "HeatedSeats",
        "sedili sportivi": "SportsSeats",
        "sedili ventilati": "VentilatedSeats",
        "sensori di parcheggio anteriori": "FrontParkingSensors",
        "sensori di parcheggio posteriori": "RearParkingSensors",
        "silenziatore personalizzato": "CustomMuffler",
        "sistema di allarme": "AlarmSystem",
        "sistema di monitoraggio angolo cieco": "BlindSpotMonitoring",
        "sistema di navigazione": "NavigationSystem",
        navigazione: "NavigationSystem",
        "sistema di navigazione portatile": "PortableNavigation",
        "sistema start-stop": "StartStopSystem",
        "sospensioni pneumatiche": "AirSuspension",
        "sospensioni rinforzate": "ReinforcedSuspension",
        "strumentazione aggiuntiva": "AdditionalInstruments",
        "telecamera a 360°": "Camera360",
        "telecamera posteriore": "RearCamera",
        "tetto panoramico": "PanoramicRoof",
        "tetto rigido": "HardTop",
        "tettuccio apribile": "Sunroof",
        valigia: "Luggage",
        vivavoce: "HandsFree",
      };
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Add New Vehicle
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Fill in the details below to list your vehicle
            </p>
          </div>

          {/* Main Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Vehicle Images */}
            <FormSection title="Vehicle Images">
              <ImageUploader images={images} setImages={setImages} />
            </FormSection>

            {/* Basic Information */}
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

            {/* Pricing */}
            <Pricing
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* Technical Specifications */}
            <TechnicalSpecifications
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* Electric & Hybrid Specific */}
            <ElectricHybridSpecific
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* Weight Information */}
            <WeightInformation
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* Equipment */}
            <Equipment
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* Extras */}
            <Extras formData={formData} handleInputChange={handleInputChange} />

            {/* Colour */}
            <Colour formData={formData} handleInputChange={handleInputChange} />

            {/* Seats & Doors */}
            <SeatsAndDoors
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* Energy & Environment */}
            <EnergyAndEnvironment
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* Euro Standard */}
            <EuroStandard
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* Location */}
            <Location
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Vehicle
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AddCarsPage;

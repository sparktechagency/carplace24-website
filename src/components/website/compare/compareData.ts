import { Star } from "lucide-react";

export interface CompareCarType {
  id: string;
  title: string;
  sportage: string;
  brands: string[];
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  location: string;
  basicInfo: {
    name: string;
    model: string;
    categories: string;
    brand: string;
    mfkWarranty: string;
    accidentVehicle: string;
    bodyType: string;
  };
  technicalInfo: {
    fuelType: string;
    transmission: string;
    performance: string;
    driveType: string;
    engineDisplacement: string;
    cylinders: string;
    year: string;
  };
  colorInfo: {
    exteriorColour: string;
    interiorColour: string;
  };
  electricHybridInfo: {
    range: string;
    batteryCapacity: string;
    towingCapacity: string;
    totalWeight: string;
    curbWeight: string;
  };
  equipment: {
    abs: string;
    adaptiveHeadlights: string;
  };
  extras: {
    wellType: string;
    summerWinter: string;
    handicapAccessible: string;
    raceCar: string;
    tuning: string;
  };
  seatsAndDoors: {
    seats: string;
    door: string;
  };
  fuelConsumption: {
    consumption: string;
    coEmissions: string;
    energyEfficiencyClass: string;
  };
  euroStandard: {
    fuelType: string;
    transmission: string;
  };
  description: string;
  image: string;
}

export const COMPARE_CARS: CompareCarType[] = [
  {
    id: "123456789",
    title: "KIA Sportage 1.6T PHEV",
    sportage: "Sportage 1.6T SUV",
    brands: ["Jeep", "Audi"],
    price: 15000,
    oldPrice: 16000,
    rating: 4.5,
    reviews: 180,
    location: "Wielandstraße 11, 8010 Graz",
    basicInfo: {
      name: "#123456789",
      model: "KIA Sportage 1.6T PHEV",
      categories: "Sportage 1.6T",
      brand: "Jeep",
      mfkWarranty: "Audi",
      accidentVehicle: "--",
      bodyType: "No Accident Vehicle",
    },
    technicalInfo: {
      fuelType: "Diesel",
      transmission: "Automatic",
      performance: "185hp(136kw)",
      driveType: "AWD",
      engineDisplacement: "cm3",
      cylinders: "2010",
      year: "2010",
    },
    colorInfo: {
      exteriorColour: "Black",
      interiorColour: "Ash",
    },
    electricHybridInfo: {
      range: "--",
      batteryCapacity: "--",
      towingCapacity: "--",
      totalWeight: "--",
      curbWeight: "--",
    },
    equipment: {
      abs: "Yes",
      adaptiveHeadlights: "Yes",
    },
    extras: {
      wellType: "4WD",
      summerWinter: "Summer",
      handicapAccessible: "--",
      raceCar: "--",
      tuning: "--",
    },
    seatsAndDoors: {
      seats: "6 Seats",
      door: "4",
    },
    fuelConsumption: {
      consumption: "6.5 l/100 km",
      coEmissions: "--",
      energyEfficiencyClass: "Euro-6",
    },
    euroStandard: {
      fuelType: "2010",
      transmission: "32000",
    },
    description: "The KIA Sportage is a striking SUV known for its bold design and comfortable interior. It offers a smooth driving experience with responsive handling and ample cargo space.",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "123456790",
    title: "KIA Sportage 1.6T PHEV",
    sportage: "Sportage 1.6T SUV",
    brands: ["Jeep", "Audi"],
    price: 15000,
    oldPrice: 16000,
    rating: 4.5,
    reviews: 180,
    location: "Wielandstraße 11, 8010 Graz",
    basicInfo: {
      name: "#123456790",
      model: "KIA Sportage 1.6T PHEV",
      categories: "Sportage 1.6T",
      brand: "Jeep",
      mfkWarranty: "Audi",
      accidentVehicle: "--",
      bodyType: "No Accident Vehicle",
    },
    technicalInfo: {
      fuelType: "Diesel",
      transmission: "Automatic",
      performance: "185hp(136kw)",
      driveType: "AWD",
      engineDisplacement: "cm3",
      cylinders: "2010",
      year: "2010",
    },
    colorInfo: {
      exteriorColour: "White",
      interiorColour: "Black",
    },
    electricHybridInfo: {
      range: "--",
      batteryCapacity: "--",
      towingCapacity: "--",
      totalWeight: "--",
      curbWeight: "--",
    },
    equipment: {
      abs: "Yes",
      adaptiveHeadlights: "Yes",
    },
    extras: {
      wellType: "4WD",
      summerWinter: "Summer",
      handicapAccessible: "--",
      raceCar: "--",
      tuning: "--",
    },
    seatsAndDoors: {
      seats: "6 Seats",
      door: "4",
    },
    fuelConsumption: {
      consumption: "6.5 l/100 km",
      coEmissions: "--",
      energyEfficiencyClass: "Euro-6",
    },
    euroStandard: {
      fuelType: "2010",
      transmission: "32000",
    },
    description: "The KIA Sportage is a striking SUV known for its bold design and comfortable interior. It offers a smooth driving experience with responsive handling and ample cargo space.",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "123456791",
    title: "KIA Sportage 1.6T PHEV",
    sportage: "Sportage 1.6T SUV",
    brands: ["Jeep", "Audi"],
    price: 15000,
    oldPrice: 16000,
    rating: 4.5,
    reviews: 180,
    location: "Wielandstraße 11, 8010 Graz",
    basicInfo: {
      name: "#123456791",
      model: "KIA Sportage 1.6T PHEV",
      categories: "Sportage 1.6T",
      brand: "Jeep",
      mfkWarranty: "Audi",
      accidentVehicle: "--",
      bodyType: "No Accident Vehicle",
    },
    technicalInfo: {
      fuelType: "Diesel",
      transmission: "Automatic",
      performance: "185hp(136kw)",
      driveType: "AWD",
      engineDisplacement: "cm3",
      cylinders: "2010",
      year: "2010",
    },
    colorInfo: {
      exteriorColour: "Silver",
      interiorColour: "Gray",
    },
    electricHybridInfo: {
      range: "--",
      batteryCapacity: "--",
      towingCapacity: "--",
      totalWeight: "--",
      curbWeight: "--",
    },
    equipment: {
      abs: "Yes",
      adaptiveHeadlights: "Yes",
    },
    extras: {
      wellType: "4WD",
      summerWinter: "Summer",
      handicapAccessible: "--",
      raceCar: "--",
      tuning: "--",
    },
    seatsAndDoors: {
      seats: "6 Seats",
      door: "4",
    },
    fuelConsumption: {
      consumption: "6.5 l/100 km",
      coEmissions: "--",
      energyEfficiencyClass: "Euro-6",
    },
    euroStandard: {
      fuelType: "2010",
      transmission: "32000",
    },
    description: "The KIA Sportage is a striking SUV known for its bold design and comfortable interior. It offers a smooth driving experience with responsive handling and ample cargo space.",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "123456792",
    title: "KIA Sportage 1.6T PHEV",
    sportage: "Sportage 1.6T SUV",
    brands: ["Jeep", "Audi"],
    price: 15000,
    oldPrice: 16000,
    rating: 4.5,
    reviews: 180,
    location: "Wielandstraße 11, 8010 Graz",
    basicInfo: {
      name: "#123456792",
      model: "KIA Sportage 1.6T PHEV",
      categories: "Sportage 1.6T",
      brand: "Jeep",
      mfkWarranty: "Audi",
      accidentVehicle: "--",
      bodyType: "No Accident Vehicle",
    },
    technicalInfo: {
      fuelType: "Diesel",
      transmission: "Automatic",
      performance: "185hp(136kw)",
      driveType: "AWD",
      engineDisplacement: "cm3",
      cylinders: "2010",
      year: "2010",
    },
    colorInfo: {
      exteriorColour: "Blue",
      interiorColour: "Beige",
    },
    electricHybridInfo: {
      range: "--",
      batteryCapacity: "--",
      towingCapacity: "--",
      totalWeight: "--",
      curbWeight: "--",
    },
    equipment: {
      abs: "Yes",
      adaptiveHeadlights: "Yes",
    },
    extras: {
      wellType: "4WD",
      summerWinter: "Summer",
      handicapAccessible: "--",
      raceCar: "--",
      tuning: "--",
    },
    seatsAndDoors: {
      seats: "6 Seats",
      door: "4",
    },
    fuelConsumption: {
      consumption: "6.5 l/100 km",
      coEmissions: "--",
      energyEfficiencyClass: "Euro-6",
    },
    euroStandard: {
      fuelType: "2010",
      transmission: "32000",
    },
    description: "The KIA Sportage is a striking SUV known for its bold design and comfortable interior. It offers a smooth driving experience with responsive handling and ample cargo space.",
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1470&auto=format&fit=crop",
  },
];

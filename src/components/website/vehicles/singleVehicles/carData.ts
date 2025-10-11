import { Gauge, Fuel, Cog, Car } from "lucide-react";

export const CAR_DETAILS = {
  id: 123456789,
  title:
    "KIA Sportage 1.6T PHEV KIA Sportage 1.6T PHEV KIA Sportage 1.6T PHEV",
  subtitle: "Sportage 1.6T/SUV/Jeep/Audi",
  price: { original: 16000, current: 15000, monthly: "$500/m" },
  images: [
    "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
  ],
  dealer: {
    name: "Car Service",
    type: "Dealer",
    logo: "https://images.unsplash.com/photo-1653499676737-becf2c9562c8?q=80&w=1170&auto=format&fit=crop",
    rating: 4.5,
    reviews: 300,
    address: "Wilerstrasse 71, 9200 Gossau",
  },
  summary: [
    { label: "02.2020", icon: Car },
    { label: "Diesel", icon: Fuel },
    { label: "185hp(136kw)", icon: Gauge },
    { label: "82,000 km", icon: Gauge },
    { label: "Automatic", icon: Cog },
    { label: "6.5 l/100 km", icon: Fuel },
    { label: "4WD", icon: Car },
    { label: "New", icon: Car },
  ],
  basicInformation: [
    { name: "S.No", value: "#123456789" },
    { name: "Name", value: "KIA Sportage 1.6T PHEV" },
    { name: "Model", value: "Sportage 1.6T" },
    { name: "Categories", value: "Jeep" },
    { name: "Brand", value: "Audi" },
    { name: "MFK Warranty", value: "--" },
    { name: "Accident Vehicle", value: "No Accident Vehicle" },
    { name: "Body type", value: "SUV" },
  ],
  technicalInformation: [
    { name: "Fuel type", value: "Diesel" },
    { name: "Transmission", value: "Automatic" },
    { name: "Performance", value: "185hp(136kw)" },
    { name: "Drive type", value: "AWD" },
  ],
};
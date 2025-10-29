"use client";

import { useState } from "react";
import Container from "@/components/ui/container";
import { COMPARE_CARS, CompareCarType } from "./compareData";
import { AlertCircle, Star, X } from "lucide-react";
import Image from "next/image";

const CompareVehicles = () => {
  const [compareCars, setCompareCars] = useState<CompareCarType[]>(COMPARE_CARS);

  const removeCar = (id: string) => {
    setCompareCars(compareCars.filter(car => car.id !== id));
  };

  if (compareCars.length === 0) {
    return (
      <div className="py-8">
        <Container>
          <h1 className="text-2xl font-semibold mb-6">You can compare your selected vehicles</h1>
          
          <div className="flex flex-col items-center justify-center p-10 border rounded-md bg-gray-50">
            <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
            <h2 className="text-xl font-medium mb-2">No vehicles selected for comparison</h2>
            <p className="text-gray-600 mb-6 text-center">Please add vehicles to your comparison list to see detailed comparisons.</p>
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
              Browse Vehicles
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <h1 className="text-2xl font-semibold mb-6">You can compare your selected vehicles</h1>
        
        {/* Comparison Table with attached car cards */}
        <div className="border rounded-md overflow-hidden">
          {/* Car Cards Header Row */}
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium"></div>
            {compareCars.map((car) => (
              <div key={car.id} className="border-r relative">
                <button 
                  onClick={() => removeCar(car.id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md z-10"
                >
                  <X className="h-4 w-4" />
                </button>
                
                <div className="relative h-48 w-full">
                  <Image 
                    src={car.image} 
                    alt={car.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium">{car.title}</h3>
                  <p className="text-sm text-gray-600">{car.sportage}</p>
                  <div className="flex gap-1 text-xs text-gray-500 mt-1">
                    {car.brands.map((brand, i) => (
                      <span key={i}>
                        {brand}{i < car.brands.length - 1 ? "/" : ""}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <span className="font-semibold">${car.price.toLocaleString()}</span>
                      <span className="text-sm text-red-500 line-through ml-1">${car.oldPrice.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-gray-500">${(car.price / 12).toFixed(0)}/m</div>
                  </div>
                  
                  <div className="flex items-center gap-1 mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(car.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({car.reviews})</span>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-2">
                    {car.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Basic Information Section */}
          <div className="bg-gray-50 p-4 border-b grid grid-cols-5">
            <h2 className="text-green-600 font-medium">Basic Information</h2>
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Name</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.basicInfo.name}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Model</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.basicInfo.model}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Categories</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.basicInfo.categories}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Brand</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.basicInfo.brand}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">MFK Warranty</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.basicInfo.mfkWarranty}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Accident Vehicle</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.basicInfo.accidentVehicle}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Body type</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.basicInfo.bodyType}</div>
            ))}
          </div>
          
          {/* Technical Information Section */}
          <div className="bg-gray-50 p-4 border-b grid grid-cols-5">
            <h2 className="text-green-600 font-medium">Technical Information</h2>
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Fuel type</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.technicalInfo.fuelType}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Transmission</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.technicalInfo.transmission}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Performance</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.technicalInfo.performance}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Drive type</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.technicalInfo.driveType}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Engine displacement</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.technicalInfo.engineDisplacement}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Cylinders</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.technicalInfo.cylinders}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Year</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.technicalInfo.year}</div>
            ))}
          </div>
          
          {/* Color Information Section */}
          <div className="bg-gray-50 p-4 border-b grid grid-cols-5">
            <h2 className="text-green-600 font-medium">Color Information</h2>
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Exterior Colour</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.colorInfo.exteriorColour}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Interior Colour</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.colorInfo.interiorColour}</div>
            ))}
          </div>
          
          {/* Electric & Hybrid Specific Section */}
          <div className="bg-gray-50 p-4 border-b grid grid-cols-5">
            <h2 className="text-green-600 font-medium">Electric & Hybrid Specific</h2>
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Range</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.electricHybridInfo.range}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Battery Capacity</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.electricHybridInfo.batteryCapacity}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Towing Capacity</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.electricHybridInfo.towingCapacity}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Total Weight</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.electricHybridInfo.totalWeight}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Curb Weight</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.electricHybridInfo.curbWeight}</div>
            ))}
          </div>
          
          {/* Equipment Section */}
          <div className="bg-gray-50 p-4 border-b grid grid-cols-5">
            <h2 className="text-green-600 font-medium">Equipment</h2>
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">ABS</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.equipment.abs}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Adaptive Headlights</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.equipment.adaptiveHeadlights}</div>
            ))}
          </div>
          
          {/* Extras Section */}
          <div className="bg-gray-50 p-4 border-b grid grid-cols-5">
            <h2 className="text-green-600 font-medium">Extras</h2>
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Well Type</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.extras.wellType}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Summer/Winter</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.extras.summerWinter}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Handicap Accessible</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.extras.handicapAccessible}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Race Car</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.extras.raceCar}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Tuning</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.extras.tuning}</div>
            ))}
          </div>
          
          {/* Seats & Doors Section */}
          <div className="bg-gray-50 p-4 border-b grid grid-cols-5">
            <h2 className="text-green-600 font-medium">Seats & Doors</h2>
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Seats</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.seatsAndDoors.seats}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Door</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.seatsAndDoors.door}</div>
            ))}
          </div>
          
          {/* Fuel Consumption Section */}
          <div className="bg-gray-50 p-4 border-b grid grid-cols-5">
            <h2 className="text-green-600 font-medium">Fuel Consumption</h2>
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Consumption</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.fuelConsumption.consumption}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">CO Emissions</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.fuelConsumption.coEmissions}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Energy Efficiency Class</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.fuelConsumption.energyEfficiencyClass}</div>
            ))}
          </div>
          
          {/* Euro Standard Section */}
          <div className="bg-gray-50 p-4 border-b grid grid-cols-5">
            <h2 className="text-green-600 font-medium">Euro Standard</h2>
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Fuel Type</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.euroStandard.fuelType}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Transmission</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.euroStandard.transmission}</div>
            ))}
          </div>
          
          {/* Description Section */}
          <div className="bg-gray-50 p-4 border-b grid grid-cols-5">
            <h2 className="text-green-600 font-medium">Description</h2>
          </div>
          
          <div className="grid grid-cols-5 border-b">
            <div className="p-3 border-r font-medium">Description</div>
            {compareCars.map(car => (
              <div key={car.id} className="p-3 border-r">{car.description}</div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CompareVehicles;

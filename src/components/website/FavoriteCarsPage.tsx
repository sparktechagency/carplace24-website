"use client";

import { useState } from "react";
import Container from "../ui/container";
import { Button } from "../ui/button";
import { FaHeart, FaSearch, FaTrash, FaEye } from "react-icons/fa";
import Image from "next/image";

// Mock data for favorite cars
const mockFavoriteCars = [
  {
    id: 1,
    title: "2023 BMW X5",
    brand: "BMW",
    model: "X5",
    price: 65000,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
    location: "New York, NY",
    year: 2023,
    mileage: 5000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    features: ["Leather Seats", "Navigation", "Sunroof", "Bluetooth"],
  },
  {
    id: 2,
    title: "2022 Mercedes-Benz E-Class",
    brand: "Mercedes-Benz",
    model: "E-Class",
    price: 58000,
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
    location: "Los Angeles, CA",
    year: 2022,
    mileage: 12000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    features: ["Heated Seats", "360 Camera", "Lane Assist", "Premium Sound"],
  },
  {
    id: 3,
    title: "2021 Audi Q7",
    brand: "Audi",
    model: "Q7",
    price: 52000,
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop",
    location: "Chicago, IL",
    year: 2021,
    mileage: 18000,
    fuelType: "Diesel",
    transmission: "Automatic",
    features: [
      "Third Row Seating",
      "Panoramic Roof",
      "Adaptive Cruise Control",
    ],
  },
  {
    id: 4,
    title: "2022 Tesla Model 3",
    brand: "Tesla",
    model: "Model 3",
    price: 48000,
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
    location: "San Francisco, CA",
    year: 2022,
    mileage: 8000,
    fuelType: "Electric",
    transmission: "Automatic",
    features: ["Autopilot", "Glass Roof", "Premium Interior"],
  },
];

const FavoriteCarsPage = () => {
  const [favorites, setFavorites] = useState(mockFavoriteCars);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter cars based on search term
  const filteredCars = favorites.filter(
    (car) =>
      car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Remove car from favorites
  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((car) => car.id !== id));
  };

  return (
    <div className="py-8">
      <Container>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <FaHeart className="text-red-500" /> My Favorite Cars
              </h1>
              <p className="text-gray-500 mt-1">
                {favorites.length} {favorites.length === 1 ? "car" : "cars"}{" "}
                saved to your favorites
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search favorites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* No favorites message */}
          {favorites.length === 0 && (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <FaHeart className="mx-auto text-gray-300 text-5xl mb-4" />
              <h3 className="text-xl font-medium text-gray-700">
                No favorite cars yet
              </h3>
              <p className="text-gray-500 mt-2">
                Browse cars and click the heart icon to add them to your
                favorites
              </p>
              <Button className="mt-4">Browse Cars</Button>
            </div>
          )}

          {/* Favorites grid */}
          {favorites.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  {/* Car image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      width={500}
                      height={300}
                      src={car.image}
                      alt={car.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeFavorite(car.id)}
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                      title="Remove from favorites"
                    >
                      <FaTrash className="text-red-500" />
                    </button>
                  </div>

                  {/* Car details */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{car.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-semibold text-lg">
                        ${car.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500">{car.location}</span>
                    </div>

                    {/* Car specs */}
                    <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
                      <div>Year: {car.year}</div>
                      <div>Mileage: {car.mileage.toLocaleString()} mi</div>
                      <div>Fuel: {car.fuelType}</div>
                      <div>Transmission: {car.transmission}</div>
                    </div>

                    {/* Features */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {car.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {car.features.length > 3 && (
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                          +{car.features.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Action button */}
                    <Button
                      className="w-full mt-4 flex items-center justify-center gap-2"
                      variant="outline"
                    >
                      <FaEye /> View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No search results */}
          {favorites.length > 0 && filteredCars.length === 0 && (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <FaSearch className="mx-auto text-gray-300 text-5xl mb-4" />
              <h3 className="text-xl font-medium text-gray-700">
                No matching cars found
              </h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your search term
              </p>
              <Button className="mt-4" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default FavoriteCarsPage;

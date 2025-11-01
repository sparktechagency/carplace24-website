"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

const Favorites = () => {
  // Mock data for favorite cars
  const favorites = [
    {
      id: 1,
      title: "2022 Tesla Model 3",
      price: "$48,000",
      location: "San Francisco, CA",
      image: "/placeholder-car.jpg"
    },
    {
      id: 2,
      title: "2021 Porsche 911",
      price: "$112,000",
      location: "Los Angeles, CA",
      image: "/placeholder-car.jpg"
    },
    {
      id: 3,
      title: "2023 Ford Mustang",
      price: "$45,500",
      location: "Miami, FL",
      image: "/placeholder-car.jpg"
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Favorites</h2>
        <p className="text-gray-600">Your saved vehicles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((car) => (
          <div key={car.id} className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
            <div className="relative h-48">
              <Image
                src={car.image}
                alt={car.title}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='2' y='2' width='20' height='20' rx='5' ry='5'%3E%3C/rect%3E%3Cpath d='M16 2v20'%3E%3C/path%3E%3Cpath d='M22 8.5l-4-4-4 4'%3E%3C/path%3E%3Cpath d='M22 16l-4 4-4-4'%3E%3C/path%3E%3Cpath d='M8.5 2l4 4 4-4'%3E%3C/path%3E%3Cpath d='M16.5 22l-4-4-4 4'%3E%3C/path%3E%3C/svg%3E";
                }}
              />
              <button 
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-600"
                aria-label="Remove from favorites"
              >
                <FaHeart />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{car.title}</h3>
              <p className="font-semibold text-blue-600 mb-2">{car.price}</p>
              <p className="text-gray-600 text-sm mb-4">{car.location}</p>
              <Link 
                href={`/cars/${car.id}`}
                className="block w-full text-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
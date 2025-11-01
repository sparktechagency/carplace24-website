"use client";

import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

const MyCars = () => {
  // Mock data for car listings
  const listings = [
    {
      id: 1,
      title: "2021 BMW X5",
      price: "$65,000",
      location: "New York, NY",
      image: "/placeholder-car.jpg",
      status: "active",
    },
    {
      id: 2,
      title: "2020 Audi Q7",
      price: "$58,500",
      location: "Boston, MA",
      image: "/placeholder-car.jpg",
      status: "active",
    },
    {
      id: 3,
      title: "2019 Mercedes GLE",
      price: "$52,000",
      location: "Chicago, IL",
      image: "/placeholder-car.jpg",
      status: "sold",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">My Listings</h2>
          <p className="text-gray-600">Manage your vehicle listings</p>
        </div>
        <Link
          href="/add-cars"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New Listing
        </Link>
      </div>

      <div className="space-y-4">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className={`border rounded-lg overflow-hidden bg-white ${
              listing.status === "sold" ? "opacity-70" : ""
            }`}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 h-48 relative">
                <Image
                  src={listing.image}
                  alt={listing.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='2' y='2' width='20' height='20' rx='5' ry='5'%3E%3C/rect%3E%3Cpath d='M16 2v20'%3E%3C/path%3E%3Cpath d='M22 8.5l-4-4-4 4'%3E%3C/path%3E%3Cpath d='M22 16l-4 4-4-4'%3E%3C/path%3E%3Cpath d='M8.5 2l4 4 4-4'%3E%3C/path%3E%3Cpath d='M16.5 22l-4-4-4 4'%3E%3C/path%3E%3C/svg%3E";
                  }}
                />
                {listing.status === "sold" && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">SOLD</span>
                  </div>
                )}
              </div>
              <div className="p-4 md:w-3/4 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {listing.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                    <p className="font-semibold text-lg text-blue-600">
                      {listing.price}
                    </p>
                    <p>{listing.location}</p>
                    <p>
                      Status:{" "}
                      <span className="capitalize">{listing.status}</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                    <FaEdit /> Edit
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100">
                    <FaTrash /> Delete
                  </button>
                  {listing.status !== "sold" && (
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100">
                      Mark as Sold
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCars;

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaPlus,
  FaCarAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaEye,
} from "react-icons/fa";

const MyCars = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Mock data for car listings
  const allListings = [
    {
      id: 1,
      title: "2021 BMW X5",
      brand: "BMW",
      model: "X5",
      price: "$65,000",
      location: "New York, NY",
      image:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
      status: "active",
      remainingDays: 10,
      date: "2023-10-15",
      views: 245,
      inquiries: 12,
      features: ["Leather Seats", "Navigation", "Sunroof"],
    },
    {
      id: 2,
      title: "2020 Audi Q7",
      brand: "Audi",
      model: "Q7",
      price: "$58,500",
      location: "Boston, MA",
      image:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
      status: "active",
      remainingDays: 15,
      date: "2023-09-22",
      views: 187,
      inquiries: 8,
      features: ["AWD", "Premium Sound", "Heated Seats"],
    },
    {
      id: 3,
      title: "2019 Mercedes GLE",
      brand: "Mercedes",
      model: "GLE",
      price: "$52,000",
      location: "Chicago, IL",
      remainingDays: 0,
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
      status: "sold",
      date: "2023-08-10",
      views: 320,
      inquiries: 15,
      features: ["360 Camera", "Lane Assist", "Ventilated Seats"],
    },
    {
      id: 4,
      title: "2022 Tesla Model Y",
      brand: "Tesla",
      model: "Model Y",
      price: "$59,900",
      remainingDays: 20,
      location: "Miami, FL",
      image:
        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1470&auto=format&fit=crop",
      status: "pending",
      date: "2023-11-05",
      views: 412,
      inquiries: 23,
      features: ["Autopilot", "All-Electric", "Glass Roof"],
    },
  ];

  // Filter listings based on status and search term
  const filteredListings = allListings.filter((listing) => {
    const matchesStatus =
      filterStatus === "all" || listing.status === filterStatus;
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === "price-high")
      return (
        parseInt(b.price.replace(/\D/g, "")) -
        parseInt(a.price.replace(/\D/g, ""))
      );
    if (sortBy === "price-low")
      return (
        parseInt(a.price.replace(/\D/g, "")) -
        parseInt(b.price.replace(/\D/g, ""))
      );
    if (sortBy === "oldest")
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    // Default: newest first
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Calculate statistics
  const stats = {
    total: allListings.length,
    active: allListings.filter((l) => l.status === "active").length,
    sold: allListings.filter((l) => l.status === "sold").length,
    pending: allListings.filter((l) => l.status === "pending").length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "sold":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <FaCarAlt className="mr-1" />;
      case "sold":
        return <FaCheckCircle className="mr-1" />;
      case "pending":
        return <FaHourglassHalf className="mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Header with stats */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">My Cars</h2>
        <p className="text-gray-600 mb-6">Manage your car listings</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Listings</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Sold</p>
            <p className="text-2xl font-bold text-blue-600">{stats.sold}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </p>
          </div>
        </div>
      </div>

      {/* Filters and actions */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/seller/add-cars"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <FaPlus className="mr-2" /> Add New Car
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center">
            <FaFilter className="mr-2 text-gray-500" />
            <span className="mr-2 text-sm text-gray-500">Filter:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-3 py-1 text-sm rounded-full ${
                  filterStatus === "all"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus("active")}
                className={`px-3 py-1 text-sm rounded-full ${
                  filterStatus === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterStatus("pending")}
                className={`px-3 py-1 text-sm rounded-full ${
                  filterStatus === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilterStatus("sold")}
                className={`px-3 py-1 text-sm rounded-full ${
                  filterStatus === "sold"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                Sold
              </button>
            </div>
          </div>

          <div className="flex items-center ml-auto">
            <FaSortAmountDown className="mr-2 text-gray-500" />
            <span className="mr-2 text-sm text-gray-500">Sort:</span>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Listings */}
      <div className="overflow-x-auto">
        {sortedListings.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listing Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remaining
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedListings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 mr-4 relative">
                        <Image
                          src={listing.image}
                          alt={listing.title}
                          fill
                          className="rounded-md object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='2' y='2' width='20' height='20' rx='5' ry='5'%3E%3C/rect%3E%3Cpath d='M16 2v20'%3E%3C/path%3E%3Cpath d='M22 8.5l-4-4-4 4'%3E%3C/path%3E%3Cpath d='M22 16l-4 4-4-4'%3E%3C/path%3E%3Cpath d='M8.5 2l4 4 4-4'%3E%3C/path%3E%3Cpath d='M16.5 22l-4-4-4 4'%3E%3C/path%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {listing.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{listing.brand}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{listing.model}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                        listing.status
                      )}`}
                    >
                      {getStatusIcon(listing.status)} {listing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{listing.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-center text-gray-500">
                      {listing.remainingDays}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center gap-3">
                      <Link href={`/seller/my-vehicles/${listing.id}`}>
                        <button
                          className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                          title="View"
                        >
                          <FaEye />
                        </button>
                      </Link>
                      <button
                        className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
            <p className="text-gray-500 mb-4">
              No listings match your current filters
            </p>
            <button
              onClick={() => {
                setFilterStatus("all");
                setSearchTerm("");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCars;

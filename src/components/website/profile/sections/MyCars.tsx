"use client";

import CarLoader from "@/components/ui/loader/CarLoader";
import { getImageUrl } from "@/lib/getImageUrl";
import {
  useDeleteCarMutation,
  useGetMyAddedCarsQuery,
} from "@/redux/apiSlice/carSlice";
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
import moment from "moment";
import toast from "react-hot-toast";

const MyCars = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");

  const { data: getMyAddedCars, isLoading } = useGetMyAddedCarsQuery(undefined);
  const [deleteCar] = useDeleteCarMutation();

  if (isLoading)
    return (
      <div>
        <CarLoader />
      </div>
    );

  const allListings = getMyAddedCars?.data;

  // Filter listings based on status and search term
  const filteredListings = allListings.filter((listing: any) => {
    const matchesStatus =
      filterStatus === "all" || listing.status === filterStatus;
    const matchesSearch =
      listing?.basicInformation?.vehicleName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      listing?.basicInformation?.vehicleName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
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

  const handleDeleteACar = async (id: string) => {
    try {
      const res = await deleteCar(id).unwrap();
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
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
      {/* Filters and actions */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="relative grow max-w-md">
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
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remaining
                </th> */}
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
                      <div className="h-10 w-10 shrink-0 mr-4 relative">
                        <Image
                          src={getImageUrl(
                            listing?.basicInformation?.productImage?.[0],
                          )}
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
                        {listing?.basicInformation?.vehicleName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {listing?.basicInformation?.brand?.brand}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {listing?.basicInformation?.model?.model}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                        listing.status,
                      )}`}
                    >
                      {getStatusIcon(listing.status)} {listing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {moment(listing.createdAt).format("DD-MM-YYYY")}
                    </div>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-center text-gray-500">
                      {listing.remainingDays}
                    </div>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center gap-3">
                      <Link href={`/seller/my-vehicles/${listing._id}`}>
                        <button
                          className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                          title="View"
                        >
                          <FaEye />
                        </button>
                      </Link>
                      <Link href={`/seller/edit-car/${listing._id}`}>
                        <button
                          className="p-2 rounded-full cursor-pointer bg-green-50 text-green-600 hover:bg-green-100"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteACar(listing._id)}
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

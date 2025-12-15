"use client";

import { useState } from "react";
import CarLoader from "@/components/ui/loader/CarLoader";
import { useGetTestDriveRequestsQuery } from "@/redux/apiSlice/faqSlice";
import { getImageUrl } from "@/lib/getImageUrl";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";
import {
  X,
  Calendar,
  User,
  Mail,
  Phone,
  Car,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Reservation {
  _id: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    profile: string;
  };
  car: {
    _id: string;
    basicInformation: {
      vehicleName: string;
      brand: { _id: string; brand: string; image: string };
      model: { _id: string; model: string };
      vinNo: string;
      year: number;
      productImage: string[];
      RegularPrice: number;
      OfferPrice: number;
    };
  };
  name: string;
  email: string;
  contactNumber: string;
  date: string;
  status: string;
  cancelByCustomer: boolean;
}

const ITEMS_PER_PAGE = 10;

const TestDrive = () => {
  const { data: testDriveRequests, isLoading: testDriveRequestsLoading } =
    useGetTestDriveRequestsQuery(undefined);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  if (testDriveRequestsLoading) return <CarLoader />;

  const reservations = testDriveRequests?.data?.reservations || [];
  const allStatus = testDriveRequests?.data?.allStatus || [];

  // Pagination logic
  const totalPages = Math.ceil(reservations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedReservations = reservations.slice(startIndex, endIndex);

  const handleViewClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-blue-100 text-blue-700";
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-gray-100 text-gray-700";
      case "canceled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {allStatus.map((item: { status: string; count: number }) => (
          <div
            key={item.status}
            className="bg-white border rounded-lg p-3 text-center"
          >
            <p className="text-xl font-bold text-gray-800">{item.count}</p>
            <p className="text-xs text-gray-500">{item.status}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      {reservations.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg border">
          <p className="text-gray-500 text-sm">No test drive requests found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-3 py-2 text-xs font-medium text-gray-600 w-12">
                    #
                  </th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-gray-600">
                    Customer
                  </th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-gray-600">
                    Vehicle
                  </th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-gray-600">
                    Date
                  </th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {paginatedReservations.map(
                  (reservation: Reservation, index: number) => (
                    <tr key={reservation._id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-sm text-gray-600">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <Image
                            src={
                              reservation.createdBy?.profile || "/avatar.png"
                            }
                            alt={reservation.createdBy?.name || "Customer"}
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                          />
                          <div>
                            <p className="text-xs font-medium text-gray-800">
                              {reservation.createdBy?.name || reservation.name}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {reservation.createdBy?.email ||
                                reservation.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          {reservation.car?.basicInformation
                            ?.productImage?.[0] && (
                            <Image
                              src={getImageUrl(
                                reservation.car.basicInformation.productImage[0]
                              )}
                              alt={
                                reservation.car.basicInformation?.vehicleName ||
                                "Car"
                              }
                              width={48}
                              height={32}
                              className="rounded object-cover"
                            />
                          )}
                          <div>
                            <p className="text-xs font-medium text-gray-800">
                              {reservation.car?.basicInformation?.vehicleName}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {reservation.car?.basicInformation?.brand?.brand}{" "}
                              -{" "}
                              {reservation.car?.basicInformation?.model?.model}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <p className="text-xs text-gray-800">
                          {formatDate(reservation.date)}
                        </p>
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(
                            reservation.status
                          )}`}
                        >
                          {reservation.status}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <button
                          onClick={() => handleViewClick(reservation)}
                          className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
              <p className="text-xs text-gray-500">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, reservations.length)} of{" "}
                {reservations.length} entries
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1 rounded border bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-600" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-2 py-1 text-xs rounded border ${
                        currentPage === page
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded border bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="p-0 border-none max-w-2xl rounded-lg overflow-hidden bg-white">
          <div className="relative">
            <DialogClose className="absolute right-4 top-4 z-10">
              <X className="h-4 w-4 text-gray-500" />
            </DialogClose>

            {selectedReservation && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Test Drive Request Details
                </h2>

                {/* Customer Info */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-xs font-medium text-gray-600 mb-2 flex items-center gap-2">
                    <User className="h-3 w-3" /> Customer Information
                  </h3>
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        selectedReservation.createdBy?.profile || "/avatar.png"
                      }
                      alt={selectedReservation.createdBy?.name || "Customer"}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {selectedReservation.createdBy?.name ||
                          selectedReservation.name}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Mail className="h-3 w-3" />{" "}
                        {selectedReservation.createdBy?.email ||
                          selectedReservation.email}
                      </p>
                      {selectedReservation.contactNumber && (
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Phone className="h-3 w-3" />{" "}
                          {selectedReservation.contactNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-xs font-medium text-gray-600 mb-2 flex items-center gap-2">
                    <Car className="h-3 w-3" /> Vehicle Information
                  </h3>
                  <div className="flex gap-3">
                    {selectedReservation.car?.basicInformation
                      ?.productImage?.[0] && (
                      <Image
                        src={getImageUrl(
                          selectedReservation.car.basicInformation
                            .productImage[0]
                        )}
                        alt={
                          selectedReservation.car.basicInformation
                            ?.vehicleName || "Car"
                        }
                        width={100}
                        height={70}
                        className="rounded object-cover"
                      />
                    )}
                    <div className="text-xs">
                      <p className="font-medium text-gray-800">
                        {selectedReservation.car?.basicInformation?.vehicleName}
                      </p>
                      <p className="text-gray-500">
                        Brand:{" "}
                        {selectedReservation.car?.basicInformation?.brand
                          ?.brand || "N/A"}
                      </p>
                      <p className="text-gray-500">
                        Model:{" "}
                        {selectedReservation.car?.basicInformation?.model
                          ?.model || "N/A"}
                      </p>
                      <p className="text-gray-500">
                        Year:{" "}
                        {selectedReservation.car?.basicInformation?.year ||
                          "N/A"}
                      </p>
                      <p className="text-gray-500">
                        VIN:{" "}
                        {selectedReservation.car?.basicInformation?.vinNo ||
                          "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reservation Details */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-xs font-medium text-gray-600 mb-2 flex items-center gap-2">
                    <Calendar className="h-3 w-3" /> Reservation Details
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p className="font-medium text-gray-800">
                        {formatDate(selectedReservation.date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(
                          selectedReservation.status
                        )}`}
                      >
                        {selectedReservation.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-500">Price</p>
                      <p className="font-medium text-gray-800">
                        $
                        {selectedReservation.car?.basicInformation?.OfferPrice?.toLocaleString() ||
                          selectedReservation.car?.basicInformation?.RegularPrice?.toLocaleString() ||
                          "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Canceled by Customer</p>
                      <p className="font-medium text-gray-800">
                        {selectedReservation.cancelByCustomer ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestDrive;

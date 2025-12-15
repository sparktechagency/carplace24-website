"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";
import { X, Calendar, Loader2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useApplyTestDriveMutation } from "@/redux/apiSlice/carSlice";
import toast from "react-hot-toast";

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  carName: string;
  carId: string;
}

const TestDriveModal = ({
  isOpen,
  onClose,
  carName,
  carId,
}: TestDriveModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    date: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [applyTestDrive, { isLoading }] = useApplyTestDriveMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      // Format date as YYYY-MM-DD (ISO format for MongoDB)
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      setFormData((prev) => ({
        ...prev,
        date: formattedDate,
      }));
      setShowDatePicker(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      contactNumber: "",
      email: "",
      date: "",
    });
    setSelectedDate(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const body = {
        car: carId,
        name: formData.name,
        email: formData.email,
        date: formData.date,
        contactNumber: formData.contactNumber,
      };

      await applyTestDrive(body).unwrap();
      toast.success("Test drive appointment booked successfully!");
      resetForm();
      onClose();
    } catch (error: any) {
      console.error("Test drive error:", error);
      toast.error(
        error?.data?.message || "Failed to book test drive. Please try again."
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="p-0 border-none max-w-2xl rounded-lg overflow-visible bg-white ">
        <div className="relative">
          <DialogClose className="absolute right-4 top-4 z-10">
            <X className="h-4 w-4 text-gray-500" />
          </DialogClose>

          <div className="p-6">
            <h2 className="text-2xl font-medium text-gray-800">Test Drive</h2>
            <p className="text-sm text-gray-500 mt-1">
              Book a test drive for{" "}
              <span className="font-medium">{carName}</span>
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    placeholder="Enter your phone number"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Type your email"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="date"
                      name="date"
                      placeholder="Select a date"
                      className="w-full p-3 border border-gray-300 rounded-md pr-10"
                      value={formData.date}
                      readOnly
                      required
                      onClick={() => setShowDatePicker(true)}
                    />
                    <div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowDatePicker(true)}
                    >
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    {showDatePicker && (
                      <div className="absolute left-0 top-full z-50 mt-1 bg-white shadow-lg rounded-md border">
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          inline
                          minDate={new Date()}
                          onClickOutside={() => setShowDatePicker(false)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Confirm Test Drive"
                )}
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestDriveModal;

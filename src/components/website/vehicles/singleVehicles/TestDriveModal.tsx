"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";
import { X, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  carName: string;
}

const TestDriveModal = ({ isOpen, onClose, carName }: TestDriveModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    date: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        date: date.toLocaleDateString(),
      }));
      setShowDatePicker(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Test drive appointment:", formData);
    onClose();
  };

  console.log(carName);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="p-0 border-none max-w-2xl rounded-lg overflow-hidden bg-white ">
        <div className="relative">
          <DialogClose className="absolute right-4 top-4 z-10">
            <X className="h-4 w-4 text-gray-500" />
          </DialogClose>

          <div className="p-6">
            <h2 className="text-2xl font-medium text-gray-800">Test Drive</h2>
            <p className="text-sm text-gray-500 mt-1">
              you can set a appointment for test drive
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
                      onChange={handleChange}
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
                      <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-md">
                        <DatePicker
                          selected={
                            formData.date ? new Date(formData.date) : null
                          }
                          onChange={handleDateChange}
                          inline
                          onClickOutside={() => setShowDatePicker(false)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md font-medium"
              >
                Confirm Test Drive
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestDriveModal;

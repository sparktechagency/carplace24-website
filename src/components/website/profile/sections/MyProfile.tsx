"use client";

import { useUserUpdateMutation } from "@/redux/apiSlice/authSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { getImageUrl } from "@/lib/getImageUrl";

const MyProfile = ({ userDetails }: { userDetails: any }) => {
  const [formData, setFormData] = useState({
    name:
      userDetails?.name ||
      `${userDetails?.firstName || ""} ${userDetails?.lastName || ""}`.trim() ||
      "N/A",
    email: userDetails?.email || "N/A",
    mobileNumber: userDetails?.mobileNumber || "N/A",
    address: userDetails?.address || "N/A",
    gender: userDetails?.gender || "N/A",
    dateOfBirth: userDetails?.dateOfBirth || "N/A",
    city: userDetails?.city || "N/A",
    zipCode: userDetails?.zipCode || "N/A",
    country: userDetails?.country || "N/A",
  });

  const [userUpdate, { isLoading }] = useUserUpdateMutation();

  const [tradeLicences, setTradeLicences] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const existingTradeLicenceRaw =
    (userDetails?.tradeLicences ??
      userDetails?.tradeLicense ??
      userDetails?.tradeLicenseUrl ??
      userDetails?.tradeLicenses ??
      userDetails?.trade_license) ||
    "";
  const existingTradeLicence = Array.isArray(existingTradeLicenceRaw)
    ? String(existingTradeLicenceRaw[0] || "")
    : String(existingTradeLicenceRaw || "");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const fd = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "gender") {
          fd.append("gender", value);
          return;
        }
        const val = value === "N/A" ? "" : String(value ?? "");
        if (val === "") return;
        fd.append(key, val);
      });
      if (tradeLicences) {
        fd.append("tradeLicences", tradeLicences);
      }
      const res = await userUpdate(fd).unwrap();
      const msg = (res as any)?.message || "Profile updated successfully";
      toast.success(msg);
    } catch (err: any) {
      const msg = err?.data?.message || "Failed to update profile";
      toast.error(msg);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">My Profile</h2>
        <p className="text-gray-600">Manage your personal information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="tradeLicences"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Trade Licences
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) setTradeLicences(file);
                setIsDragging(false);
              }}
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
            >
              <input
                type="file"
                id="tradeLicences"
                name="tradeLicences"
                accept="image/*,.pdf"
                onChange={(e) => setTradeLicences(e.target.files?.[0] || null)}
                className="hidden"
              />
              <label
                htmlFor="tradeLicences"
                className="flex flex-col cursor-pointer items-center gap-2 select-none"
              >
                <span className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </span>
                <span className="text-xs text-gray-500">PNG, JPG or PDF</span>
              </label>
              {!tradeLicences && existingTradeLicence && (
                <div className="mt-3">
                  {existingTradeLicence.toLowerCase().endsWith(".pdf") ? (
                    <a
                      href={getImageUrl(existingTradeLicence)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 underline"
                    >
                      View current trade licence (PDF)
                    </a>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Image
                        src={getImageUrl(existingTradeLicence)}
                        alt="Trade Licence"
                        width={160}
                        height={100}
                        className="rounded-md border object-cover max-h-40"
                      />
                    </div>
                  )}
                </div>
              )}
              {tradeLicences && (
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-xs text-gray-700 truncate max-w-[70%]">
                    {tradeLicences.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTradeLicences(null)}
                    className="px-2 py-1 text-xs border rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;

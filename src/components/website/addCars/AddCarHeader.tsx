"use client";

import { FileUp } from "lucide-react";
import { ChangeEvent } from "react";

interface AddCarHeaderProps {
  isDealer: boolean;
  isUploadingBulk: boolean;
  handleBulkUpload: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  fileInputRef: any;
}

const AddCarHeader = ({
  isDealer,
  isUploadingBulk,
  handleBulkUpload,
  fileInputRef,
}: AddCarHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Vehicle</h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the details below to list your vehicle
          </p>
        </div>

        {/* Bulk Upload Button - Only for Dealers */}
        {isDealer && (
          <div>
            <input
              type="file"
              ref={(ref) => (fileInputRef as any)(ref)}
              onChange={handleBulkUpload}
              accept=".xlsx,.xls,.csv"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => {
                const input = document.querySelector(
                  'input[type="file"]',
                ) as HTMLInputElement;
                input?.click();
              }}
              disabled={isUploadingBulk}
              className={`flex items-center cursor-pointer gap-2 px-4 py-2.5 ${
                isUploadingBulk
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
            >
              <FileUp className="w-5 h-5" />
              {isUploadingBulk ? "Uploading..." : "Bulk Upload (Excel)"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCarHeader;

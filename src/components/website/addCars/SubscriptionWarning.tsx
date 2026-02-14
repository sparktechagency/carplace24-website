"use client";

import { useRouter } from "next/navigation";

interface SubscriptionWarningProps {
  showSubWarning: boolean;
}

const SubscriptionWarning = ({ showSubWarning }: SubscriptionWarningProps) => {
  const router = useRouter();

  if (!showSubWarning) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-[95%] max-w-md rounded-lg shadow-lg border">
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2">Subscription Required</h3>
          <p className="text-sm text-gray-600">
            You are not subscribed. Please purchase a package to add cars.
          </p>
          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              className="px-3 py-2 cursor-pointer text-sm border rounded-md hover:bg-gray-50"
              onClick={() => router.push("/")}
            >
              Go to Home
            </button>
            <button
              type="button"
              className="px-4 py-2 cursor-pointer text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => router.push("/pricing?buy=1&from=add-cars")}
            >
              Go to Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionWarning;

"use client";

import Link from "next/link";

export default function SubscriptionSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6 text-center">
        <h1 className="text-2xl font-bold text-green-600">Subscription Successful</h1>
        <p className="mt-2 text-gray-600">
          Your subscription has been activated. You can now add cars.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/seller/add-cars"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Go to Add Cars
          </Link>
          <Link
            href="/pricing"
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Back to Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}


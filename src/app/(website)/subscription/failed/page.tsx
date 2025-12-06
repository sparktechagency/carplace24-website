"use client";

import Link from "next/link";

export default function SubscriptionFailedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">Subscription Failed</h1>
        <p className="mt-2 text-gray-600">
          The payment was not completed. Please try again or choose another plan.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/pricing?buy=1"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Pricing
          </Link>
          <Link
            href="/"
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}


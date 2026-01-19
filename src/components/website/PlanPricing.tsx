"use client";

import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  useCreateSubscriptionCheckoutMutation,
  useGetAllSubscriptionsQuery,
} from "@/redux/apiSlice/subscriptionSlice";
import CarLoader from "@/components/ui/loader/CarLoader";

// Feature labels for the pricing table
const FEATURE_LABELS = [
  "Description",
  "Number of vehicles",
  "Duration of listing",
  "Online immediately",
  "Visible to everyone",
  "Number of images",
] as const;

type FeatureLabel = (typeof FEATURE_LABELS)[number];
type TabType = "private" | "dealer";

interface Plan {
  _id: string;
  title?: string;
  description?: string;
  price?: number;
  duration?: string;
  carLimit?: number;
  OnlineImmediately?: boolean;
  VisibleToEveryone?: boolean;
  targetRole?: string;
}

const PlanPricing = () => {
  const [activeTab, setActiveTab] = useState<TabType>("private");
  const searchParams = useSearchParams();
  const showBuy = searchParams.get("buy") === "1";

  const { data: subscriptions, isLoading } =
    useGetAllSubscriptionsQuery(undefined);

  const [createSubscriptionCheckout] = useCreateSubscriptionCheckoutMutation();
  const [creatingId, setCreatingId] = useState<string | null>(null);

  if (isLoading) {
    return <CarLoader />;
  }

  const subscriptionData: Plan[] = subscriptions?.data || [];

  const normalizeRole = (role?: string): TabType => {
    const v = String(role || "").toUpperCase();
    if (v.includes("SELLER")) return "private";
    if (v.includes("DEALER") || v.includes("DELEAR")) return "dealer";
    return "private";
  };

  const plans = subscriptionData
    .filter((p) => normalizeRole(p?.targetRole) === activeTab)
    .sort((a, b) =>
      String(a?.title || "").localeCompare(String(b?.title || "")),
    );

  const getPricing = (plan: Plan): string => {
    const duration = String(plan?.duration || "-").replace(/day(s)?/i, "days");
    const priceNum =
      typeof plan?.price === "number"
        ? plan.price.toFixed(2)
        : plan?.price || "-";
    return `${duration} / ${priceNum} CHF`;
  };

  const getFeatureValue = (
    plan: Plan,
    label: FeatureLabel,
  ): string | boolean | number => {
    switch (label) {
      case "Number of vehicles":
        return plan?.carLimit ?? "-";
      case "Duration of listing":
        return plan?.duration ?? "-";
      case "Online immediately":
        return Boolean(plan?.OnlineImmediately);
      case "Visible to everyone":
        return Boolean(plan?.VisibleToEveryone);
      case "Number of images":
        return "-";
      case "Description":
        return plan?.description ?? "-";
      default:
        return "-";
    }
  };

  const renderValue = (value: string | boolean | number) => {
    if (typeof value === "boolean") {
      return value ? (
        <FaCheck className="text-green-500 mx-auto" />
      ) : (
        <span className="text-gray-300">-</span>
      );
    }
    return value;
  };

  const handleBuy = async (plan: Plan, planIndex: number) => {
    const id = String(plan?._id || planIndex);
    if (creatingId && creatingId !== id) {
      toast.error("Another purchase is processing. Please wait.");
      return;
    }
    setCreatingId(id);
    try {
      const res: any = await createSubscriptionCheckout({
        packageId: plan?._id,
      }).unwrap();
      const url = res?.data?.checkoutUrl || res?.checkoutUrl;
      if (url && typeof url === "string") {
        window.location.assign(url);
      } else {
        toast.error("Failed to get checkout URL");
        setCreatingId(null);
      }
    } catch (err: any) {
      const msg = err?.data?.message || "Failed to create checkout";
      toast.error(msg);
      setCreatingId(null);
    }
  };

  // Calculate grid columns based on plans count (labels column + plan columns)
  const gridColumns = plans.length + 1;

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      {/* Tabs */}
      <div className="flex justify-center mb-8 px-4">
        <div
          className="flex w-full max-w-[400px] rounded-md shadow-sm"
          role="group"
        >
          <button
            type="button"
            className={`flex-1 py-2 text-sm cursor-pointer font-medium border ${
              activeTab === "private"
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            } rounded-l-lg focus:z-10 focus:outline-none`}
            onClick={() => setActiveTab("private")}
          >
            Private Seller
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-sm cursor-pointer font-medium border ${
              activeTab === "dealer"
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            } rounded-r-lg focus:z-10 focus:outline-none`}
            onClick={() => setActiveTab("dealer")}
          >
            Dealer
          </button>
        </div>
      </div>

      {/* Pricing Grid - using inline style for dynamic columns on desktop */}
      <div
        className="grid grid-cols-1 gap-6"
        style={{
          gridTemplateColumns: undefined,
        }}
      >
        <style jsx>{`
          @media (min-width: 1024px) {
            div {
              grid-template-columns: repeat(${gridColumns}, minmax(0, 1fr));
            }
          }
        `}</style>

        {/* Desktop: First column - Feature labels */}
        <div className="hidden lg:block border rounded-lg overflow-hidden shadow-sm">
          {/* Placeholder for the title row */}
          <div className="h-[60px]"></div>
          {/* Price row */}
          <div className="h-[60px] flex items-center px-5 border-t">Price</div>
          {/* Feature rows */}
          {FEATURE_LABELS.map((label, index) => (
            <div
              key={`feature-${index}`}
              className={`h-[80px] flex px-5 items-center ${
                index % 2 === 0 ? "bg-gray-100" : ""
              }`}
            >
              <span className="text-gray-700">{label}</span>
            </div>
          ))}
          {/* Empty space for the Buy button */}
          <div className="h-[60px]"></div>
        </div>

        {/* Plan Cards */}
        {plans.map((plan, planIndex) => (
          <div
            key={plan?._id || planIndex}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            {/* Plan Header */}
            <div className="relative">
              <div className="bg-white p-4 text-center">
                <h3 className="text-primary font-bold text-xl mb-2">
                  {String(plan?.title || "-")}
                </h3>
              </div>
              <div className="bg-primary text-white p-3 text-center">
                <p className="font-medium">{getPricing(plan)}</p>
              </div>
            </div>

            {/* Mobile & Tablet: Feature list with labels */}
            <div className="lg:hidden pt-3">
              {FEATURE_LABELS.map((label, index) => {
                const isDescription = label === "Description";
                const value = getFeatureValue(plan, label);

                return (
                  <div
                    key={`mobile-${planIndex}-${index}`}
                    className={`py-3 px-5 ${
                      isDescription
                        ? "min-h-[80px] flex flex-col gap-2"
                        : "h-[80px] flex justify-between items-center"
                    } ${index % 2 === 0 ? "bg-gray-100" : ""}`}
                  >
                    <span className="text-gray-700 shrink-0">{label}</span>
                    <span
                      className={`font-medium ${isDescription ? "text-sm leading-relaxed" : ""}`}
                    >
                      {renderValue(value)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Desktop: Feature values only (labels are in first column) */}
            <div className="hidden lg:block pt-3">
              {FEATURE_LABELS.map((label, index) => (
                <div
                  key={`desktop-${planIndex}-${index}`}
                  className={`h-[80px] px-2 flex items-center justify-center ${
                    index % 2 === 0 ? "bg-gray-100" : ""
                  }`}
                >
                  <span className="font-medium">
                    {renderValue(getFeatureValue(plan, label))}
                  </span>
                </div>
              ))}
            </div>

            {/* Buy Button Row */}
            <div className="h-[60px] flex items-center justify-center border-t">
              {showBuy && (
                <button
                  onClick={() => handleBuy(plan, planIndex)}
                  disabled={creatingId === String(plan?._id || planIndex)}
                  className={`px-4 cursor-pointer py-2 ${
                    creatingId === String(plan?._id || planIndex)
                      ? "bg-gray-400"
                      : "bg-primary"
                  } text-white rounded`}
                >
                  {creatingId === String(plan?._id || planIndex)
                    ? "Processing..."
                    : "Buy"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanPricing;

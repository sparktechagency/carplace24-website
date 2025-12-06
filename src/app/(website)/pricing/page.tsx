import PlanPricing from "@/components/website/PlanPricing";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div className="p-6">Loading pricing...</div>}>
      <PlanPricing />
    </Suspense>
  );
};

export default page;

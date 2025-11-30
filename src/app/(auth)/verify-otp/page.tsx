import { Suspense } from "react";
import VerifyOtpClient from "@/app/(auth)/verify-otp/VerifyOtpClient";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpClient />
    </Suspense>
  );
}

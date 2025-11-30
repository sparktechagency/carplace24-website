"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useOtpVerifyMutation } from "@/redux/apiSlice/authSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOtpPage() {
  const [verify, { isLoading }] = useOtpVerifyMutation();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "register";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("verifyEmail") || "";
      setEmail(saved);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Verify OTP</h1>
        <p className="text-sm text-muted-foreground">
          Enter the code sent to your email
        </p>
      </div>
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await verify({ email, oneTimeCode: otp }).unwrap();
            if (res?.success) {
              if (from === "forgot") {
                const token = res?.data || "";
                localStorage.setItem("Authorization", token);
                toast.success("OTP verified");
                if (typeof window !== "undefined") {
                  sessionStorage.removeItem("verifyEmail");
                }
                router.replace("/reset-password");
              } else {
                toast.success("Email verified");
                if (typeof window !== "undefined") {
                  sessionStorage.removeItem("verifyEmail");
                }
                router.replace("/login");
              }
            } else {
              toast.error(res?.message || "Verification failed");
            }
          } catch (err: any) {
            toast.error(err?.data?.message || "Verification failed");
          }
        }}
      >
        <div className="space-y-2">
          <label className="text-sm" htmlFor="otp">
            Verification Code
          </label>
          <input
            id="otp"
            type="text"
            placeholder="123456"
            className="w-full h-10 rounded-md border px-3 outline-none tracking-widest"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <Link
            href={from === "forgot" ? "/forgot-password" : "/register"}
            className="text-primary"
          >
            Resend code
          </Link>
          {from === "forgot" && (
            <Link href="/reset-password" className="text-primary">
              Reset password
            </Link>
          )}
        </div>
        <Button type="submit" className="w-full h-10" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </form>
    </div>
  );
}

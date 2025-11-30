"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForgotPasswordMutation } from "@/redux/apiSlice/authSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Forgot Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to receive a reset link
        </p>
      </div>
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await forgotPassword({ email }).unwrap();
            if (res?.success) {
              toast.success("OTP sent to your email");
              if (typeof window !== "undefined") {
                sessionStorage.setItem("verifyEmail", email);
              }
              router.replace("/verify-otp?from=forgot");
            } else {
              toast.error(res?.message || "Failed to send OTP");
            }
          } catch (err: any) {
            toast.error(err?.data?.message || "Failed to send OTP");
          }
        }}
      >
        <div className="space-y-2">
          <label className="text-sm" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full h-10 rounded-md border px-3 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <Link href="/login" className="text-primary">
            Back to login
          </Link>
          <Link href="/verify-otp" className="text-primary">
            Verify OTP
          </Link>
        </div>
        <Button type="submit" className="w-full h-10" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send reset link"}
        </Button>
      </form>
    </div>
  );
}

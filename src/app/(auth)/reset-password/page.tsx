"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useResetPasswordMutation } from "@/redux/apiSlice/authSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [reset, { isLoading }] = useResetPasswordMutation();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Reset Password</h1>
        <p className="text-sm text-muted-foreground">Choose a new password</p>
      </div>
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (password !== confirm) {
            toast.error("Passwords do not match");
            return;
          }
          try {
            const res = await reset({
              newPassword: password,
              confirmPassword: confirm,
            }).unwrap();
            if (res?.success) {
              toast.success("Password reset successfully");
              router.replace("/login");
            } else {
              toast.error(res?.message || "Reset failed");
            }
          } catch (err: any) {
            toast.error(err?.data?.message || "Reset failed");
          }
        }}
      >
        <div className="space-y-2">
          <label className="text-sm" htmlFor="password">
            New Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full h-10 rounded-md border px-3 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm" htmlFor="confirm">
            Confirm Password
          </label>
          <input
            id="confirm"
            type="password"
            placeholder="••••••••"
            className="w-full h-10 rounded-md border px-3 outline-none"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>
        <div className="text-sm text-center">
          <Link href="/login" className="text-primary">
            Back to login
          </Link>
        </div>
        <Button type="submit" className="w-full h-10" disabled={isLoading}>
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}

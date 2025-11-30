"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRegisterMutation } from "@/redux/apiSlice/authSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [register, { isLoading }] = useRegisterMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Create Account</h1>
        <p className="text-sm text-muted-foreground">
          Join Carplace24 to manage your listings
        </p>
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
            const body = { name, email, role: "BUYER", password };
            const res = await register(body).unwrap();
            if (res?.success) {
              toast.success("Account created successfully");
              if (typeof window !== "undefined") {
                sessionStorage.setItem("verifyEmail", email);
              }
              router.replace("/verify-otp?from=register");
            } else {
              toast.error(res?.message || "Registration failed");
            }
          } catch (err: any) {
            toast.error(err?.data?.message || "Registration failed");
          }
        }}
      >
        <div className="space-y-2">
          <label className="text-sm" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className="w-full h-10 rounded-md border px-3 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="space-y-2">
          <label className="text-sm" htmlFor="password">
            Password
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
          <span>Already have an account? </span>
          <Link href="/login" className="text-primary">
            Sign in
          </Link>
        </div>
        <Button type="submit" className="w-full h-10" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </div>
  );
}

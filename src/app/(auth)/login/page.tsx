"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/apiSlice/authSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = {
        email,
        password,
      };
      const res = await login(data).unwrap();
      if (res?.success) {
        toast.success("Logged in successfully");
        const { accessToken } = res?.data || {};
        const isHttps =
          typeof window !== "undefined" &&
          window.location.protocol === "https:";
        document.cookie = `accessToken=${
          accessToken || ""
        }; Path=/; SameSite=Lax; Max-Age=604800${isHttps ? "; Secure" : ""}`;
        router.replace("/profile");
      } else {
        toast.error(res?.message || "Login failed");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to continue
        </p>
      </div>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(email, password);
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
        <div className="space-y-2">
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full h-10 rounded-md border px-3 pr-10 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <Link href="/forgot-password" className="text-primary">
            Forgot password?
          </Link>
          <Link href="/register" className="text-primary">
            Create account
          </Link>
        </div>
        {message && <p className="text-sm text-red-500">{message}</p>}
        <Button type="submit" className="w-full h-10" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}

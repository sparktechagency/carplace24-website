"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  label: string;
  className?: string;
  mobileView?: boolean;
}

export default function NavItem({
  href,
  label,
  className,
  mobileView = false,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "font-medium transition-all duration-200",
        mobileView
          ? cn(
              "w-full py-2 px-6 rounded-xl flex items-center justify-center text-center text-base",
              isActive
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-primary border border-transparent",
            )
          : cn(
              "transition-colors",
              isActive ? "text-primary" : "text-gray-600 hover:text-primary",
            ),
        className,
      )}
    >
      {label}
    </Link>
  );
}

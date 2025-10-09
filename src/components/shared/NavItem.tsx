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
        "font-medium transition-colors duration-200",
        isActive ? "text-primary" : "hover:text-primary",
        mobileView ? "" : "",
        className
      )}
    >
      {label}
    </Link>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

export function Pagination({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mt-8 flex items-center justify-center w-full", className)}
      {...props}
    />
  );
}

export function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return <ul className={cn("flex items-center gap-2", className)} {...props} />;
}

export function PaginationItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return <li className={cn("", className)} {...props} />;
}

export function PaginationLink({
  className,
  isActive,
  ...props
}: React.ComponentProps<"a"> & { isActive?: boolean }) {
  return (
    <a
      className={cn(
        "inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-md border bg-white px-3 py-2 text-sm",
        "hover:bg-gray-50",
        isActive && "bg-primary text-white border-primary",
        className
      )}
      {...props}
    />
  );
}

export function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md border bg-white px-3 py-2 text-sm hover:bg-gray-50",
        className
      )}
      {...props}
    >
      Previous
    </a>
  );
}

export function PaginationNext({
  className,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md border bg-white px-3 py-2 text-sm hover:bg-gray-50",
        className
      )}
      {...props}
    >
      Next
    </a>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import logo from "@/assets/Carplace24Logo.png";
import Image from "next/image";
import Link from "next/link";
import NavItem from "./NavItem";
import { navItems } from "./navData";
import compareIcon from "@/assets/compareIcone.png";
import heartIcon from "@/assets/heart.png";
import addCarIcon from "@/assets/addCarIcon.png";
import { useProfileQuery } from "@/redux/apiSlice/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  useGetCompareCarsQuery,
  useGetBookmarkCarsQuery,
} from "@/redux/apiSlice/compareSlice";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

  const { data: userDetails, isLoading } = useProfileQuery(undefined);
  const { data: compareData } = useGetCompareCarsQuery(undefined);
  const { data: bookmarkData } = useGetBookmarkCarsQuery(undefined);

  const user = userDetails?.data;
  const compareItems = (compareData?.data || compareData?.items || []) as any[];
  const compareCount = Array.isArray(compareItems)
    ? compareItems.length
    : Number(
        (compareData as any)?.data?.count || (compareData as any)?.count || 0
      ) || 0;

  const favoriteItems =
    (bookmarkData as any)?.data?.data ||
    (bookmarkData as any)?.data ||
    (bookmarkData as any)?.items ||
    (bookmarkData as any)?.bookmarks ||
    (bookmarkData as any)?.results ||
    [];
  const favoriteCount = Array.isArray(favoriteItems)
    ? favoriteItems.length
    : Number(
        (bookmarkData as any)?.data?.count ||
          (bookmarkData as any)?.count ||
          (bookmarkData as any)?.data?.total ||
          0
      ) || 0;

  const router = useRouter();

  const handleLogout = () => {
    const isHttps =
      typeof window !== "undefined" && window.location.protocol === "https:";
    document.cookie = `accessToken=; Path=/; Max-Age=0; SameSite=Lax${
      isHttps ? "; Secure" : ""
    }`;
    toast.success("Logged out");
    setIsProfileDropdownOpen(false);
    router.push("/login");
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Close profile dropdown when clicking outside
      if (
        isProfileDropdownOpen &&
        !target.closest(".profile-dropdown-container")
      ) {
        setIsProfileDropdownOpen(false);
      }
      // Close search dropdown when clicking outside
      if (
        isSearchDropdownOpen &&
        !target.closest(".search-dropdown-container")
      ) {
        setIsSearchDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsProfileDropdownOpen(false);
        setIsSearchDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileDropdownOpen, isSearchDropdownOpen]);

  return (
    <header className="w-full py-4 bg-gray-50 fixed top-0 left-0 z-50 overflow-visible">
      <div className="w-[1350px] mx-auto flex items-center justify-between px-4 overflow-visible">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Carplace24 Logo" width={120} height={100} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          {navItems.map((item, index) => (
            <React.Fragment key={item.href}>
              {item.label === "Search" ? (
                <div className="relative search-dropdown-container">
                  <button
                    type="button"
                    className={`font-medium transition-colors cursor-pointer duration-200 hover:text-primary ${
                      isSearchDropdownOpen ? "text-primary" : ""
                    }`}
                    onClick={() => setIsSearchDropdownOpen((p) => !p)}
                  >
                    {item.label}
                  </button>
                  <div
                    aria-expanded={isSearchDropdownOpen}
                    className={`absolute left-0 top-full mt-3 w-[720px] max-w-[85vw] bg-white border border-gray-200 rounded-lg shadow-lg p-6 z-50 transform transition-all duration-200 ease-out ${
                      isSearchDropdownOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-gray-800 font-semibold mb-3">
                          Vehicles
                        </h3>
                        <div className="space-y-2">
                          <Link
                            href="/vehicles"
                            onClick={() => setIsSearchDropdownOpen(false)}
                            className="block text-gray-700 hover:text-primary"
                          >
                            Simple Search
                          </Link>
                          <Link
                            href="/advanced-search"
                            onClick={() => setIsSearchDropdownOpen(false)}
                            className="block text-gray-700 hover:text-primary"
                          >
                            Advanced Search
                          </Link>
                          <Link
                            href="/compare"
                            onClick={() => setIsSearchDropdownOpen(false)}
                            className="block text-gray-700 hover:text-primary"
                          >
                            Comparison Tool
                          </Link>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-gray-800 font-semibold mb-3">
                          Dealers
                        </h3>
                        <div className="space-y-2">
                          <Link
                            href="/dealers"
                            onClick={() => setIsSearchDropdownOpen(false)}
                            className="block text-gray-700 hover:text-primary"
                          >
                            Search Dealers
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <NavItem href={item.href} label={item.label} />
              )}
              {index < navItems.length - 1 && (
                <div className="h-5 w-px bg-gray-300 mx-4"></div>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Link href={"/compare"}>
              <Button
                variant="ghost"
                size="icon"
                className="relative cursor-pointer"
              >
                <Image
                  src={compareIcon}
                  alt="User Profile"
                  width={7567557}
                  height={7557724}
                  className="relative w-[30px] cursor-pointer"
                />
                {compareCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] leading-none rounded-full px-1.5 h-4 min-w-[16px] flex items-center justify-center">
                    {compareCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href={"/favorites"}>
              {" "}
              <Button
                variant="ghost"
                size="icon"
                className="relative cursor-pointer"
              >
                <Image
                  src={heartIcon}
                  alt="User Profile"
                  width={5766724}
                  height={5656724}
                  className="relative w-[27px] cursor-pointer"
                />
                {favoriteCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] leading-none rounded-full px-1.5 h-4 min-w-[16px] flex items-center justify-center">
                    {favoriteCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href={"/seller/add-cars"}>
              <Button
                variant="ghost"
                size="icon"
                className="relative w-[50px] cursor-pointer"
              >
                <Image
                  src={addCarIcon}
                  alt="User Profile"
                  width={6866543}
                  height={67678543}
                  className="object-cover w-[45px] h-[30px]"
                />
              </Button>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <select className="bg-transparent border-none outline-none font-medium text-gray-700 cursor-pointer">
              <option value="en">EN</option>
              <option value="de">DE</option>
              <option value="fr">FR</option>
            </select>
            {user ? (
              <div className="flex items-center space-x-2 relative profile-dropdown-container">
                <div
                  className="flex items-center space-x-2"
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                >
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                    <span className="text-sm font-medium">
                      {(
                        user?.name?.[0] ||
                        user?.email?.[0] ||
                        "U"
                      ).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-col cursor-pointer">
                    <span className="text-sm font-medium">
                      {user?.name || user?.email}
                    </span>
                    <span className="text-xs text-gray-500">
                      {user?.role || "User"}
                    </span>
                  </div>
                </div>

                {isProfileDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-72 p-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 transform -translate-x-0">
                    <div className="border-t border-gray-100">
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <button className="w-full cursor-pointer border-y border-gray-100 text-left px-4 py-3 hover:bg-gray-50 transition-colors">
                          <span className="text-gray-800 font-medium">
                            My Profile
                          </span>
                        </button>
                      </Link>
                      <Link
                        href="/terms-and-conditions"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <button className="w-full cursor-pointer border-y border-gray-100 text-left px-4 py-3 hover:bg-gray-50 transition-colors">
                          <span className="text-gray-800 font-medium">
                            Terms & Conditions
                          </span>
                        </button>
                      </Link>
                      <Link
                        href="/privacy-policy"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <button className="w-full cursor-pointer border-y border-gray-100 text-left px-4 py-3 hover:bg-gray-50 transition-colors">
                          <span className="text-gray-800 font-medium">
                            Privacy Policy
                          </span>
                        </button>
                      </Link>
                      <button
                        className="w-full cursor-pointer text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={handleLogout}
                      >
                        <span className="text-gray-800 font-medium">
                          Log out
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <button className="border cursor-pointer border-[#007bff] text-[#007bff] px-4 py-2 rounded-md hover:bg-[#007bff] hover:text-white transition-colors">
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-white border-t">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                mobileView={true}
              />
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between">
            <Button variant="ghost" className="font-medium">
              EN
            </Button>
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {(user?.name?.[0] || user?.email?.[0] || "U").toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {user?.name || user?.email}
                  </span>
                  <span className="text-xs text-gray-500">
                    {user?.role || "User"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button className="h-9">Login</Button>
                </Link>
                <Link href="/register" className="text-sm text-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

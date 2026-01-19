"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import logo from "@/assets/Carplace24Logo.png";
import Image from "next/image";
import Link from "next/link";
import NavItem from "./NavItem";
import { navItems } from "./navData";
import compareIcon from "@/assets/compareIcone.png";
import heartIcon from "@/assets/heart.png";
import addCarIcon from "@/assets/addCarIcon.png";
import { useProfileQuery } from "@/redux/apiSlice/authSlice";
import { logout } from "@/lib/logout";
import {
  useGetCompareCarsQuery,
  useGetBookmarkCarsQuery,
} from "@/redux/apiSlice/compareSlice";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

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
        (compareData as any)?.data?.count || (compareData as any)?.count || 0,
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
          0,
      ) || 0;

  const handleLogout = (): void => {
    logout("/login");
  };

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
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
      <div className="w-full max-w-[1350px] mx-auto flex items-center justify-between px-4 overflow-visible">
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
            {/* <select className="bg-transparent border-none outline-none font-medium text-gray-700 cursor-pointer">
              <option value="en">EN</option>
              <option value="de">DE</option>
              <option value="fr">FR</option>
            </select> */}
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
                  <div className="absolute top-full right-0 mt-2 w-72 p-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 transform translate-x-0">
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
          className="md:hidden z-50 relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? null : <Menu className="h-6 w-6 text-gray-700" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl z-50 md:hidden flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  <Image
                    src={logo}
                    alt="Carplace24 Logo"
                    width={100}
                    height={80}
                  />
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              <div className="flex-1 py-4 px-2">
                <nav className="flex flex-col space-y-1">
                  {navItems.map((item) => (
                    <div key={item.href} onClick={() => setIsMenuOpen(false)}>
                      <NavItem
                        href={item.href}
                        label={item.label}
                        mobileView={true}
                      />
                    </div>
                  ))}
                </nav>

                <div className="mt-6 px-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Account
                  </h3>
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-semibold text-primary">
                            {(
                              user?.name?.[0] ||
                              user?.email?.[0] ||
                              "U"
                            ).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-medium truncate">
                            {user?.name || user?.email}
                          </span>
                          <span className="text-xs text-gray-500 capitalize">
                            {user?.role || "User"}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/profile"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Button variant="outline" className="w-full text-xs">
                            Profile
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="w-full text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Button className="w-full">Register</Button>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="mt-6 px-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Quick Links
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Link href="/compare" onClick={() => setIsMenuOpen(false)}>
                      <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="relative">
                          <Image
                            src={compareIcon}
                            alt="Compare"
                            width={24}
                            height={24}
                          />
                          {compareCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                              {compareCount}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] mt-1 text-gray-600">
                          Compare
                        </span>
                      </div>
                    </Link>
                    <Link
                      href="/favorites"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="relative">
                          <Image
                            src={heartIcon}
                            alt="Favorites"
                            width={24}
                            height={24}
                          />
                          {favoriteCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                              {favoriteCount}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] mt-1 text-gray-600">
                          Saved
                        </span>
                      </div>
                    </Link>
                    <Link
                      href="/seller/add-cars"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <Image
                          src={addCarIcon}
                          alt="Sell"
                          width={24}
                          height={24}
                        />
                        <span className="text-[10px] mt-1 text-gray-600">
                          Sell
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isProfileDropdownOpen &&
        !target.closest(".profile-dropdown-container")
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  return (
    <header className="w-full py-4 shadow-sm bg-gray-50 fixed top-0 left-0 z-50 overflow-visible">
      <div className="container mx-auto flex items-center justify-between px-4 overflow-visible">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Carplace24 Logo" width={120} height={100} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          {navItems.map((item, index) => (
            <React.Fragment key={item.href}>
              <NavItem href={item.href} label={item.label} />
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
                  width={24}
                  height={24}
                />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="relative cursor-pointer"
            >
              <Image
                src={heartIcon}
                alt="User Profile"
                width={24}
                height={24}
              />
            </Button>
            <Link href={"/seller/add-cars"}>
              <Button
                variant="ghost"
                size="icon"
                className="relative w-[50px] cursor-pointer"
              >
                <Image
                  src={addCarIcon}
                  alt="User Profile"
                  width={543}
                  height={543}
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
            <div className="flex items-center space-x-2 relative profile-dropdown-container">
              <div
                className="flex items-center space-x-2"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                  <span className="text-sm font-medium">A</span>
                </div>
                <div className="flex flex-col cursor-pointer">
                  <span className="text-sm font-medium">Asadujjaman</span>
                  <span className="text-xs text-gray-500">Buyer</span>
                </div>
              </div>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 p-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 transform -translate-x-0">
                  <div className="">
                    <button className="w-full bg-gradient-to-b from-[#47BC23] to-[#0D8817] shadow-lg cursor-pointer text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      Switch to Seller
                    </button>
                  </div>
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
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <span className="text-gray-800 font-medium">Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
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
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium">A</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Asadujjaman</span>
                <span className="text-xs text-gray-500">Buyer</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

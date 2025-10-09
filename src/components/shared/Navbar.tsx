"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import logo from "@/assets/Carplace24Logo.png";
import Image from "next/image";
import Link from "next/link";
import NavItem from "./NavItem";
import { navItems } from "./navData";
import compareIcon from "@/assets/compareIcon.png";
import heartIcon from "@/assets/heart.png";
import bellIcon from "@/assets/bell.png";
import { BellIcon, HeartIcon } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 shadow-sm bg-gray-50">
      <div className="container mx-auto flex items-center justify-between px-4">
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
            <Button variant="ghost" size="icon" className="relative">
              <Image
                src={compareIcon}
                alt="User Profile"
                width={24}
                height={24}
              />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Image
                src={heartIcon}
                alt="User Profile"
                width={24}
                height={24}
              />
            </Button>
            <Button variant="ghost" size="icon" className="relative p-1">
              <Image src={bellIcon} alt="User Profile" width={24} height={24} />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <select className="bg-transparent border-none outline-none font-medium text-gray-700 cursor-pointer">
              <option value="en">EN</option>
              <option value="de">DE</option>
              <option value="fr">FR</option>
            </select>
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

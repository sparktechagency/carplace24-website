"use client";

import { useState, ReactNode } from "react";
import Image from "next/image";
import {
  FaUser,
  FaCar,
  FaHeart,
  FaSignOutAlt,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import MyProfile from "./sections/MyProfile";
import Favorites from "./sections/Favorites";
import Settings from "./sections/Settings";
import MyCars from "./sections/MyCars";

interface MainProfileLayoutProps {
  children?: ReactNode;
  initialTab?: string;
}

const MainProfileLayout = ({
  children,
  initialTab = "profile",
}: MainProfileLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    {
      id: "profile",
      label: "My Profile",
      icon: <FaUser className="mr-2" />,
      component: <MyProfile />,
    },
    {
      id: "listings",
      label: "My Cars",
      icon: <FaCar className="mr-2" />,
      component: <MyCars />,
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: <FaHeart className="mr-2" />,
      component: <Favorites />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <FaCog className="mr-2" />,
      component: <Settings />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Account</h1>
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside
          className={`
          lg:w-1/4 bg-white rounded-lg shadow-md p-6 h-fit
          ${isMobileMenuOpen ? "block" : "hidden"} lg:block
        `}
        >
          {/* User Profile Summary */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-4 relative">
              <Image
                src="/placeholder-avatar.jpg"
                alt="User Avatar"
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                }}
              />
            </div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-500 text-sm">john.doe@example.com</p>
          </div>

          {/* Navigation Menu */}
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`
                      flex items-center p-3 rounded-md w-full text-left
                      ${
                        activeTab === item.id
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-50"
                      }
                    `}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-4 mt-4 border-t border-gray-200">
                <button className="flex items-center p-3 text-red-500 hover:bg-red-50 rounded-md w-full text-left">
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="lg:w-3/4 bg-white rounded-lg shadow-md p-6">
          {children ||
            menuItems.find((item) => item.id === activeTab)?.component || (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">
                  Welcome to Your Profile
                </h2>
                <p className="text-gray-600 mb-8">
                  Select an option from the sidebar to manage your account
                </p>
              </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default MainProfileLayout;

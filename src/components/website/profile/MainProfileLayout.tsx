"use client";

import { useState, ReactNode, useEffect } from "react";
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
import Inquiries from "./sections/Inquiries";
import { BsQuestionOctagonFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  useProfileQuery,
  useUserUpdateMutation,
} from "@/redux/apiSlice/authSlice";
import { getImageUrl } from "@/lib/getImageUrl";
import CarLoader from "@/components/ui/loader/CarLoader";
import { logout } from "@/lib/logout";

interface MainProfileLayoutProps {
  children?: ReactNode;
  initialTab?: string;
  initialRole?: "buyer" | "seller";
}

type UserRole = "buyer" | "seller";

const MainProfileLayout = ({
  children,
  initialTab = "profile",
  initialRole = "buyer",
}: MainProfileLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeRole, setActiveRole] = useState<UserRole>(initialRole);

  const {
    data: userData,
    isLoading,
    refetch: refetchProfile,
  } = useProfileQuery(undefined);
  const [userUpdate, { isLoading: isUpdating }] = useUserUpdateMutation();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isAvatarDragging, setIsAvatarDragging] = useState(false);

  useEffect(() => {
    if (avatarFile) {
      const url = URL.createObjectURL(avatarFile);
      setAvatarPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setAvatarPreview(null);
  }, [avatarFile]);

  const handleAvatarUpload = async (file?: File) => {
    const selected = file || avatarFile;
    if (!selected) return;
    try {
      const fd = new FormData();
      fd.append("image", selected);
      const res = await userUpdate(fd).unwrap();
      const msg = (res as any)?.message || "Profile image updated";
      toast.success(msg);
      setAvatarFile(null);
      setAvatarPreview(null);
      refetchProfile();
    } catch (err: any) {
      const msg = err?.data?.message || "Failed to update image";
      toast.error(msg);
    }
  };

  if (isLoading || isUpdating) {
    return <CarLoader />;
  }

  const userDetails = userData?.data;
  console.log(userDetails);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    toast.success("Logged out");
    logout("/login");
  };

  const sharedComponents = {
    profile: {
      id: "profile",
      label: "My Profile",
      icon: <FaUser className="mr-2" />,
      component: <MyProfile userDetails={userDetails} />,
    },
    settings: {
      id: "settings",
      label: "Settings",
      icon: <FaCog className="mr-2" />,
      component: <Settings />,
    },
  };

  const buyerMenuItems = [
    sharedComponents.profile,
    {
      id: "favorites",
      label: "Favorites",
      icon: <FaHeart className="mr-2" />,
      component: <Favorites />,
    },
    sharedComponents.settings,
  ];

  const sellerMenuItems = [
    sharedComponents.profile,
    {
      id: "myCars",
      label: "My Cars",
      icon: <FaCar className="mr-2" />,
      component: <MyCars />,
    },
    {
      id: "inquiries",
      label: "Inquiries",
      icon: <BsQuestionOctagonFill className="mr-2" />,
      component: <Inquiries />,
    },
    sharedComponents.settings,
  ];

  const menuItems = activeRole === "buyer" ? buyerMenuItems : sellerMenuItems;

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

      {/* Role Switcher */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-6 py-2 text-sm font-medium border border-gray-200 rounded-l-lg ${
              activeRole === "buyer"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => {
              setActiveRole("buyer");
              setActiveTab("profile");
            }}
          >
            Buyer Profile
          </button>
          <button
            type="button"
            className={`px-6 py-2 text-sm font-medium border border-gray-200 rounded-r-lg ${
              activeRole === "seller"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => {
              setActiveRole("seller");
              setActiveTab("profile");
            }}
          >
            Seller Profile
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row md:min-h-[700px] gap-8">
        {/* Sidebar */}
        <aside
          className={`
          lg:w-1/4 bg-white rounded-lg shadow-md p-6 md:h-[700px]
          ${isMobileMenuOpen ? "block" : "hidden"} lg:block
        `}
        >
          {/* User Profile Summary */}
          <div className="flex flex-col items-center mb-8">
            <label
              htmlFor="profileImageUploader"
              onDragOver={(e) => {
                e.preventDefault();
                setIsAvatarDragging(true);
              }}
              onDragLeave={() => setIsAvatarDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) {
                  setAvatarFile(file);
                  handleAvatarUpload(file);
                }
                setIsAvatarDragging(false);
              }}
              className={`w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-2 relative cursor-pointer ${
                isAvatarDragging ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <Image
                src={avatarPreview || getImageUrl(userDetails?.profile)}
                alt="User Avatar"
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                }}
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors"></div>
            </label>
            <input
              id="profileImageUploader"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (file) {
                  setAvatarFile(file);
                  handleAvatarUpload(file);
                } else {
                  setAvatarFile(null);
                }
              }}
            />
            {avatarFile && (
              <div className="w-full flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-600 truncate max-w-[60%]">
                  {avatarFile.name}
                </span>
                {isUpdating && (
                  <span className="text-xs text-gray-600">Uploading...</span>
                )}
              </div>
            )}
            <h2 className="text-xl font-semibold">
              {userDetails?.name || "N/A"}
            </h2>
            <p className="text-gray-500 text-sm">
              {userDetails?.email || "N/A"}
            </p>
            {userDetails?.isSubscribed && (
              <span className="mt-2 inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                Subscribed
              </span>
            )}
          </div>

          {/* Navigation Menu */}
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`
                      flex items-center p-3 rounded-md w-full cursor-pointer text-left
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
                <button
                  onClick={() => handleLogout()}
                  className="flex items-center cursor-pointer p-3 text-red-500 hover:bg-red-50 rounded-md w-full text-left"
                >
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

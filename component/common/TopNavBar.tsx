"use client";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { BellDot, User2, Menu } from "lucide-react";
import { signOut } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ProfileData } from "../types";
interface ProfileProps{
profile: ProfileData | null;
}
const TopNavBar: React.FC<ProfileProps> = ({ profile }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between h-16 px-4 md:px-8 border-b border-gray-300 relative">
      {/* Logo / Welcome */}
      <h1 className="text-sm sm:text-base font-light">
        Welcome, <span className="font-bold text-blue-950">{profile?.businessName || 'N/A'}</span>
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 ml-auto">
        <SearchBar />
        <BellDot className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
        <div className="relative">
          <div
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <User2 className="h-6 w-6 text-gray-500" />
            <div className="flex flex-col text-sm">
              <span className="text-blue-950 font-medium">{profile?.name || 'N/A'}</span>
              <span className="text-gray-500 text-xs">{profile?.category}</span>
            </div>
          </div>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-md z-50">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Settings
              </a>
              <button onClick={handleSignOut} className="block px-4 py-2 hover:bg-gray-100">Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-blue-950 flex items-center gap-5"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div className="flex flex-col text-sm">
          <span className="text-blue-950 font-medium">{profile?.name || 'N/A'}</span>
          <span className="text-gray-500 text-xs">{profile?.category || 'N/A'}</span>
        </div>
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 shadow-md z-50 flex flex-col p-4 space-y-3 md:hidden">
          <SearchBar />
          <div className="flex flex-col gap-2">
            <a href="#" className="text-sm hover:text-blue-950">
              Settings
            </a>
            <button onClick={handleSignOut} className="block px-4 py-2 hover:bg-gray-100">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNavBar;

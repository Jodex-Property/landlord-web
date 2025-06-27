"use client";

import React, { useEffect, useState } from "react";
import ImageCard from "@/components-custom/common/ImageCard";
import SideNavBar from "@/components-custom/common/SideNavBar";
import TopNavBar from "@/components-custom/common/TopNavBar";
import SettingsForm from "@/components-custom/SettingsForm";
import { ProfileData } from "@/components-custom/types";

export default function SettingsContent() {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex">
      <nav className="bg-white w-80 flex flex-col gap-10 border-r border-slate-100 shadow-lg">
        <SideNavBar />
      </nav>
      <div className="right w-full flex gap-2 flex-col">
        <TopNavBar profile={profile} />
        <div className="bg-white shadow-2xl rounded-lg p-4 mx-5 my-10">
          <ImageCard />
          <SettingsForm />
        </div>
      </div>
    </div>
  );
}

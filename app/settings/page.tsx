"use client";

import SideNavBar from "@/components-custom/common/SideNavBar";
import TopNavBar from "@/components-custom/common/TopNavBar";
import useRequest from "@/components-custom/hook/use-req";
import SettingsForm from "@/components-custom/SettingsForm";
import { ProfileData } from "@/components-custom/types";
import React, { useEffect, useState } from "react";

export default function SettingsPage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const { makeRequest: getProfile } = useRequest(`/auth/me`, "GET");

  useEffect(() => {
    const fetchProfile = async () => {
      const [response] = await getProfile();
      if (response) {
        setProfile(response);
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
          <SettingsForm />
        </div>
      </div>
    </div>
  );
}

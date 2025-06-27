"use client";
export const dynamic = "force-dynamic";

import SideNavBar from "@/components-custom/common/SideNavBar";
import TopNavBar from "@/components-custom/common/TopNavBar";
import useRequest from "@/components-custom/hook/use-req";
import { ProfileData } from "@/components-custom/types";
import React, { useEffect, useState } from "react";

const DeclutterItemPage = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const { makeRequest: getProfile } = useRequest(`/auth/me`, "GET", {
    Authorization: `Bearer ${token}`,
  });

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    setToken(userToken);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      const [response] = await getProfile();
      if (response) {
        setProfile(response);
      }
    };
    fetchProfile();
  }, [token, getProfile]);

  return (
    <div className="h-screen flex">
      <nav className="bg-white w-80 h-screen flex flex-col gap-10 border-r border-slate-100 shadow-lg">
        <SideNavBar />
      </nav>
      <div className="right w-full flex gap-2 flex-col">
        <TopNavBar profile={profile} />
        <h1>Coming Soon</h1>
      </div>
    </div>
  );
};

export default DeclutterItemPage;

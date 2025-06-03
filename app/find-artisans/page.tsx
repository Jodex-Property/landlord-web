"use client"
import SideNavBar from "@/component/common/SideNavBar";
import TopNavBar from "@/component/common/TopNavBar";
import useRequest from "@/component/hook/use-req";
import { ProfileData } from "@/component/types";
import React, { useEffect, useState } from "react";

const FindArtisansPage = () => {
   const userToken = localStorage.getItem("token");
    const [profile, setProfile] = useState<ProfileData | null>(null);
  
    const { makeRequest: getProfile } = useRequest(`/auth/me`, "GET", {
      Authorization: `Bearer ${userToken}`,
    });
  
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
    <div className="h-screen flex">
      <nav className="bg-white w-80 h-screen flex flex-col gap-10 border-r border-slate-100 shadow-lg">
        <SideNavBar />
      </nav>
      <div className="right w-full flex gap-2 flex-col">
        <TopNavBar profile={profile}/>
        <h1>Coming Soon</h1>
      </div>
    </div>
  );
};

export default FindArtisansPage;

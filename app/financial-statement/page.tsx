"use client"
export const dynamic = "force-dynamic";

import SideNavBar from "@/components-custom/common/SideNavBar";
import TopNavBar from "@/components-custom/common/TopNavBar";
import ExpensesTable from "@/components-custom/finanicals-ui/ExpensesTable";
import ImageCard from "@/components-custom/common/ImageCard";
import { useEffect, useState } from "react";
import useRequest from "@/components-custom/hook/use-req";
import { ProfileData } from "@/components-custom/types";

const FinancialStatementPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const { makeRequest: getProfile } = useRequest(`/auth/me`, "GET", {
    Authorization: `Bearer ${token}`,
  });

  useEffect(() => {
          if (typeof window !== "undefined") {
            const localToken = localStorage.getItem("token");
            setToken(localToken);
          }
        }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const [response] = await getProfile();
      if (response) {
        setProfile(response);
      }
    };
    fetchProfile();
  }, [getProfile]);
  return (
    <div className="min-h-screen flex">
      <nav className="bg-white w-80 flex flex-col gap-10 border-r border-slate-100 shadow-lg">
        <SideNavBar />
      </nav>
      <div className="right w-full flex gap-2 flex-col">
        <TopNavBar profile={profile} />
        <div className="bg-white shadow-2xl rounded-lg p-4 mx-5 my-10">
          <ImageCard />
          <ExpensesTable />
        </div>
      </div>
    </div>
  );
};

export default FinancialStatementPage;

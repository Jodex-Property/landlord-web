/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import SideNavBar from "@/components-custom/common/SideNavBar";
import TopNavBar from "@/components-custom/common/TopNavBar";
import StatsSection from "@/components-custom/dashboard-ui/StatsSection";
import TopCards from "@/components-custom/dashboard-ui/TopCards";
import useRequest from "@/components-custom/hook/use-req";
import { ChartData, MetricData, ProfileData } from "@/components-custom/types";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const DashboardPage = () => {
  const [chart, setChart] = useState<ChartData | null>(null);
  const [listings, setUpcomingListings] = useState<[] | null>(null);
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const { makeRequest: getDashboard } = useRequest("/user/dashboard", "GET");

  const { makeRequest: getProfile } = useRequest(`/auth/me`, "GET");

  useEffect(() => {
    const fetchDashboard = async () => {
      const [response] = await getDashboard();
      if (response) {
        setChart(response?.data?.charts);
        setMetrics(response?.data?.metrics);
        setUpcomingListings(response?.data?.listings);
      }
    };
    fetchDashboard();
  }, []);

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
    <div className="min-h-screen flex bg-gray-50">
      <nav className="bg-white w-80 flex flex-col gap-10 border-r border-slate-100 shadow-lg">
        <SideNavBar />
      </nav>
      {metrics ? (
        <div className="right w-full flex gap-2 flex-col">
          <TopNavBar profile={profile} />
          {metrics && <TopCards metrics={metrics} />}

          {chart && <StatsSection chart={chart} />}
        </div>
      ) : (
        <div className="flex w-full justify-center items-center h-screen">
          <ClipLoader size={70} />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

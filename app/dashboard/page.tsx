
"use client";
import SideNavBar from "@/component/common/SideNavBar";
import TopNavBar from "@/component/common/TopNavBar";
import StatsSection from "@/component/dashboard-ui/StatsSection";
import TopCards from "@/component/dashboard-ui/TopCards";
import useRequest from "@/component/hook/use-req";
import { ChartData, MetricData, ProfileData } from "@/component/types";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [chart, setChart] = useState<ChartData | null>(null);
  const [listings, setUpcomingListings] = useState<[] | null>(null);
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const { makeRequest: getDashboard } = useRequest("/user/dashboard", "GET", );

  const { makeRequest: getProfile } = useRequest(`/auth/me`, "GET");

  useEffect(() => {
    const fetchDashboard = async () => {
      const [response] = await getDashboard();
      if (response) {
        setChart(response?.data?.charts);
        setMetrics(response?.data?.metrics);
        setUpcomingListings(response?.data?.listings)
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
      <div className="right w-full flex gap-2 flex-col">
        <TopNavBar profile={profile} />
        {metrics && <TopCards metrics={metrics} />}

        {chart && <StatsSection chart={chart} />}
      </div>
    </div>
  );
};

export default DashboardPage;

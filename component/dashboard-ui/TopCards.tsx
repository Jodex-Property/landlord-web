import { CalendarDays, DollarSign, HouseIcon, Users } from "lucide-react";
import React from "react";
import { MetricData } from "../types";

interface TopCardsProps {
  metrics: MetricData;
}

const TopCards = ({ metrics }: TopCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 sm:p-6 lg:p-10">
      <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-light">Total Tenants</h2>
          <p className="text-blue-950 font-bold text-lg">{metrics?.totalTenants || 0}</p>
        </div>
        <div className="rounded-full bg-blue-500 w-10 h-10 shadow-lg flex items-center justify-center">
          <Users className="text-white w-5 h-5" />
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-light">Total Listings</h2>
          <p className="text-blue-950 font-bold text-lg">{metrics?.totalListings || 0}</p>
        </div>
        <div className="rounded-full bg-green-500 w-10 h-10 shadow-lg flex items-center justify-center">
          <HouseIcon className="text-white w-5 h-5" />
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-light">Total Earnings</h2>
          <p className="text-blue-950 font-bold text-lg">{metrics?.totalEarnings || 0}</p>
        </div>
        <div className="rounded-full bg-purple-500 w-10 h-10 shadow-lg flex items-center justify-center">
          <DollarSign className="text-white w-5 h-5" />
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-light">Upcoming <br /> Inspections</h2>
          <p className="text-blue-950 font-bold text-lg">{metrics?.activeListings || 0}</p>
        </div>
        <div className="rounded-full bg-orange-500 w-10 h-10 shadow-lg flex items-center justify-center">
          <CalendarDays className="text-white w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default TopCards;

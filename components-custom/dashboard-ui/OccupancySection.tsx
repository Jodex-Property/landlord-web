import React from "react";

const OccupancySection = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 sm:p-6 lg:p-10">
      <div className="flex-1 bg-white min-h-[400px] rounded-2xl shadow-lg p-6 flex flex-col justify-between">
        <h2 className="text-lg font-bold">Occupancy Rate</h2>
      </div>
      <div className="w-full lg:w-[350px] bg-white min-h-32 rounded-2xl shadow-lg flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold">Tasks &amp; Appointments</h2>
      </div>
    </div>
  );
};

export default OccupancySection;
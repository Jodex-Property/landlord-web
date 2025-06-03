import React from "react";

const ShortletOccupancy = () => {
  return (
    <div className="flex gap-4 p-10">
      <div className="flex-1 bg-white min-h-[400px] rounded-2xl shadow-lg p-6 flex flex-col justify-between">
        <h2 className="text-lg font-bold">Occupancy Rate</h2>
      </div>
      <div className="w-[350px] bg-white min-h-[400px] rounded-2xl shadow-lg p-6 flex flex-col">
        <h2 className="text-lg font-bold">Tasks &amp; Appointments</h2>
      </div>
    </div>
  );
};

export default ShortletOccupancy;

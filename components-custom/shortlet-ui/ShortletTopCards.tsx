import React from "react";

const ShortletTopCards = () => {
  return (
    <div className="grid grid-cols-4 gap-6 p-10">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-md font-light">Total Tenants</h2>
        <p className="text-blue-950 font-bold text-lg">120</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-md font-light">Total Listings</h2>
        <p className="text-blue-950 font-bold text-lg">15</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-md font-light">Total Earnings</h2>
        <p className="text-blue-950 font-bold text-lg">₦5,000,000</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-md font-light">Upcoming Inspections</h2>
        <p className="text-blue-950 font-bold text-lg">5</p>
      </div>
    </div>
  );
};

export default ShortletTopCards;

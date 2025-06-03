"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BathIcon,
  BedDoubleIcon,
  CarIcon,
  CircleXIcon,
  ConstructionIcon,
  HomeIcon,
  LayoutGridIcon,
  LucidePhone,
  MapPin,
  MessageCircleIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import ViewRentHistory from "./ViewRentHistory";

// Reusable component for displaying charges
const ChargesList = ({ charges, amounts }: { charges: string[]; amounts: string[] }) => (
  <div className="flex gap-4 justify-between w-4xl">
    <div className="space-y-3">
      {charges.map((charge, index) => (
        <h2 key={index} className="font-bold">{charge}</h2>
      ))}
    </div>
    <div className="space-y-3">
      {amounts.map((amount, index) => (
        <h2 key={index} className="font-medium">{amount}</h2>
      ))}
    </div>
  </div>
);

// Reusable component for displaying amenities
const AmenitiesList = ({ amenities }: { amenities: string[] }) => (
  <div className="flex flex-col flex-1">
    <h2 className="text-md mb-2 font-semibold">Amenities</h2>
    <div className="flex gap-4 mt-3">
      {amenities.map((amenity, index) => (
        <Badge
          key={index}
          className="border-2 border-blue-950 bg-black/0 text-blue-950 px-4 py-2 text-[16px] cursor-pointer"
        >
          {amenity}
          <X className="h-4 w-4" />
        </Badge>
      ))}
    </div>
  </div>
);

// Reusable component for tenant profile
const TenantProfile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }


    return (
        <div>
    <h2 className="text-md mb-2 font-semibold">Tenant Profile</h2>
    <div className="flex justify-between items-center gap-4 mt-3">
      <div className="flex gap-2">
        <Image src="/assets/img/jodex-tenant-img-1.jpg" alt="Tenant" width={130} height={130} />
        <div>
          <h2 className="font-bold">Lanre Abidemi</h2>
          <p className="text-sm">23, Male</p>
          <p className="text-sm">Single</p>
          <div className="flex gap-5 mt-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white border-1 border-gray-600">
              <LucidePhone className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white border-1 border-gray-600">
              <MessageCircleIcon className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Button onClick={handleOpenModal} variant="outline" className="cursor-pointer">Rent History</Button>
      </div>
    </div>

    {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-md shadow-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Rent History</h2>
            <button
              className="px-4 py-2 rounded-full cursor-pointer"
              onClick={handleCloseModal}
            >
              <CircleXIcon width="24px" height="24px" className="text-blue-950" />
            </button>
          </div>
          <div>
            <ViewRentHistory />
          </div>
        </div>
      </div>
    )}
  </div>
    )
  
};

const ViewRentedProperty = () => {
  const thumbnails = [
    "/assets/img/rent-property-img-2.jpg",
    "/assets/img/rent-property-img-3.jpg",
    "/assets/img/rent-property-img-4.jpg",
  ];

  const chargesTypes = ["Agency(5%)", "Legal(10%)", "Service charge", "Caution fee"];
  const chargesAmounts = ["₦300,000", "₦100,000", "₦50,000", "₦50,000"];
  const amenities = ["Gym", "Laundry", "Parking", "Garden"];

  return (
    <div>
      {/* Property Details */}
      <div className="bg-white shadow-lg p-10 rounded-md flex items-center">
        <div className="flex flex-col p-2">
          <Image
            src="/assets/img/rent-property-img-1.jpg"
            alt="Jodex property image"
            width={310}
            height={310}
            className="rounded-md object-cover"
          />
          <div className="flex gap-2 mt-3">
            {thumbnails.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Jodex property thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="rounded-md object-cover"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col p-3 flex-1">
          <div className="flex flex-col h-full justify-between">
            <h2 className="text-4xl font-bold text-blue-950">₦1,000,000/Year</h2>
            <div className="flex items-center gap-2 text-gray-600 font-bold mt-2">
              <MapPin className="w-4 h-4" /> Blantyre Street, Maitama
            </div>
            <hr className="w-20 h-[2px] bg-[#FF5B19] mb-3 mt-4" />
            <div className="flex flex-col">
              <h2 className="text-md mb-2 font-semibold">Features</h2>
              <div className="flex space-x-8">
                <div className="flex flex-col space-y-2">
                  <FeatureItem icon={<BedDoubleIcon />} label="Bedrooms" value="4" />
                  <FeatureItem icon={<BathIcon />} label="Bathrooms" value="2" />
                  <FeatureItem icon={<LayoutGridIcon />} label="Sqft" value="2200" />
                </div>
                <div className="flex flex-col space-y-2">
                  <FeatureItem icon={<HomeIcon />} label="Type" value="Flat" />
                  <FeatureItem icon={<CarIcon />} label="Parking" value="Yes" />
                  <FeatureItem icon={<ConstructionIcon />} label="Year Built" value="2020" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charges and Amenities */}
      <div className="flex justify-between items-center gap-10 mt-10">
        <ChargesList charges={chargesTypes} amounts={chargesAmounts} />
        <AmenitiesList amenities={amenities} />
      </div>

      <hr className="w-full h-[1px] bg-[#FF5B19] mb-3 mt-4" />

      {/* Tenant Profile */}
      <TenantProfile />
    </div>
  );
};

// Reusable component for features
const FeatureItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-2 text-sm">
    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white border-1 border-gray-600">
      {icon}
    </div>
    <div>
      <h2>{label}</h2>
      <p>{value}</p>
    </div>
  </div>
);

export default ViewRentedProperty;

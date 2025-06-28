 
"use client";
import { MapPin, Trash2Icon, CircleXIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EditPropertyForm from "../forms/EditPropertyForm";
import { Property } from "../types";
import PlaceHolder from "../../public/assets/img/house-placeholder.jpg";
import useRequest from "../hook/use-req";

interface ListingCardProps {
  listings: Property;
}

const ListingCard = ({ listings }: ListingCardProps) => {
  // const userToken = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address, rent, city, pictures, id, state, propertyType, user } =
    listings;
  const title = `${propertyType} - ${user?.businessName ?? "No Name"}`;
  const price = `₦${rent?.toLocaleString() ?? "0"}`;
  const location = `${address}, ${city}, ${state}`;
  
  const getValidImageUrl = (url: string | undefined): string => {
    if (!url || typeof url !== "string") return PlaceHolder.src;

    // Fix 'undefined' in domain
    if (url.includes("s3.undefined.amazonaws.com")) {
      return url.replace(
        "s3.undefined.amazonaws.com",
        "s3.eu-north-1.amazonaws.com"
      );
    }

    return url;
  };

  const displayImage =
    pictures && pictures.length > 0
      ? getValidImageUrl(pictures[0])
      : PlaceHolder.src;

  const [singleListing, setSingleListing] = useState<Property | null>(null);
  const { makeRequest: getSingleListing } = useRequest(
    `/properties/${id}`,
    "GET"
    // {
    //   Authorization: `Bearer ${userToken}`,
    // }
  );

 const handleOpenModal = async () => {
  setIsModalOpen(true);
  const [response] = await getSingleListing();
  if (response) {
    setSingleListing(response);
  }
};

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchListing = async () => {
      const [response] = await getSingleListing();
      if (response) {
        setSingleListing(response);
      }
    };
    fetchListing();
  }, []);



  return (
    <div className="bg-white rounded-md flex flex-col text-gray-900 shadow-lg">
      <div onClick={handleOpenModal} className="cursor-pointer">
        <div className="flex overflow-x-auto gap-2">
          <div className="flex overflow-x-auto gap-2">
            <Image
              src={displayImage}
              alt="property"
              width={500}
              height={500}
              className="rounded-md object-cover h-48 w-full"
            />
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-[15px] font-medium">{title}</p>
              <p className="text-[14px] font-light text-[#FF5B19]">{price}</p>
              <div className="flex items-center mt-5 gap-1">
                <MapPin className="w-4 h-4" />
                <p className="text-xs text-[#7F7F7F]">{location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trash2Icon className="w-4 h-4 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold mb-4 text-center">
                Edit Listed Property
              </h2>
              <button
                className="px-4 py-2 rounded-4xl cursor-pointer"
                onClick={handleCloseModal}
              >
                <CircleXIcon
                  width="24px"
                  height="24px"
                  className="text-blue-950"
                />
              </button>
            </div>
            {singleListing && (
              <EditPropertyForm singleListing={singleListing} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface ListingsCardsProps {
  listings: Property[];
}

const ListingsCards = ({ listings }: ListingsCardsProps) => {
  if (!Array.isArray(listings)) {
    console.error("Expected listings to be an array, got:", listings);
    return <p>No listings available.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-[#F2F5F8] shadow-sm rounded-md">
      {listings?.map((listing) => (
        <ListingCard key={listing.id} listings={listing} />
      ))}
    </div>
  );
};

export default ListingsCards;

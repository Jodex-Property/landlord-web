import { MapPin, CircleXIcon, PencilIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import ViewRentedProperty from "./ViewRentedProperty";
import { Property } from "../types";
import PlaceHolder from "../../public/assets/img/house-placeholder.jpg";

interface PropertyCardProps {
  rentedProperties: Property;
}
const PropertyCard = ({ rentedProperties }: PropertyCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { address, rent, city, pictures, id, state, propertyType, user } =
    rentedProperties;
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

  return (
    <>
      <div
        className="bg-white rounded-md flex text-gray-900 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
        onClick={handleOpenModal}
      >
        <div className="flex flex-col p-2">
          <Image
            src={displayImage}
            alt="property"
            width={500}
            height={500}
            className="rounded-md object-cover h-48 w-full"
          />
          <div className="flex gap-2 mt-3">
            {[1, 2, 3].map((_, index) => (
              <Image
                key={index}
                src="/assets/img/jodex-img-3.png"
                alt={`Property thumbnail ${index + 1}`}
                width={40}
                height={40}
                className="rounded-md object-cover"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col p-3 flex-1">
          <div className="flex flex-col h-full justify-between">
            <div>
              <p className="text-[15px] font-medium">{price}</p>
              <div className="flex items-center gap-1 text-xs text-[#7F7F7F] mt-1 mb-3">
                <MapPin className="w-3 h-3" />
                <span>{location}</span>
              </div>
              <hr className="w-20 h-[2px] bg-[#FF5B19] mb-3" />
              <div className="flex flex-col">
                <h2 className="text-md mb-2 font-semibold">Overview</h2>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-[15px] font-medium">{title}</p>
                    <p className="text-[14px] font-light text-[#FF5B19]">
                      {price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trash2Icon className="w-4 h-4 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Property Details</h2>
              <button
                className="px-4 py-2 rounded-full cursor-pointer"
                onClick={handleCloseModal}
              >
                <CircleXIcon
                  width="24px"
                  height="24px"
                  className="text-blue-950"
                />
              </button>
            </div>
            <ViewRentedProperty />
          </div>
        </div>
      )}
    </>
  );
};

interface PropertyCardsProps {
  rentedProperties: Property[];
}

const PropertyCards = ({ rentedProperties }: PropertyCardsProps) => {
  if (!Array.isArray(rentedProperties)) {
    console.error("Expected listings to be an array, got:", rentedProperties);
    return <p>No listings available.</p>;
  }
  return (
    <>
      <h1 className="p-6 text-2xl font-semibold">Rented Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-[#F2F5F8] shadow-sm rounded-md">
        {rentedProperties?.map((property) => (
          <PropertyCard key={property.id} rentedProperties={property} />
        ))}
      </div>
    </>
  );
};

export default PropertyCards;

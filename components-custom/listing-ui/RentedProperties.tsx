import {
  BathIcon,
  BedSingleIcon,
  CarIcon,
  HouseIcon,
  LayoutGridIcon,
  MapPin,
  PickaxeIcon,
  LucideIcon,
  CircleXIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import ViewRentedProperty from "./ViewRentedProperty";

interface OverviewItem {
  Icon: LucideIcon;
  label: string;
}

interface PropertyCardProps {
  price: string;
  location: string;
  overview: OverviewItem[][];
}

const PropertyCard: React.FC<PropertyCardProps> = ({ price, location, overview }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="bg-white rounded-md flex text-gray-900 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
        onClick={handleOpenModal}
      >
        <div className="flex flex-col p-2">
          <Image
            src="/assets/img/jodex-img-2.png"
            alt="Property image"
            width={162}
            height={162}
            className="rounded-md object-cover"
          />
          <div className="flex gap-2 mt-3">
            {[1, 2, 3].map((_, index) => (
              <Image
                key={index}
                src="/assets/img/jodex-img-3.png"
                alt={`Property thumbnail ${index + 1}`}
                width={50}
                height={50}
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
                <div className="flex space-x-8">
                  {overview.map((group, groupIndex) => (
                    <div key={groupIndex} className="flex flex-col space-y-2">
                      {group.map(({ Icon, label }, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-2 text-sm">
                          <Icon className="w-4 h-4 text-gray-600" />
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  ))}
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
                <CircleXIcon width="24px" height="24px" className="text-blue-950" />
              </button>
            </div>
            <ViewRentedProperty />
          </div>
        </div>
      )}
    </>
  );
};

const RentedProperties: React.FC = () => {
  const properties: PropertyCardProps[] = [
    {
      price: "₦1,000,000/Year",
      location: "Blantyre Street, Maitama",
      overview: [
        [
          { Icon: BedSingleIcon, label: "4 Bedrooms" },
          { Icon: BathIcon, label: "3 Baths" },
          { Icon: LayoutGridIcon, label: "1200 sqft" },
        ],
        [
          { Icon: HouseIcon, label: "Duplex" },
          { Icon: CarIcon, label: "Parking" },
          { Icon: PickaxeIcon, label: "Built 2020" },
        ],
      ],
    },
    {
      price: "₦1,000,000/Year",
      location: "Blantyre Street, Maitama",
      overview: [
        [
          { Icon: BedSingleIcon, label: "4 Bedrooms" },
          { Icon: BathIcon, label: "3 Baths" },
          { Icon: LayoutGridIcon, label: "1200 sqft" },
        ],
        [
          { Icon: HouseIcon, label: "Duplex" },
          { Icon: CarIcon, label: "Parking" },
          { Icon: PickaxeIcon, label: "Built 2020" },
        ],
      ],
    },
  ];

  return (
    <div className="p-6 bg-[#F2F5F8] shadow-md rounded-md mt-10">
      <h1 className="text-[20px] font-semibold mb-6">Rented Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((property, index) => (
          <PropertyCard key={index} {...property} />
        ))}
      </div>
    </div>
  );
};

export default RentedProperties;

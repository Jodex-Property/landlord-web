"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { CircleXIcon, PlusCircleIcon } from "lucide-react";
import ListingsCards from "./listing-ui/ListingsCards";
import RentedProperties from "./listing-ui/RentedProperties";
import MarketplaceCards from "./listing-ui/MarketplaceCards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddPropertyForm from "./forms/AddPropertyForm";
import { Property } from "./types";

interface PropertyCards {
  listings: Property[];
  rentedProperties: Property[];
}

const Listings = ({ listings, rentedProperties }: PropertyCards) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-10">
      <Tabs defaultValue="myListings">
        <div className="flex items-center justify-between mb-8">
          <TabsList className="grid w-72 grid-cols-2 bg-white">
            <TabsTrigger
              value="myListings"
              className="cursor-pointer font-bold py-3 text-blue-950"
            >
              My Listings
            </TabsTrigger>
            {/* <TabsTrigger value='marketPlace' className='cursor-pointer font-bold py-3 text-blue-950'>Marketplace</TabsTrigger> */}
          </TabsList>
          <button
            className="bg-blue-950 px-10 py-3 rounded-md text-white font-medium text-[13px] cursor-pointer hover:bg-blue-900 transition duration-200 ease-in-out flex items-center gap-2"
            onClick={handleOpenModal}
          >
            List a Property <PlusCircleIcon width="14px" height="14px" />
          </button>
        </div>

        <TabsContent value="myListings">
          {listings && <ListingsCards listings={listings} />}
          {rentedProperties && (
            <RentedProperties rentedProperties={rentedProperties} />
          )}
        </TabsContent>
        {/* <TabsContent value="marketPlace">
          <MarketplaceCards />
        </TabsContent> */}
      </Tabs>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/85 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold mb-4 text-center">
                Add A New Property
              </h2>
              <button
                className=" px-4 py-2 rounded-4xl cursor-pointer"
                onClick={handleCloseModal}
              >
                <CircleXIcon
                  width="24px"
                  height="24px"
                  className="text-blue-950"
                />
              </button>
            </div>

            <AddPropertyForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Listings;

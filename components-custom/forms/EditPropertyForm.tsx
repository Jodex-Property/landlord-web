"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Property } from "../types";
import { formatDateLong, formatCurrency } from "@/lib/function";
interface ListingCardProps {
  singleListing: Property;
}

const EditPropertyForm = ({ singleListing }: ListingCardProps) => {
  const [property, setProperty] = useState<Property>(singleListing);
  const [duration, setDuration] = useState(property?.duration || "Annually");

  // Function to handle amenity removal
  const removeAmenity = (amenity: string) => {
    if (property?.amenities) {
      const updatedAmenities = property.amenities.filter((a) => a !== amenity);
      setProperty({ ...property, amenities: updatedAmenities });
    }
  };

  const featuredImage =
    property?.pictures && property.pictures.length > 0
      ? property.pictures[0]
      : "/assets/img/jodex-featured-image.jpg";

  return (
    <div className="flex flex-col gap-4 p-5 w-full max-w-2xl mx-auto bg-white rounded-lg shadow">
      {/* Header 
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">Editing Listed Property</h1>
        <Button variant="ghost" size="sm">
          <X className="h-4 w-4" />
        </Button>
      </div>*/}

      {/* Featured Image */}
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <Image
          src={featuredImage}
          alt={`${property?.rooms} Bedroom Apartment`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Property Details */}
      <div className="space-y-2">
        <h2 className="text-xl font-medium text-gray-800">
          {property?.rooms} Bedroom Apartment
        </h2>
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{property?.address}</span>
          </div>
          <div>Listed on {formatDateLong(property?.createdAt)}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-blue-950">
            {formatCurrency(property?.rent, "NGN", "symbol")}/Year
          </div>
          <div className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
            154 × 20
          </div>
        </div>
        <p className="text-sm">Property Condition: {property?.condition}</p>
      </div>

      {/* Features/Amenities */}
      <div className="space-y-2">
        <h3 className="font-medium">Features</h3>
        <div className="flex flex-wrap gap-2">
          {(property?.amenities || ["Gym", "Laundry", "Parking", "Garden"]).map(
            (amenity) => (
              <Badge
                key={amenity}
                className="bg-white border border-gray-300 text-gray-800 text-xs flex items-center gap-1 py-1"
              >
                {amenity}
                <button onClick={() => removeAmenity(amenity)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )
          )}
        </div>
      </div>

      {/* Charges */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm py-1">
          <span>Agency (5%)</span>
          <span>{formatCurrency(property?.agency, "NGN", "symbol")}</span>
        </div>
        <div className="flex justify-between text-sm py-1">
          <span>Legal (10%)</span>

          <span>{formatCurrency(property?.legal, "NGN", "symbol")}</span>
        </div>
        <div className="flex justify-between text-sm py-1">
          <span>Caution fee</span>
          <span>{formatCurrency(property?.caution, "NGN", "symbol")}</span>
        </div>
      </div>

      {/* Rent Duration */}
      <div className="space-y-2">
        <h3 className="font-medium">Rent Duration</h3>

        <p className="border p-3 rounded-2xl w-fit">
          {property?.duration} year(s)
        </p>
      </div>

      {/* Boost Post & Availability */}
      {/* <div className="flex justify-between items-center mt-2">
        <Button className="bg-blue-950 hover:bg-blue-900 text-white text-xs px-4 py-1 h-8">
          Boost Post
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm">Available</span>
          <Switch
            checked={isAvailable}
            onCheckedChange={setIsAvailable}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      </div> */}

      {/* Bookings */}
      {/* <div className="space-y-2 mt-2">
        <h3 className="font-medium">See Bookings</h3>
        <div className="space-y-1">
          <TenantCard
            imageSrc="/assets/img/jodex-tenant-img-1.jpg"
            name="Ogundele Ayo"
            age="28"
            gender="Male"
            agentId="#253453"
            onAccept={() => handleAcceptTenant("#253453")}
            onDecline={() => handleDeclineTenant("#253453")}
          />
          <TenantCard
            imageSrc="/assets/img/jodex-tenant-img-2.jpg"
            name="Boyunde Luke"
            age="32"
            gender="Married"
            agentId="#253463"
            onAccept={() => handleAcceptTenant("#253463")}
            onDecline={() => handleDeclineTenant("#253463")}
          />
        </div>
      </div> */}

      {/* Action Buttons */}
      {/* <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <Button className="bg-white hover:bg-gray-100 text-blue-950 border border-blue-950">
          Discard
        </Button>
        <Button className="bg-blue-950 hover:bg-blue-900 text-white">
          Save
        </Button>
      </div> */}
    </div>
  );
};

export default EditPropertyForm;

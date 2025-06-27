/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ReviewAndSubmit({
  form,
  setCurrentStep,
}: {
  form: any;
  setCurrentStep: (currentStep: number) => void;
}) {
  const values = form.getValues();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Basic Info */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Basic Info</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setCurrentStep(0)}>
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <strong>Type:</strong> {values.propertyType}
          </div>
          <div>
            <strong>Units:</strong> {values.units}
          </div>
          <div>
            <strong>Address:</strong> {values.address}
          </div>
          <div>
            <strong>City:</strong> {values.city}
          </div>
          <div>
            <strong>State:</strong> {values.state}
          </div>
          <div>
            <strong>Description:</strong> {values.description}
          </div>
          <div>
            <strong>Property Condition:</strong> {values.condition}
          </div>
          <div>
            <strong>Lease Duration:</strong> {values.duration}
          </div>
          <div>
            <strong>Utilities Included:</strong> {values.utility}
          </div>
          <div>
            <strong>Furnished:</strong> {values.furnished}
          </div>
          <div>
            <strong>Availability:</strong> {values.availability}
          </div>
        </CardContent>
      </Card>

      {/* Property Details */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Property Details</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setCurrentStep(1)}>
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <strong>Rent:</strong> ₦{values.rent?.toLocaleString()}
          </div>
          <div>
            <strong>Agency Fee:</strong> ₦{values.agency?.toLocaleString()}
          </div>
          <div>
            <strong>Legal Fee:</strong> ₦{values.legal?.toLocaleString()}
          </div>
          <div>
            <strong>Caution Fee:</strong> ₦{values.caution?.toLocaleString()}
          </div>
          <div>
            <strong>Rooms:</strong> {values.rooms}
          </div>
          <div>
            <strong>Bathrooms:</strong> {values.bathrooms}
          </div>
          <div>
            <strong>Kitchens:</strong> {values.kitchen}
          </div>
          <div>
            <strong>Amenities:</strong> {values.amenities?.join(", ")}
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Images */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Uploaded Images</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setCurrentStep(2)}>
            Edit
          </Button>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {values.pictures?.length > 0 ? (
            values.pictures.map((file: any, index: number) => (
              <Image
                key={index}
                src={typeof file === "string" ? file : URL.createObjectURL(file)}
                alt="Property"
                className="rounded-md object-cover w-full h-32"
                width={300}
                height={300}
              />
            ))
          ) : (
            <div>No images uploaded</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

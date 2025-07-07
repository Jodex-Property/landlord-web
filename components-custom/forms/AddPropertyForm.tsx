/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { addPropertySchema } from "@/lib/add-property-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import BasicInfo from "./steps-forms/BasicInfo";
import PropertyDetails from "./steps-forms/PropertyDetails";
import PropertyImages from "./steps-forms/PropertyImages";
import ReviewAndSubmit from "./steps-forms/ReviewAndSubmit";
import { showToast } from "../toast";
import useApi from "../hook/request";
import { useRouter } from "next/navigation";

type AddPropertyFormValues = z.infer<typeof addPropertySchema>;

const steps = [
  "Basic Information",
  "Property Details",
  "Property Images",
  "Review & Publish",
];

const AddPropertyForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const userToken = localStorage.getItem("token");
  const { makeRequest } = useApi("/properties", "POST", {
    Authorization: `Bearer ${userToken}`,
  });
  const router = useRouter()
  const form = useForm<AddPropertyFormValues>({
    resolver: zodResolver(addPropertySchema),
    defaultValues: {
      address: "",
      propertyType: "Flat",
      units: "",
      rent: "",
      agency: "",
      legal: "",
      caution: "",
      description: "",
      pictures: [],
      city: "",
      state: "",
      rooms: "",
      bathrooms: "",
      kitchen: "",
      amenities: [],
      availability: "Available",
      duration: 0,
      utility: "Yes",
      furnished: "No",
      condition: "New Building",
    },
  });

  const onNext = async () => {
    let fieldsToValidate: (keyof AddPropertyFormValues)[] = [];

    if (currentStep === 0) {
      fieldsToValidate = ["address", "propertyType", "units"];
    } else if (currentStep === 1) {
      fieldsToValidate = [
        "rent",
        "agency",
        "legal",
        "caution",
        "description",
        "city",
        "state",
        "rooms",
        "bathrooms",
        "kitchen",
        "amenities",
        "availability",
        "duration",
        "utility",
        "furnished",
        "condition",
      ];
    } else if (currentStep === 2) {
      fieldsToValidate = ["pictures"];
    }

    const valid = await form.trigger(fieldsToValidate);
    if (!valid) return;

    setCurrentStep((prev) => prev + 1);
  };

  const onBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: AddPropertyFormValues) => {
    const formData = new FormData();
    formData.append("address", data.address);
    formData.append("propertyType", data.propertyType);
    formData.append("units", data.units);
    formData.append("rent", data.rent ?? "");
    formData.append("agency", data.agency);
    formData.append("legal", data.legal);
    formData.append("caution", data.caution ?? "");
    formData.append("description", data.description);
    formData.append("city", data.city ?? "");
    formData.append("state", data.state ?? "");
    formData.append("rooms", data.rooms ?? "");
    formData.append("bathrooms", data.bathrooms ?? "");
    formData.append("kitchen", data.kitchen ?? "");
    formData.append("availability", data.availability ?? "");
    formData.append("duration", String(data.duration ?? ""));
    formData.append("utility", data.utility ?? "");
    formData.append("furnished", data.furnished ?? "");
    formData.append("condition", data.condition ?? "");

    // ✅ Send amenities as a single key
    formData.append("amenities", JSON.stringify(data.amenities ?? []));

    // ✅ Send all pictures under the same "pictures" key
    // (data.pictures ?? []).forEach((file: File) => {
    //   formData.append("pictures[]", file); // <-- note the [] here
    // });

     if (Array.isArray(data.pictures)) {
      data.pictures.forEach((file) => {
        formData.append("pictures", file); // Appending each file individually
      });
    }

    const [res, status] = await makeRequest(formData);

    if (status === 201) {
      showToast("Property added successfully!", true, {
        position: "top-right",
      });
      form.reset();
      router.push('listings')
      window.location.reload();
    } else {
      const message =
        (res as any)?.message || "Submission failed. Please try again.";
      showToast(message, false, { position: "top-right" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Step Indicator */}
        <div className="flex justify-between items-center gap-6 w-4xl px-10 mt-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 text-center py-2 px-3 rounded-md transition-all 
                ${
                  currentStep === index
                    ? "bg-blue-950 text-white font-semibold"
                    : "bg-gray-200 text-gray-700"
                }
              `}
            >
              {step}
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <div className="py-3 px-10">
          {currentStep === 0 && <BasicInfo form={form} />}
          {currentStep === 1 && <PropertyDetails form={form} />}
          {currentStep === 2 && <PropertyImages form={form} />}
          {currentStep === 3 && (
            <ReviewAndSubmit form={form} setCurrentStep={setCurrentStep} />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between p-10">
          {currentStep > 0 && (
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="w-1/3 py-5"
            >
              Back
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button
              type="button"
              onClick={onNext}
              className="bg-blue-950 text-white w-1/3 py-5"
            >
              Next
            </Button>
          ) : (
            <Button type="submit" className="bg-blue-950 text-white w-1/3 py-5">
              Publish
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default AddPropertyForm;

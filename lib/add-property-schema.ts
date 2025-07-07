// schema.ts
import { z } from "zod";

// Full schema
export const addPropertySchema = z.object({
  address: z
    .string()
    .min(5, { message: "Property address must be at least 5 characters" })
    .max(100, { message: "Property address must be at most 100 characters" }),
  propertyType: z.enum(
    [
      "Flat",
      "Duplex",
      "Bungalow",
      "Semi-Detached Duplex",
      "Detached Duplex",
      "Terrace",
      "Mansion",
      "Penthouse",
      "Studio",
      "Loft",
      "Villa",
    ],
    {
      message: "Property type must be one of the allowed types",
    }
  ),
  units: z
    .string()
    .min(1, { message: "Property units must be at least 1" })
    .max(100, { message: "Property units must be at most 100" }),
  rent: z
    .string()
    .min(0, { message: "Property rent must be a positive number" })
    .max(100000000, { message: "Property rent must be at most 100,000,000" }),
  agency: z
    .string()
    .min(0, { message: "Agency fee must be a positive number" })
    .max(1000000),
  legal: z
    .string()
    .min(0, { message: "Legal fee must be a positive number" })
    .max(1000000),
  caution: z
    .string()
    .min(0, { message: "Caution fee must be a positive number" })
    .max(1000000),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500),
// pictures: z
//   .array(z.any())
//   .max(5, { message: "You can upload at most 5 images" })
//   .optional(),

   pictures: z.array(z.any())
    .refine((files) => files.length > 0 && files.length <= 5, {
      message: "You must upload between 1 and 5 images",
    }),

  city: z.string().min(2).max(50),
  state: z.string().min(2).max(50),
  rooms: z.string().min(1).max(5),
  bathrooms: z.string().min(1).max(3),
  kitchen: z.string().min(1).max(2),
amenities: z
  .array(
    z.enum([
      "Air Conditioning",
      "Lundry",
      "Balcony",
      "Garden",
      "Swimming Pool",
      "Gym",
      "Parking",
    ])
  )
  .min(1, { message: "Select at least 1 amenity" })
  .max(4, { message: "You can select at most 4 amenities" }),

  availability: z.enum(["Available", "Not Available"]),
  duration: z.number().int().min(1).max(2),
  utility: z.enum(["Yes", "No"]),
  furnished: z.enum(["Yes", "No"]),
  condition: z.enum(["New Building", "Renovated"]),
});

// Partial schema for Step 1: Basic Info
export const basicInfoSchema = addPropertySchema.pick({
  address: true,
  propertyType: true,
  units: true,
  rent: true,
});

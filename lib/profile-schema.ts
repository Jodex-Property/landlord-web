import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    // .min(2, { message: "Full name must be at least 2 characters" })
    // .max(50, { message: "Full name must be at most 50 characters" })
    .transform((val) => (val === "" ? undefined : val))
    .optional(),

  email: z
    .string()
    .email({ message: "Invalid email address" })
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      { message: "Invalid email address" }
    )
    .transform((val) => (val === "" ? undefined : val))
    .optional(),

  contactNumber: z
  .string()
  .transform((val) => (val === "" ? undefined : val))
  .optional()
  .refine(
    (value) => {
      if (!value) return true; // allow empty
      const phoneRegex = /^(\+?\d{7,15})$/;
      return phoneRegex.test(value);
    },
    { message: "Invalid phone number" }
  ),


  gender: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => !val || ["Male", "Female"].includes(val), {
      message: "Gender must be Male or Female",
    }),

  dateOfBirth: z
    .string()
    .refine(
      (value) => {
        if (!value) return true;
        const date = new Date(value);
        return !isNaN(date.getTime());
      }
      // { message: "Invalid date of birth" }
    )
    .transform((val) => (val === "" ? undefined : val))
    .optional(),

  nin: z
    .string()
    // .min(11, { message: "NIN must be 11 digits" })
    .max(11, { message: "NIN must be 11 digits" })
    .transform((val) => (val === "" ? undefined : val))
    .optional(),

  maritalStatus: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine(
      (val) =>
        !val || ["Single", "Married", "Divorced", "Widowed"].includes(val),
      { message: "Invalid marital status" }
    ),

  businessName: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => val === undefined || val.length >= 2, {
      message: "Business name must be at least 2 characters",
    }),

  address: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => val === undefined || val.length >= 2, {
      message: "Address must be at least 5 characters",
    }),

  option: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => !val || ["Landlord", "Property Manager"].includes(val), {
      message: "Option must be either Landlord or Property Manager",
    }),

  cac: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        return file instanceof File;
      },
      {
        message: "CAC document must be a valid file",
      }
    ),

  profilePicture: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        return file instanceof File;
      },
      {
        message: "Profile picture document must be a valid file",
      }
    ),
});

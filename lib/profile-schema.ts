import { z } from "zod";

export const profileSchema = z.object({
  name: z.string()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(50, { message: "Full name must be at most 50 characters" }),

  email: z.string()
    .email({ message: "Invalid email address" })
    .refine((value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }, { message: "Invalid email address" }),

  contactNumber: z.string()
    .refine((value) => {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      return phoneRegex.test(value);
    }, { message: "Invalid phone number" }),

  gender: z.enum(["Male", "Female"], {
    message: "Gender must be Male, Female",
  }),

  dateOfBirth: z.string()
    .refine((value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }, { message: "Invalid date of birth" }),

  nin: z.string()
    .min(11, { message: "NIN must be 11 digits" })
    .max(11, { message: "NIN must be 11 digits" }),

  maritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed"], {
    message: "Invalid marital status",
  }),

  businessName: z.string()
    .min(2, { message: "Business name must be at least 2 characters" }),

  address: z.string()
    .min(5, { message: "Address must be at least 5 characters" }),

  option: z.enum(["Landlord", "Property Manager"], {
    message: "Option must be either Landlord or Property Manager",
  }),

cac: z
  .any()
  .optional()
  .refine((file) => {
    if (!file) return true; 
    return file instanceof File;
  }, {
    message: "CAC document must be a valid file",
  }),

  profilePicture: z
  .any()
  .optional()
  .refine((file) => {
    if (!file) return true; 
    return file instanceof File;
  }, {
    message: "Profile picture document must be a valid file",
  }),

});

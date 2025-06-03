import { z } from "zod";

export const VerificationSchema = z.object({
  email: z
    .string()
    .refine((value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }, { message: "Must be a valid email" }),

  code: z
    .string()
    .regex(/^\d{6}$/, {
      message: "Verification code must be exactly 6 digits",
    }),
});

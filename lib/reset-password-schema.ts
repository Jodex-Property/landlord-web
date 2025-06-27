import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z.string().refine(
    (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      return emailRegex.test(value);
    },
    { message: "Must be a valid email or phone number" }
  ),
password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
    });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
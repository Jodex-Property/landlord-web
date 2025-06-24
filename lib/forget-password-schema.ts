import { z } from "zod";

export const forgetPasswordSchema = z.object({
newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;
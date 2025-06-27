import { z } from "zod";

export const forgetPasswordSchema = z.object({
   email: z.string().refine(
    (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      return emailRegex.test(value);
    },
    { message: "Must be a valid email or phone number" }
  ),

});

export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;
import { z } from "zod";

export const VerificationCodeSchema = z.object({
  code: z
    .string()
    .regex(/^\d{6}$/, {
      message: "Verification code must be exactly 6 digits",
    }),
});

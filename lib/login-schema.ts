import { z } from "zod";


export const loginSchema = z.object({
    email: z.string()
        .refine((value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          
            return emailRegex.test(value)
        }, {message: "Must be a valid email address"}),

    password: z.string()
        .min(8, {message: "Password must be at least 8 characters"})
})
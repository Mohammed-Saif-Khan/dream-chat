import { z } from "zod";

export const otpSchema = z.object({
  otp: z.string().min(1, "OTP is required"),
  token: z.string().min(1, "token is required"),
});

export type otpType = z.infer<typeof otpSchema>;

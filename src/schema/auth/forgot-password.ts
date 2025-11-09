import z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Enter Valid Email").min(1, "Email is required"),
});

export type forgotPasswordType = z.infer<typeof forgotPasswordSchema>;

import { z } from "zod";

export const specialCharsNotAllowed = z
  .string()
  .min(1, "This field is required")
  .regex(/^[A-Za-z\s'-]+$/, "Must not contain special characters or numbers");

export const signUpSchema = z
  .object({
    firstName: specialCharsNotAllowed.refine((val) => val.length > 0, {
      message: "First Name is required",
    }),
    lastName: specialCharsNotAllowed.refine((val) => val.length > 0, {
      message: "Last Name is required",
    }),
    email: z.email("Enter Valid Email").min(1, "Email is required"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .max(10, "Phone number must be at least 10 digits")
      .regex(/^\+?\d{10,15}$/, "Enter a valid phone number"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &)"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpType = z.infer<typeof signUpSchema>;

import { z } from "zod";

export const specialCharsNotAllowed = z
  .string()
  .min(1, "This field is required")
  .regex(/^[A-Za-z\s'-]+$/, "Must not contain special characters or numbers");

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const personalSchema = z.object({
  avatar: z
    .union([
      z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "Avatar size must be less than 5MB",
      }),
      z.string().url({ message: "Avatar URL must be a valid URL" }),
    ])
    .optional(),

  firstName: specialCharsNotAllowed.refine((val) => val.length > 0, {
    message: "First Name is required",
  }),

  lastName: specialCharsNotAllowed.refine((val) => val.length > 0, {
    message: "Last Name is required",
  }),

  gender: z.enum(["male", "female"]).optional(),

  dob: z
    .date()
    .optional()
    .refine((val) => !val || (val instanceof Date && !isNaN(val.getTime())), {
      message: "Invalid date format",
    }),

  country: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: "Country must be at least 2 characters",
    }),

  about: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: "About must be at least 10 characters",
    }),

  facebook: z
    .string()
    .optional()
    .refine((val) => !val || z.url().safeParse(val).success, {
      message: "Invalid Facebook URL",
    }),

  google: z
    .string()
    .optional()
    .refine((val) => !val || z.url().safeParse(val).success, {
      message: "Invalid Google URL",
    }),

  x: z
    .string()
    .optional()
    .refine((val) => !val || z.url().safeParse(val).success, {
      message: "Invalid X URL",
    }),

  linkedin: z
    .string()
    .optional()
    .refine((val) => !val || z.url().safeParse(val).success, {
      message: "Invalid LinkedIn URL",
    }),

  youtube: z
    .string()
    .optional()
    .refine((val) => !val || z.url().safeParse(val).success, {
      message: "Invalid YouTube URL",
    }),

  others: z
    .string()
    .optional()
    .refine((val) => !val || z.url().safeParse(val).success, {
      message: "Invalid URL",
    }),
});

export type personalType = z.infer<typeof personalSchema>;

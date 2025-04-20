import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, "Password needs to be at least 3 chars long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(63, "That is too long")
    .regex(
      /^[a-z0-9-][a-z0-9-]*[a-z0-9-]$/,
      "Username can only contain lowercase letters, numbers and hyphens."
    )
    .refine((val) => !val.includes("--"), "Username cannot include double dash")
    .transform((val) => val.toLowerCase()),
});

export type RegisterData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginData = z.infer<typeof loginSchema>;

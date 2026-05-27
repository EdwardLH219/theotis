import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  organisation: z.string().trim().max(120).optional().or(z.literal("")),
  matterType: z.enum([
    "Litigation",
    "Corporate",
    "ADR",
    "Other",
  ]),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more about your matter (at least 20 characters).")
    .max(4000),
  // Honeypot — must remain empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactPayload = z.infer<typeof ContactSchema>;

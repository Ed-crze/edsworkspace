import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be 2 to 80 characters.").max(80, "Name must be 2 to 80 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be 10 to 2000 characters.")
    .max(2000, "Message must be 10 to 2000 characters."),
  company: z.string().max(0).optional(), // honeypot: must stay empty
});

export type ContactInput = z.infer<typeof contactSchema>;

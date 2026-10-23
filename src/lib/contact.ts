import { z } from "zod";
import { siteConfig } from "@/config/site";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(2000, "Message is too long"),
});

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Sends a contact message.
 *
 * Currently opens the user's mail client (no backend keys required).
 * To use EmailJS or a backend later, replace ONLY this function body.
 */
export async function sendContactMessage(input: ContactInput): Promise<void> {
  const subject = encodeURIComponent(`Portfolio contact from ${input.name}`);
  const body = encodeURIComponent(`${input.message}\n\n— ${input.name} (${input.email})`);
  window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
}

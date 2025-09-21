import { z } from "zod"

export const categories = ["general", "press", "correction", "sponsor", "other"] as const
export type Category = (typeof categories)[number]

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name.").max(80),
  email: z.string().email("Enter a valid email.").max(120),
  category: z.enum(categories),
  subject: z.string().min(3, "Subject is too short.").max(120),
  message: z.string().min(20, "Message should be at least 20 characters.").max(2000),
  consent: z.literal(true, { errorMap: () => ({ message: "You must agree to continue." }) }),
  company: z.string().max(0), // honeypot: must be empty
  renderedAt: z.number().int().positive(),
})

export type ContactInput = z.infer<typeof contactSchema>

export const categoryLabels: Record<Category, string> = {
  general: "General",
  press: "Press / Media",
  correction: "Data Correction",
  sponsor: "Sponsorship / Ads",
  other: "Other",
}

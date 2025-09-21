import { z } from "zod"

export const correctionSchema = z.object({
  playerId: z.string().optional(),
  playerName: z.string().min(2, "Player name is required"),
  eventId: z.string().optional(),
  eventName: z.string().optional(),
  tour: z.enum(["PPA", "MLP", "APP"]).optional(),
  year: z
    .string()
    .regex(/^\d{4}$/, "Use a 4-digit year")
    .optional(),
  field: z.enum([
    "Placement",
    "Payout",
    "Tour",
    "Contract",
    "Player Name",
    "Event Name",
    "Typos / Formatting",
    "Other",
  ]),
  currentValue: z.string().optional(),
  correctValue: z.string().min(1, "Please suggest the correction"),
  explanation: z.string().min(10, "A brief explanation helps us verify"),
  sourceUrl: z.string().url("Provide a valid URL").optional(),
  additionalSourceUrl: z.string().url("Provide a valid URL").optional(),
  contactEmail: z.string().email("Valid email helps us follow up").optional(),
  consent: z.boolean().refine((v) => v === true, "Please acknowledge our review policy"),
  // anti-spam
  website: z.string().max(0).optional(), // honeypot (should be empty)
  humanCheck: z.string().min(1, "Answer required"),
})

export type CorrectionPayload = z.infer<typeof correctionSchema>

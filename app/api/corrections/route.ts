import { NextResponse } from "next/server"

const tours = ["PPA", "MLP", "APP"] as const
const fields = [
  "Placement",
  "Payout",
  "Tour",
  "Contract",
  "Player Name",
  "Event Name",
  "Typos / Formatting",
  "Other",
] as const

function validateCorrectionData(body: any) {
  const errors: string[] = []

  if (!body.playerName || typeof body.playerName !== "string" || body.playerName.length < 2) {
    errors.push("Player name is required")
  }

  if (body.year && (typeof body.year !== "string" || !/^\d{4}$/.test(body.year))) {
    errors.push("Use a 4-digit year")
  }

  if (!body.field || !fields.includes(body.field)) {
    errors.push("Please select a valid field")
  }

  if (!body.correctValue || typeof body.correctValue !== "string" || body.correctValue.length < 1) {
    errors.push("Please suggest the correction")
  }

  if (!body.explanation || typeof body.explanation !== "string" || body.explanation.length < 10) {
    errors.push("A brief explanation helps us verify")
  }

  if (body.sourceUrl && (typeof body.sourceUrl !== "string" || !body.sourceUrl.startsWith("http"))) {
    errors.push("Provide a valid URL")
  }

  if (body.contactEmail && (typeof body.contactEmail !== "string" || !body.contactEmail.includes("@"))) {
    errors.push("Valid email helps us follow up")
  }

  if (body.consent !== true) {
    errors.push("Please acknowledge our review policy")
  }

  if (!body.humanCheck || typeof body.humanCheck !== "string" || body.humanCheck.length < 1) {
    errors.push("Answer required")
  }

  return errors
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const validationErrors = validateCorrectionData(body)
    if (validationErrors.length > 0) {
      return NextResponse.json({ ok: false, error: validationErrors[0] }, { status: 400 })
    }

    // TODO: replace with email/send to queue/db
    console.log("[Correction] New submission:", body)

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("[Correction] Error:", e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

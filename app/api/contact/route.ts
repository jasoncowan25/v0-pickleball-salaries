import { NextResponse } from "next/server"
import { checkRateLimit } from "@/lib/rate-limit"

const categories = ["general", "press", "correction", "sponsor", "other"] as const
type Category = (typeof categories)[number]

function validateContactData(body: any) {
  const errors: string[] = []

  if (!body.name || typeof body.name !== "string" || body.name.length < 2 || body.name.length > 80) {
    errors.push("Please enter your full name.")
  }

  if (!body.email || typeof body.email !== "string" || !body.email.includes("@") || body.email.length > 120) {
    errors.push("Enter a valid email.")
  }

  if (!body.category || !categories.includes(body.category)) {
    errors.push("Please select a valid category.")
  }

  if (!body.subject || typeof body.subject !== "string" || body.subject.length < 3 || body.subject.length > 120) {
    errors.push("Subject is too short.")
  }

  if (!body.message || typeof body.message !== "string" || body.message.length < 20 || body.message.length > 2000) {
    errors.push("Message should be at least 20 characters.")
  }

  if (body.consent !== true) {
    errors.push("You must agree to continue.")
  }

  return errors
}

function getIP(req: Request) {
  const xff = req.headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0].trim()
  // @ts-ignore
  return (req as any).ip ?? "0.0.0.0"
}

export async function POST(req: Request) {
  try {
    const ip = getIP(req)
    const body = await req.json()

    // timing guard
    const renderedAt = Number(body?.renderedAt ?? 0)
    if (!Number.isFinite(renderedAt) || Date.now() - renderedAt < 3000) {
      return NextResponse.json({ ok: false, error: "Submission too fast." }, { status: 400 })
    }

    // honeypot
    if (typeof body?.company === "string" && body.company.length > 0) {
      return NextResponse.json({ ok: false, error: "Spam detected." }, { status: 400 })
    }

    // rate limit
    const { allowed } = checkRateLimit(ip)
    if (!allowed) {
      return NextResponse.json({ ok: false, error: "Too many submissions. Try again later." }, { status: 429 })
    }

    const validationErrors = validateContactData(body)
    if (validationErrors.length > 0) {
      return NextResponse.json({ ok: false, error: validationErrors[0] }, { status: 400 })
    }

    // MVP: log only (no email send; no DB)
    console.log("CONTACT_FORM", { ip, ts: Date.now(), ...body, company: undefined })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Unexpected error." }, { status: 500 })
  }
}

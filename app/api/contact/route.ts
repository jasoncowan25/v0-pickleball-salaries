import { NextResponse } from "next/server"
import { contactSchema } from "@/lib/validation/contact"
import { checkRateLimit } from "@/lib/rate-limit"

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

    // validate
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      const first = parsed.error.issues[0]
      return NextResponse.json({ ok: false, error: first?.message ?? "Invalid input." }, { status: 400 })
    }
    const data = parsed.data

    // MVP: log only (no email send; no DB)
    console.log("CONTACT_FORM", { ip, ts: Date.now(), ...data, company: undefined })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Unexpected error." }, { status: 500 })
  }
}

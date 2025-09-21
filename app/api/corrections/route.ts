import { NextResponse } from "next/server"
import { correctionSchema } from "@/lib/validation/correction"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = correctionSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 })
    }

    // TODO: replace with email/send to queue/db
    console.log("[Correction] New submission:", parsed.data)

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("[Correction] Error:", e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

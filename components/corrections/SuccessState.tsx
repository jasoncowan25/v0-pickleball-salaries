"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SuccessState() {
  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Thanks — we got it ✅</h2>
      <p className="text-sm text-muted-foreground">
        Your correction was submitted. Our team will verify against official sources and update records where
        appropriate. If we need more info, we'll reach out.
      </p>
      <div className="flex gap-3">
        <Link href="/players">
          <Button variant="secondary">Back to Players</Button>
        </Link>
        <Link href="/submit-correction">
          <Button>Submit another</Button>
        </Link>
      </div>
    </Card>
  )
}

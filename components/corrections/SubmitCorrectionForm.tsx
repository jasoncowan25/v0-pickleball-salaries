"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { correctionSchema, type CorrectionPayload } from "@/lib/validation/correction"
import SuccessState from "./SuccessState"

type FormStatus = "idle" | "submitting" | "success" | "error"

const humanQuestion = "What is 3 + 4?"

export default function SubmitCorrectionForm() {
  const params = useSearchParams()
  const [status, setStatus] = React.useState<FormStatus>("idle")
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)

  const defaultField = (params.get("field") as CorrectionPayload["field"]) || "Other"

  const form = useForm<CorrectionPayload>({
    resolver: zodResolver(correctionSchema),
    defaultValues: {
      playerId: params.get("playerId") ?? "",
      playerName: params.get("playerName") ?? "",
      eventId: params.get("eventId") ?? "",
      eventName: params.get("eventName") ?? "",
      tour: (params.get("tour") as CorrectionPayload["tour"]) ?? undefined,
      year: params.get("year") ?? "",
      field: defaultField,
      currentValue: "",
      correctValue: "",
      explanation: "",
      sourceUrl: "",
      additionalSourceUrl: "",
      contactEmail: "",
      consent: false,
      website: "", // honeypot
      humanCheck: "",
    },
  })

  const onSubmit = async (values: CorrectionPayload) => {
    setStatus("submitting")
    setErrorMsg(null)

    // lightweight human check
    if (values.humanCheck.trim() !== "7") {
      setStatus("error")
      setErrorMsg("Human check failed. Please answer the math question.")
      return
    }

    try {
      const res = await fetch("/api/corrections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus("success")
      form.reset({ ...form.getValues(), website: "", humanCheck: "" })
    } catch (err: any) {
      setStatus("error")
      setErrorMsg("Something went wrong submitting the correction. Please try again.")
    }
  }

  if (status === "success") {
    return <SuccessState />
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form

  return (
    <Card className="p-6">
      <div className="space-y-2 mb-4">
        <h1 className="text-2xl font-semibold">Submit a correction</h1>
        <p className="text-sm text-muted-foreground">
          Help us keep DinkBank accurate. Provide context and a reliable source (official tour pages, tournament
          brackets, reputable media). We verify all changes against official purse totals and our methodology.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Context group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="playerName">Player</Label>
            <Input id="playerName" placeholder="e.g., Anna Leigh Waters" {...register("playerName")} />
            {errors.playerName && <p className="text-sm text-red-600 mt-1">{errors.playerName.message}</p>}
          </div>

          <div>
            <Label htmlFor="eventName">Event (optional)</Label>
            <Input id="eventName" placeholder="e.g., PPA Hyundai Masters" {...register("eventName")} />
          </div>

          <div>
            <Label htmlFor="tour">Tour (optional)</Label>
            <Select onValueChange={(v) => setValue("tour", v as any)} value={watch("tour") || ""}>
              <SelectTrigger id="tour">
                <SelectValue placeholder="Select tour" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PPA">PPA</SelectItem>
                <SelectItem value="MLP">MLP</SelectItem>
                <SelectItem value="APP">APP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="year">Year (optional)</Label>
            <Input id="year" placeholder="2025" {...register("year")} />
            {errors.year && <p className="text-sm text-red-600 mt-1">{errors.year.message}</p>}
          </div>
        </div>

        {/* What needs fixing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="field">What should be corrected?</Label>
            <Select onValueChange={(v) => setValue("field", v as any)} value={watch("field")}>
              <SelectTrigger id="field">
                <SelectValue placeholder="Choose a field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Placement">Placement</SelectItem>
                <SelectItem value="Payout">Payout</SelectItem>
                <SelectItem value="Tour">Tour</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Player Name">Player Name</SelectItem>
                <SelectItem value="Event Name">Event Name</SelectItem>
                <SelectItem value="Typos / Formatting">Typos / Formatting</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="currentValue">Current value (optional)</Label>
            <Input
              id="currentValue"
              placeholder='What we currently show, e.g., "$2,500 – Quarterfinalist"'
              {...register("currentValue")}
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="correctValue">Proposed correction</Label>
            <Input
              id="correctValue"
              placeholder='What it should be, e.g., "$3,000 – Semifinalist"'
              {...register("correctValue")}
            />
            {errors.correctValue && <p className="text-sm text-red-600 mt-1">{errors.correctValue.message}</p>}
          </div>
        </div>

        {/* Evidence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="sourceUrl">Source link (preferred)</Label>
            <Input id="sourceUrl" placeholder="https://..." {...register("sourceUrl")} />
            {errors.sourceUrl && <p className="text-sm text-red-600 mt-1">{errors.sourceUrl.message}</p>}
          </div>
          <div>
            <Label htmlFor="additionalSourceUrl">Second source (optional)</Label>
            <Input id="additionalSourceUrl" placeholder="https://..." {...register("additionalSourceUrl")} />
            {errors.additionalSourceUrl && (
              <p className="text-sm text-red-600 mt-1">{errors.additionalSourceUrl.message}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="explanation">Notes for our team</Label>
            <Textarea
              id="explanation"
              rows={4}
              placeholder="Brief explanation: where the error appears, why it's incorrect, how you verified it…"
              {...register("explanation")}
            />
            {errors.explanation && <p className="text-sm text-red-600 mt-1">{errors.explanation.message}</p>}
          </div>
        </div>

        {/* Contact + policy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactEmail">Contact email (optional)</Label>
            <Input id="contactEmail" type="email" placeholder="name@email.com" {...register("contactEmail")} />
            {errors.contactEmail && <p className="text-sm text-red-600 mt-1">{errors.contactEmail.message}</p>}
          </div>
          <div className="hidden">
            {/* Honeypot */}
            <Label htmlFor="website">Website</Label>
            <Input id="website" placeholder="Leave blank" {...register("website")} />
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox id="consent" checked={watch("consent")} onCheckedChange={(v) => setValue("consent", Boolean(v))} />
          <div className="grid gap-1 leading-none">
            <Label htmlFor="consent">I acknowledge DinkBank will review submissions before updating records.</Label>
            <p className="text-xs text-muted-foreground">
              We reconcile changes against official purse totals and our methodology. Submissions may be edited for
              clarity.
            </p>
            {errors.consent && <p className="text-sm text-red-600 mt-1">{errors.consent.message}</p>}
          </div>
        </div>

        {/* Lightweight anti-bot */}
        <div className="max-w-xs">
          <Label htmlFor="humanCheck">{humanQuestion}</Label>
          <Input id="humanCheck" placeholder="Answer" {...register("humanCheck")} />
          {errors.humanCheck && <p className="text-sm text-red-600 mt-1">{errors.humanCheck.message}</p>}
        </div>

        {status === "error" && errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

        <div className="flex gap-3">
          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting…" : "Submit correction"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => form.reset()} disabled={status === "submitting"}>
            Reset
          </Button>
        </div>

        <div className="border-t pt-4 text-xs text-muted-foreground">
          <p>
            Currency note: All amounts are in USD unless otherwise stated. Need our rules? See{" "}
            <a href="/methodology" className="underline">
              Methodology
            </a>
            .
          </p>
        </div>
      </form>
    </Card>
  )
}

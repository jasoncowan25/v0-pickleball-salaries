"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import SuccessState from "./SuccessState"

type FormStatus = "idle" | "submitting" | "success" | "error"

const humanQuestion = "What is 3 + 4?"

export default function SubmitCorrectionForm() {
  const params = useSearchParams()
  const [status, setStatus] = React.useState<FormStatus>("idle")
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)

  const [formData, setFormData] = React.useState({
    playerId: params.get("playerId") ?? "",
    playerName: params.get("playerName") ?? "",
    eventId: params.get("eventId") ?? "",
    eventName: params.get("eventName") ?? "",
    tour: (params.get("tour") as "PPA" | "MLP" | "APP") ?? "",
    year: params.get("year") ?? "",
    field: (params.get("field") as any) || "Other",
    currentValue: "",
    correctValue: "",
    explanation: "",
    sourceUrl: "",
    additionalSourceUrl: "",
    contactEmail: "",
    consent: false,
    website: "", // honeypot
    humanCheck: "",
  })

  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.playerName.trim() || formData.playerName.length < 2) {
      newErrors.playerName = "Player name is required"
    }
    if (formData.year && !/^\d{4}$/.test(formData.year)) {
      newErrors.year = "Use a 4-digit year"
    }
    if (!formData.correctValue.trim()) {
      newErrors.correctValue = "Please suggest the correction"
    }
    if (!formData.explanation.trim() || formData.explanation.length < 10) {
      newErrors.explanation = "A brief explanation helps us verify"
    }
    if (formData.sourceUrl && !isValidUrl(formData.sourceUrl)) {
      newErrors.sourceUrl = "Provide a valid URL"
    }
    if (formData.additionalSourceUrl && !isValidUrl(formData.additionalSourceUrl)) {
      newErrors.additionalSourceUrl = "Provide a valid URL"
    }
    if (formData.contactEmail && !isValidEmail(formData.contactEmail)) {
      newErrors.contactEmail = "Valid email helps us follow up"
    }
    if (!formData.consent) {
      newErrors.consent = "Please acknowledge our review policy"
    }
    if (!formData.humanCheck.trim()) {
      newErrors.humanCheck = "Answer required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setErrorMsg(null)

    if (!validateForm()) {
      setStatus("error")
      setErrorMsg("Please fix the errors above")
      return
    }

    // lightweight human check
    if (formData.humanCheck.trim() !== "7") {
      setStatus("error")
      setErrorMsg("Human check failed. Please answer the math question.")
      return
    }

    try {
      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStatus("success")
      setFormData({
        playerId: "",
        playerName: "",
        eventId: "",
        eventName: "",
        tour: "",
        year: "",
        field: "Other",
        currentValue: "",
        correctValue: "",
        explanation: "",
        sourceUrl: "",
        additionalSourceUrl: "",
        contactEmail: "",
        consent: false,
        website: "",
        humanCheck: "",
      })
    } catch (err: any) {
      setStatus("error")
      setErrorMsg("Something went wrong submitting the correction. Please try again.")
    }
  }

  if (status === "success") {
    return <SuccessState />
  }

  return (
    <Card className="p-6">
      <div className="space-y-2 mb-4">
        <h1 className="text-2xl font-semibold">Submit a correction</h1>
        <p className="text-sm text-muted-foreground">
          Help us keep DinkBank accurate. Provide context and a reliable source (official tour pages, tournament
          brackets, reputable media). We verify all changes against official purse totals and our methodology.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Context group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="playerName">Player</Label>
            <Input
              id="playerName"
              placeholder="e.g., Anna Leigh Waters"
              value={formData.playerName}
              onChange={(e) => setFormData((prev) => ({ ...prev, playerName: e.target.value }))}
            />
            {errors.playerName && <p className="text-sm text-red-600 mt-1">{errors.playerName}</p>}
          </div>

          <div>
            <Label htmlFor="eventName">Event (optional)</Label>
            <Input
              id="eventName"
              placeholder="e.g., PPA Hyundai Masters"
              value={formData.eventName}
              onChange={(e) => setFormData((prev) => ({ ...prev, eventName: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="tour">Tour (optional)</Label>
            <Select onValueChange={(v) => setFormData((prev) => ({ ...prev, tour: v as any }))} value={formData.tour}>
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
            <Input
              id="year"
              placeholder="2025"
              value={formData.year}
              onChange={(e) => setFormData((prev) => ({ ...prev, year: e.target.value }))}
            />
            {errors.year && <p className="text-sm text-red-600 mt-1">{errors.year}</p>}
          </div>
        </div>

        {/* What needs fixing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="field">What should be corrected?</Label>
            <Select onValueChange={(v) => setFormData((prev) => ({ ...prev, field: v as any }))} value={formData.field}>
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
              value={formData.currentValue}
              onChange={(e) => setFormData((prev) => ({ ...prev, currentValue: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="correctValue">Proposed correction</Label>
            <Input
              id="correctValue"
              placeholder='What it should be, e.g., "$3,000 – Semifinalist"'
              value={formData.correctValue}
              onChange={(e) => setFormData((prev) => ({ ...prev, correctValue: e.target.value }))}
            />
            {errors.correctValue && <p className="text-sm text-red-600 mt-1">{errors.correctValue}</p>}
          </div>
        </div>

        {/* Evidence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="sourceUrl">Source link (preferred)</Label>
            <Input
              id="sourceUrl"
              placeholder="https://..."
              value={formData.sourceUrl}
              onChange={(e) => setFormData((prev) => ({ ...prev, sourceUrl: e.target.value }))}
            />
            {errors.sourceUrl && <p className="text-sm text-red-600 mt-1">{errors.sourceUrl}</p>}
          </div>
          <div>
            <Label htmlFor="additionalSourceUrl">Second source (optional)</Label>
            <Input
              id="additionalSourceUrl"
              placeholder="https://..."
              value={formData.additionalSourceUrl}
              onChange={(e) => setFormData((prev) => ({ ...prev, additionalSourceUrl: e.target.value }))}
            />
            {errors.additionalSourceUrl && <p className="text-sm text-red-600 mt-1">{errors.additionalSourceUrl}</p>}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="explanation">Notes for our team</Label>
            <Textarea
              id="explanation"
              rows={4}
              placeholder="Brief explanation: where the error appears, why it's incorrect, how you verified it…"
              value={formData.explanation}
              onChange={(e) => setFormData((prev) => ({ ...prev, explanation: e.target.value }))}
            />
            {errors.explanation && <p className="text-sm text-red-600 mt-1">{errors.explanation}</p>}
          </div>
        </div>

        {/* Contact + policy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactEmail">Contact email (optional)</Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="name@email.com"
              value={formData.contactEmail}
              onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
            />
            {errors.contactEmail && <p className="text-sm text-red-600 mt-1">{errors.contactEmail}</p>}
          </div>
          <div className="hidden">
            {/* Honeypot */}
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              placeholder="Leave blank"
              value={formData.website}
              onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="consent"
            checked={formData.consent}
            onCheckedChange={(v) => setFormData((prev) => ({ ...prev, consent: Boolean(v) }))}
          />
          <div className="grid gap-1 leading-none">
            <Label htmlFor="consent">I acknowledge DinkBank will review submissions before updating records.</Label>
            <p className="text-xs text-muted-foreground">
              We reconcile changes against official purse totals and our methodology. Submissions may be edited for
              clarity.
            </p>
            {errors.consent && <p className="text-sm text-red-600 mt-1">{errors.consent}</p>}
          </div>
        </div>

        {/* Lightweight anti-bot */}
        <div className="max-w-xs">
          <Label htmlFor="humanCheck">{humanQuestion}</Label>
          <Input
            id="humanCheck"
            placeholder="Answer"
            value={formData.humanCheck}
            onChange={(e) => setFormData((prev) => ({ ...prev, humanCheck: e.target.value }))}
          />
          {errors.humanCheck && <p className="text-sm text-red-600 mt-1">{errors.humanCheck}</p>}
        </div>

        {status === "error" && errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

        <div className="flex gap-3">
          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting…" : "Submit correction"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              setFormData({
                playerId: "",
                playerName: "",
                eventId: "",
                eventName: "",
                tour: "",
                year: "",
                field: "Other",
                currentValue: "",
                correctValue: "",
                explanation: "",
                sourceUrl: "",
                additionalSourceUrl: "",
                contactEmail: "",
                consent: false,
                website: "",
                humanCheck: "",
              })
            }
            disabled={status === "submitting"}
          >
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

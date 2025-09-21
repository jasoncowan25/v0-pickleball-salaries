"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const categories = ["general", "data-correction", "press", "partnership"] as const
const categoryLabels = {
  general: "General Inquiry",
  "data-correction": "Data Correction",
  press: "Press Inquiry",
  partnership: "Partnership",
}

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    category: "general",
    subject: "",
    message: "",
    consent: false,
  })
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle")
  const [formError, setFormError] = React.useState<string>("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("idle")
    setFormError("")
    setIsSubmitting(true)

    // Basic validation
    if (!formData.name.trim()) {
      setFormError("Name is required")
      setIsSubmitting(false)
      return
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setFormError("Valid email is required")
      setIsSubmitting(false)
      return
    }
    if (!formData.subject.trim()) {
      setFormError("Subject is required")
      setIsSubmitting(false)
      return
    }
    if (!formData.message.trim()) {
      setFormError("Message is required")
      setIsSubmitting(false)
      return
    }
    if (!formData.consent) {
      setFormError("You must agree to the Terms and Privacy Policy")
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStatus("success")
      setFormData({
        name: "",
        email: "",
        category: "general",
        subject: "",
        message: "",
        consent: false,
      })
    } catch {
      setStatus("error")
      setFormError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Contact DinkBank</CardTitle>
          <CardDescription>
            Questions, corrections, or press inquiries? Use this form and we'll get back to you.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} noValidate>
          <CardContent className="space-y-6">
            {status === "success" && (
              <p
                role="status"
                aria-live="polite"
                className="rounded-md border border-green-600/30 bg-green-600/10 px-3 py-2 text-sm"
              >
                Thanks! Your message was sent.
              </p>
            )}
            {status === "error" && (
              <p
                role="alert"
                aria-live="assertive"
                className="rounded-md border border-red-600/30 bg-red-600/10 px-3 py-2 text-sm"
              >
                {formError}
              </p>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {categoryLabels[c]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, consent: !!checked }))}
              />
              <div className="space-y-1">
                <Label htmlFor="consent" className="font-normal">
                  I agree to the Terms and Privacy Policy.
                </Label>
                <p className="text-xs text-muted-foreground">
                  By submitting, you agree to our{" "}
                  <a className="underline" href="/terms">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a className="underline" href="/privacy">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Need to fix an earnings line? See{" "}
              <a className="underline" href="/submit-correction">
                Submit a Correction
              </a>{" "}
              or review our{" "}
              <a className="underline" href="/methodology">
                Methodology
              </a>
              .
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send message"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

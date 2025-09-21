"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { contactSchema, type ContactInput, categoryLabels, categories } from "@/lib/validation/contact"

export default function ContactPage() {
  const [renderedAt] = React.useState<number>(() => Date.now())
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle")
  const [formError, setFormError] = React.useState<string>("")

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      category: "general",
      subject: "",
      message: "",
      consent: false,
      company: "", // honeypot
      renderedAt,
    },
  })

  async function onSubmit(values: ContactInput) {
    setStatus("idle")
    setFormError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        setStatus("error")
        setFormError(json?.error ?? "Something went wrong.")
        return
      }
      setStatus("success")
      reset({
        ...values,
        name: "",
        email: "",
        subject: "",
        message: "",
        consent: false,
        company: "",
        renderedAt: Date.now(),
        category: "general",
      })
    } catch {
      setStatus("error")
      setFormError("Network error. Please try again.")
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                <Input id="name" aria-invalid={!!errors.name} {...register("name")} />
                {errors.name && <FieldError msg={errors.name.message} />}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" aria-invalid={!!errors.email} {...register("email")} />
                {errors.email && <FieldError msg={errors.email.message} />}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                defaultValue="general"
                onValueChange={(v) => setValue("category", v as any, { shouldValidate: true })}
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
              <Input id="subject" aria-invalid={!!errors.subject} {...register("subject")} />
              {errors.subject && <FieldError msg={errors.subject.message} />}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={6} aria-invalid={!!errors.message} {...register("message")} />
              {errors.message && <FieldError msg={errors.message.message} />}
            </div>

            <div className="flex items-start gap-3">
              <Checkbox id="consent" {...register("consent")} />
              <div className="space-y-1">
                <Label htmlFor="consent" className="font-normal">
                  I agree to the Terms and Privacy Policy.
                </Label>
                {errors.consent && <FieldError msg={errors.consent.message} />}
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

            {/* Honeypot + timing */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
              {...register("company")}
            />
            <input type="hidden" value={renderedAt} {...register("renderedAt", { valueAsNumber: true })} />
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

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-xs text-red-600">{msg}</p>
}

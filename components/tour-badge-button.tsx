"use client"

import { Suspense } from "react"
import { Badge } from "@/components/ui/badge"
import { useSearchParams, useRouter } from "next/navigation"

type Tour = "PPA" | "MLP" | "APP"

interface TourBadgeButtonProps {
  tour: Tour
  active: boolean
  isPrimary?: boolean
}

function TourBadgeButtonContent({ tour, active, isPrimary = false }: TourBadgeButtonProps) {
  const router = useRouter()
  const params = useSearchParams()
  const current = params.get("tour") ?? "all"
  const next = current.toUpperCase() === tour ? "all" : tour

  const onClick = () => {
    const q = new URLSearchParams(params.toString())
    if (next === "all") {
      q.delete("tour")
    } else {
      q.set("tour", next.toLowerCase())
    }
    router.push(`/players?${q.toString()}`)
  }

  const isActive = current.toUpperCase() === tour

  return (
    <button
      type="button"
      onClick={onClick}
      role="button"
      aria-pressed={isActive}
      className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      title={`Filter by ${tour}`}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
    >
      <Badge
        variant={isActive ? "default" : "outline"}
        className={`cursor-pointer transition-colors ${
          isPrimary && !isActive ? "ring-1 ring-foreground/20 ring-offset-1 ring-offset-background shadow-sm" : ""
        }`}
      >
        {tour}
      </Badge>
    </button>
  )
}

export function TourBadgeButton({ tour, active, isPrimary = false }: TourBadgeButtonProps) {
  return (
    <Suspense
      fallback={
        <Badge variant="outline" className="cursor-pointer">
          {tour}
        </Badge>
      }
    >
      <TourBadgeButtonContent tour={tour} active={active} isPrimary={isPrimary} />
    </Suspense>
  )
}

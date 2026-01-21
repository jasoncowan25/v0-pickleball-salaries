"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const TOURS = [
  { id: "ppa", label: "PPA", href: "/prize-money/ppa" },
  { id: "mlp", label: "MLP", href: "/prize-money/mlp" },
  { id: "app", label: "APP", href: "/prize-money/app" },
] as const

interface TourSwitcherProps {
  currentTour: "ppa" | "mlp" | "app"
}

export function TourSwitcher({ currentTour }: TourSwitcherProps) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
        Tour
      </label>
      <div
        className="inline-flex rounded-lg border bg-muted/30 p-1 w-full sm:w-auto"
        role="tablist"
        aria-label="Tour selection"
      >
        {TOURS.map((tour) => (
          <Link
            key={tour.id}
            href={tour.href}
            role="tab"
            aria-selected={currentTour === tour.id}
            aria-current={currentTour === tour.id ? "page" : undefined}
            className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              currentTour === tour.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tour.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

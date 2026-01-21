"use client"

import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import type { YearData } from "@/lib/prize-money-data"

interface TourSummaryStripProps {
  yearData: YearData
}

export function TourSummaryStrip({ yearData }: TourSummaryStripProps) {
  const tourColors: Record<string, string> = {
    PPA: "border-l-amber-500",
    MLP: "border-l-blue-500",
    APP: "border-l-green-500",
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3 mb-8">
      {yearData.tours.map((tour) => (
        <a
          key={tour.tour}
          href={`#${tour.tour.toLowerCase()}`}
          className="block group"
        >
          <Card
            className={`p-4 border-l-4 ${tourColors[tour.tour]} hover:bg-muted/30 transition-colors`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{tour.tourLabel}</h3>
                <p className="text-sm text-muted-foreground">
                  {tour.eventTypes.length} event type{tour.eventTypes.length !== 1 ? "s" : ""}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </a>
      ))}
    </div>
  )
}

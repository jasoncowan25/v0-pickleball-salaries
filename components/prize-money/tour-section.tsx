"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import type { TourSection as TourSectionType } from "@/lib/prize-money-data"
import { EventTypeSelector } from "./event-type-selector"
import { PayoutTableCard } from "./payout-table-card"
import { SourcesBlock } from "./sources-block"
import { CopyLinkButton } from "./copy-buttons"

interface TourSectionProps {
  tourSection: TourSectionType
  defaultEventTypeId?: string
}

export function TourSection({ tourSection, defaultEventTypeId }: TourSectionProps) {
  const [selectedEventType, setSelectedEventType] = useState(
    defaultEventTypeId || tourSection.eventTypes[0]?.id || ""
  )

  const currentEventType = tourSection.eventTypes.find((et) => et.id === selectedEventType)
  const sectionId = `${tourSection.tour.toLowerCase()}`

  return (
    <section id={sectionId} className="scroll-mt-24">
      <Card className="p-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold">{tourSection.tourLabel}</h2>
              <CopyLinkButton sectionId={sectionId} />
            </div>
            <p className="text-muted-foreground">{tourSection.description}</p>
          </div>
        </div>

        {/* Event Type Selector */}
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Event Type
          </div>
          <EventTypeSelector
            eventTypes={tourSection.eventTypes}
            value={selectedEventType}
            onChange={setSelectedEventType}
          />
        </div>

        {/* Event Type Description */}
        {currentEventType?.description && (
          <p className="text-sm text-muted-foreground mb-4 p-3 bg-muted/30 rounded-lg">
            {currentEventType.description}
          </p>
        )}

        {/* Division Tables */}
        {currentEventType && (
          <div className="space-y-4" id={`${sectionId}-${currentEventType.id}`}>
            {currentEventType.tables.map((table) => (
              <PayoutTableCard
                key={table.division}
                table={table}
                eventLabel={`${tourSection.tourLabel} ${currentEventType.label}`}
                sectionId={`${sectionId}-${currentEventType.id}`}
              />
            ))}
          </div>
        )}

        {/* Sources */}
        <SourcesBlock sources={tourSection.sources} effectiveSeason={tourSection.effectiveSeason} />
      </Card>
    </section>
  )
}

"use client"

import type { EventType } from "@/lib/prize-money-data"

interface EventTypeSelectorProps {
  eventTypes: EventType[]
  value: string
  onChange: (eventTypeId: string) => void
}

export function EventTypeSelector({ eventTypes, value, onChange }: EventTypeSelectorProps) {
  return (
    <div className="inline-flex flex-wrap rounded-lg border bg-muted/30 p-1 w-full sm:w-auto">
      {eventTypes.map((eventType) => (
        <button
          key={eventType.id}
          onClick={() => onChange(eventType.id)}
          type="button"
          className={`flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
            value === eventType.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {eventType.label}
        </button>
      ))}
    </div>
  )
}

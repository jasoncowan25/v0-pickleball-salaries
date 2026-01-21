"use client"

import { Button } from "@/components/ui/button"
import type { EventType } from "@/lib/prize-money-data"

interface EventTypeSelectorProps {
  eventTypes: EventType[]
  value: string
  onChange: (eventTypeId: string) => void
}

export function EventTypeSelector({ eventTypes, value, onChange }: EventTypeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {eventTypes.map((eventType) => (
        <Button
          key={eventType.id}
          variant={value === eventType.id ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(eventType.id)}
          className={value === eventType.id ? "bg-primary text-primary-foreground" : ""}
        >
          {eventType.label}
        </Button>
      ))}
    </div>
  )
}

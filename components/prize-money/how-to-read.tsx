"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"

export function HowToRead() {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="mb-6 bg-muted/30">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-sm">How to read this page</span>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t">
          <div className="grid gap-4 sm:grid-cols-2 mt-4 text-sm">
            <div>
              <h4 className="font-semibold mb-1">Payout Amounts</h4>
              <p className="text-muted-foreground">
                All amounts shown in USD. "Per Team" payouts are split between partners in doubles events.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Event Types</h4>
              <p className="text-muted-foreground">
                Each tour has different event tiers with varying prize pools. Select an event type to see its payout structure.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Tours</h4>
              <p className="text-muted-foreground">
                PPA, MLP, and APP each have unique payout structures. Use the tabs to switch between tours or view all at once.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Copy & Share</h4>
              <p className="text-muted-foreground">
                Use the CSV button to copy table data, or the Link button to copy a direct link to any section.
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

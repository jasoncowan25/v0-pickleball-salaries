"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatShortDate } from "@/lib/format"
import { getPlayerPayouts } from "@/lib/rank"
import type { Player } from "@/lib/mock-data"
import { useState } from "react"

interface EarningsBreakdownProps {
  player: Player
}

export function EarningsBreakdown({ player }: EarningsBreakdownProps) {
  const [open, setOpen] = useState(false)
  const recentPayouts = getPlayerPayouts(player.id).slice(0, 5)

  const getConfidenceBadgeVariant = (confidence: string) => {
    switch (confidence) {
      case "confirmed":
        return "default" // green
      case "reported":
        return "secondary" // amber
      case "estimated":
        return "outline" // slate
      default:
        return "outline"
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setOpen(true)
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation()
            e.preventDefault()
            setOpen(true)
          }
        }}
        aria-label={`Open earnings breakdown for ${player.name}`}
        className="pointer-events-auto"
      >
        Breakdown
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onClick={(e) => e.stopPropagation()} className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{player.name} - Earnings Breakdown</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Stacked Totals */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-black">{formatCurrency(player.totals.ytdPrize)}</div>
                <div className="text-sm text-muted-foreground">Prize Money</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{formatCurrency(player.totals.reportedContracts || 0)}</div>
                <div className="text-sm text-muted-foreground">Contracts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{formatCurrency(player.totals.endorsementsEstimate || 0)}</div>
                <div className="text-sm text-muted-foreground">Endorsements</div>
              </div>
            </div>

            {/* Recent Payouts */}
            <div>
              <h3 className="font-semibold mb-3">Recent Payouts</h3>
              <div className="space-y-2">
                {recentPayouts.map((payout) => (
                  <div key={payout.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex-1">
                      <div className="font-medium">{payout.eventName}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatShortDate(payout.date)} • {payout.bracket} {payout.result}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">{formatCurrency(payout.prize)}</div>
                      <Badge variant={getConfidenceBadgeVariant(payout.sources[0]?.confidence)}>
                        {payout.sources[0]?.confidence}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Confidence Legend */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">Confidence Levels</h4>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Badge variant="default">confirmed</Badge>
                  <span className="text-muted-foreground">Official results</span>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary">reported</Badge>
                  <span className="text-muted-foreground">Media reports</span>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">estimated</Badge>
                  <span className="text-muted-foreground">Calculated estimates</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

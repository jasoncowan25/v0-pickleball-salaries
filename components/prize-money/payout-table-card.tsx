"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Info } from "lucide-react"
import type { PayoutTable } from "@/lib/prize-money-data"
import { formatCurrencyUSD } from "@/lib/format"
import { CopyCSVButton, CopyLinkButton } from "./copy-buttons"
import { cn } from "@/lib/utils"

interface PayoutTableCardProps {
  table: PayoutTable
  eventLabel: string
  sectionId: string
  defaultExpanded?: boolean
  hideActions?: boolean
}

export function PayoutTableCard({
  table,
  eventLabel,
  sectionId,
  defaultExpanded = true,
  hideActions = false,
}: PayoutTableCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [showNotes, setShowNotes] = useState(false)
  const hasNotes = table.rows.some((row) => row.note)

  const fullSectionId = `${sectionId}-${table.division}`

  return (
    <Card className="overflow-hidden" id={fullSectionId}>
      {/* Header - Always visible */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <h4 className="font-semibold">{table.divisionLabel}</h4>
          <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
            {table.payoutBasis === "per-team" ? "Per Team" : "Per Player"}
          </span>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t">
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left py-2 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wider sticky left-0 bg-muted/30">
                    Placement
                  </th>
                  <th className="text-right py-2 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                    Amount
                  </th>
                  {showNotes && hasNotes && (
                    <th className="text-left py-2 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      Notes
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, index) => (
                  <tr
                    key={row.placement}
                    className={cn(
                      "border-b last:border-b-0",
                      index === 0 && "bg-amber-50/50"
                    )}
                  >
                    <td className="py-2.5 px-4 font-medium sticky left-0 bg-background">
                      {row.placement}
                    </td>
                    <td className="py-2.5 px-4 text-right tabular-nums font-semibold">
                      {formatCurrencyUSD(row.amount)}
                    </td>
                    {showNotes && hasNotes && (
                      <td className="py-2.5 px-4 text-sm text-muted-foreground">
                        {row.note || "—"}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden p-3 space-y-2">
            {table.rows.map((row, index) => (
              <div
                key={row.placement}
                className={cn(
                  "flex justify-between items-center p-3 rounded-lg",
                  index === 0 ? "bg-amber-50 border border-amber-200" : "bg-muted/30"
                )}
              >
                <div>
                  <div className="font-medium">{row.placement}</div>
                  {showNotes && row.note && (
                    <div className="text-xs text-muted-foreground mt-0.5">{row.note}</div>
                  )}
                </div>
                <div className="font-semibold tabular-nums">{formatCurrencyUSD(row.amount)}</div>
              </div>
            ))}
          </div>

          {/* Footer with actions */}
          {!hideActions && (
            <div className="flex items-center justify-between px-4 py-2 border-t bg-muted/20">
              <div className="flex items-center gap-1">
                <CopyCSVButton table={table} eventLabel={`${eventLabel} - ${table.divisionLabel}`} />
                <CopyLinkButton sectionId={fullSectionId} />
              </div>
              {hasNotes && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotes(!showNotes)}
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                >
                  <Info className="w-3.5 h-3.5 mr-1" />
                  {showNotes ? "Hide Notes" : "Show Notes"}
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

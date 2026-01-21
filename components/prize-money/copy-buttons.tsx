"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Link, Check } from "lucide-react"
import type { PayoutTable } from "@/lib/prize-money-data"
import { formatCurrencyUSD } from "@/lib/format"

interface CopyCSVButtonProps {
  table: PayoutTable
  eventLabel: string
}

export function CopyCSVButton({ table, eventLabel }: CopyCSVButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const header = `Placement,Amount (${table.payoutBasis === "per-team" ? "Per Team" : "Per Player"})`
    const rows = table.rows.map((row) => `"${row.placement}",${row.amount}`)
    const csv = [
      `# ${eventLabel} - ${table.divisionLabel}`,
      header,
      ...rows,
    ].join("\n")

    navigator.clipboard.writeText(csv)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="h-8 px-2 text-muted-foreground hover:text-foreground"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 mr-1" />
          Copied
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 mr-1" />
          CSV
        </>
      )}
    </Button>
  )
}

interface CopyLinkButtonProps {
  sectionId: string
}

export function CopyLinkButton({ sectionId }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="h-8 px-2 text-muted-foreground hover:text-foreground"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 mr-1" />
          Copied
        </>
      ) : (
        <>
          <Link className="w-3.5 h-3.5 mr-1" />
          Link
        </>
      )}
    </Button>
  )
}

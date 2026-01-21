"use client"

import { Button } from "@/components/ui/button"
import type { PayoutBasis } from "@/lib/prize-money-data"

interface PayoutBasisToggleProps {
  value: PayoutBasis
  onChange: (basis: PayoutBasis) => void
}

export function PayoutBasisToggle({ value, onChange }: PayoutBasisToggleProps) {
  return (
    <div className="flex gap-1 p-1 bg-muted rounded-lg">
      <Button
        variant={value === "per-player" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onChange("per-player")}
        className={value === "per-player" ? "bg-background shadow-sm" : ""}
      >
        Per Player
      </Button>
      <Button
        variant={value === "per-team" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onChange("per-team")}
        className={value === "per-team" ? "bg-background shadow-sm" : ""}
      >
        Per Team
      </Button>
    </div>
  )
}

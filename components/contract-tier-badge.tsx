"use client"

import { cn } from "@/lib/utils"

export type ContractTier = "gold" | "futures" | "standard" | "unsigned"

interface ContractTierBadgeProps {
  tier: ContractTier | null | undefined
  clickable?: boolean
  onClick?: (tier: ContractTier) => void
  className?: string
}

export function ContractTierBadge({ tier, clickable = false, onClick, className }: ContractTierBadgeProps) {
  const normalizedTier: ContractTier = tier || "unsigned"

  const tierConfig = {
    gold: {
      label: "Gold Card",
      bgClass: "bg-amber-50/70 dark:bg-amber-950/20",
      textClass: "text-amber-800 dark:text-amber-300",
      borderClass: "border-amber-200/40 dark:border-amber-800/40",
      showDot: false,
    },
    futures: {
      label: "Futures",
      bgClass: "bg-blue-50/50 dark:bg-blue-950/20",
      textClass: "text-blue-700 dark:text-blue-300",
      borderClass: "border-blue-200/30 dark:border-blue-800/30",
      showDot: false,
    },
    standard: {
      label: "Standard",
      bgClass: "bg-gray-50 dark:bg-gray-900/30",
      textClass: "text-gray-700 dark:text-gray-300",
      borderClass: "border-gray-200/50 dark:border-gray-700/50",
      showDot: false,
    },
    unsigned: {
      label: "Unsigned",
      bgClass: "bg-transparent dark:bg-transparent",
      textClass: "text-gray-500 dark:text-gray-400",
      borderClass: "border-gray-300 dark:border-gray-600",
      showDot: false,
    },
  }

  const config = tierConfig[normalizedTier]

  const handleClick = () => {
    if (clickable && onClick) {
      onClick(normalizedTier)
    }
  }

  return (
    <span
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium border transition-colors",
        config.bgClass,
        config.textClass,
        config.borderClass,
        clickable && "cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-current/20",
        className,
      )}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {config.showDot && <span className="text-[8px]">•</span>}
      {config.label}
    </span>
  )
}

export function getContractTierLabel(tier: ContractTier | null | undefined, short = false): string {
  const normalizedTier: ContractTier = tier || "unsigned"

  const labels = {
    gold: short ? "Gold" : "Gold Card",
    futures: "Futures",
    standard: short ? "Std" : "Standard",
    unsigned: "Unsigned",
  }

  return labels[normalizedTier]
}

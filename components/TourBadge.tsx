"use client"

import type React from "react"

import { TOUR_META, type TourCode } from "@/lib/tours"
import { cn } from "@/lib/utils"

type Props = {
  code: TourCode
  primary?: boolean
  className?: string
  clickable?: boolean
  onClick?: (tour: TourCode) => void
}

const tourColors = {
  PPA: "bg-blue-100 text-blue-800",
  MLP: "bg-green-100 text-green-800",
  APP: "bg-purple-100 text-purple-800",
}

export function TourBadge({ code, primary = false, className, clickable = false, onClick }: Props) {
  const tourInfo = TOUR_META[code]

  const handleClick = () => {
    if (clickable && onClick) {
      onClick(code)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (clickable && onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault()
      onClick(code)
    }
  }

  const baseClasses = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
  const interactiveClasses = clickable
    ? "cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    : "cursor-default"

  const Component = clickable ? "button" : "div"

  return (
    <Component
      role={clickable ? "button" : "img"}
      aria-label={tourInfo.full}
      aria-disabled={!clickable}
      tabIndex={clickable ? 0 : -1}
      title={tourInfo.full}
      onClick={clickable ? handleClick : undefined}
      onKeyDown={clickable ? handleKeyDown : undefined}
      className={cn(
        baseClasses,
        tourColors[code],
        primary && "ring-1 ring-black/10 shadow-sm font-semibold",
        interactiveClasses,
        className,
      )}
    >
      {tourInfo.label}
    </Component>
  )
}

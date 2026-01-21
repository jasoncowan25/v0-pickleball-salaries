"use client"

import React from "react"

import { useState } from "react"

interface TooltipProps {
  children: React.ReactNode
  content: string
  subtitle?: string
}

export function TooltipCustom({ children, content, subtitle }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1.5 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap z-50 pointer-events-none animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="font-semibold">{content}</div>
          {subtitle && <div className="text-gray-300 mt-0.5">{subtitle}</div>}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  )
}

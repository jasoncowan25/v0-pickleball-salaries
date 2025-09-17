"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTopOnRoute() {
  const pathname = usePathname()
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
    }
  }, [pathname])
  return null
}

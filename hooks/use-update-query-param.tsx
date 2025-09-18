"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function useUpdateQueryParam() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    router.replace(`${pathname}?${next.toString()}`)
  }
}

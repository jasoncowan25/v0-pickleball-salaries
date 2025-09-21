"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const current = params.get("lang") ?? "en"

  const onChange = (val: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set("lang", val)
    router.push(url.pathname + "?" + url.searchParams.toString())
  }

  return (
    <div className="w-[180px]">
      <Select value={current} onValueChange={onChange}>
        <SelectTrigger aria-label="Language">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">Français</SelectItem>
          <SelectItem value="es">Español</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

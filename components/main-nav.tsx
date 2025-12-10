"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

const NAV = [
  { name: "Earnings Leaders", href: "/" },
  { name: "Players", href: "/players" },
  { name: "Events", href: "/events" },
  { name: "Methodology", href: "/methodology" },
  { name: "Reports", href: "/reports" },
]

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function MainNav() {
  const pathname = usePathname()
  return (
    <nav className="flex items-center gap-4">
      {NAV.map((item) => {
        const active = isActive(pathname, item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={clsx(
              "text-sm transition-colors relative",
              active
                ? "text-foreground font-medium after:block after:h-0.5 after:bg-foreground after:mt-1"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}

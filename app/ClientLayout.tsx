"use client"
import Link from "next/link"
import type { ReactNode } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
import { MainNav } from "@/components/main-nav"
import clsx from "clsx"
import SiteFooter from "@/components/site-footer"

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function ClientLayout({
  children,
}: {
  children: ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  const handleNav = (href: string, isExternal?: boolean) => (e: React.MouseEvent) => {
    setOpen(false)
    if (isExternal) return
    e.preventDefault()
    router.push(href)
  }

  const mobileNavItems = [
    { name: "Earnings Leaders", href: "/" },
    { name: "Players", href: "/players" },
    { name: "Events", href: "/events" },
    { name: "Methodology", href: "/methodology" },
    { name: "Sources", href: "/sources" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-background backdrop-blur-sm md:bg-background/95 md:backdrop-blur supports-[backdrop-filter]:md:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center gap-0">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/dinkbank_logo.png" alt="DinkBank Logo" width={160} height={40} className="w-auto h-7" />
          </Link>

          <div className="hidden md:flex">
            <MainNav />
          </div>

          <div className="md:hidden ml-auto">
            <Sheet open={open} onOpenChange={setOpen} modal>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-11 w-11 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-11 w-11 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label="Close menu"
                  ></Button>
                </div>
                <nav className="flex flex-col space-y-2 mt-6">
                  {mobileNavItems.map((item) => {
                    const active = isActive(pathname, item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={clsx(
                          "text-lg font-medium transition-colors py-2 px-3 rounded-md min-h-[44px] flex items-center",
                          active
                            ? "text-foreground bg-muted/60 font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
                        )}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                  <div className="pt-4 border-t">
                    <Link
                      href="/submit-correction"
                      onClick={() => setOpen(false)}
                      className="text-sm text-muted-foreground hover:text-foreground py-2 px-3 rounded-md min-h-[44px] flex items-center"
                    >
                      Submit a correction
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main id="main" className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      <SiteFooter />
    </div>
  )
}

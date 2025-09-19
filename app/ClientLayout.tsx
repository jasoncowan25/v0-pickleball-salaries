"use client"
import Link from "next/link"
import type { ReactNode } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import React from "react"

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

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/dink-bank-logo.png" alt="Dink Bank Logo" width={130} height={24} className="h-6 w-[130px]" />
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80">
              Earnings Leaders
            </Link>
            <Link href="/players" className="transition-colors hover:text-foreground/80">
              Players
            </Link>
            <Link href="/events" className="transition-colors hover:text-foreground/80">
              Events
            </Link>
            <Link href="/methodology" className="transition-colors hover:text-foreground/80">
              Methodology
            </Link>
            <Link href="/sources" className="transition-colors hover:text-foreground/80">
              Sources
            </Link>
          </nav>

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
                <nav className="flex flex-col space-y-4 mt-6">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium transition-colors hover:text-foreground/80"
                  >
                    Earnings Leaders
                  </Link>
                  <Link
                    href="/players"
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium transition-colors hover:text-foreground/80"
                  >
                    Players
                  </Link>
                  <Link
                    href="/events"
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium transition-colors hover:text-foreground/80"
                  >
                    Events
                  </Link>
                  <Link
                    href="/methodology"
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium transition-colors hover:text-foreground/80"
                  >
                    Methodology
                  </Link>
                  <Link
                    href="/sources"
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium transition-colors hover:text-foreground/80"
                  >
                    Sources
                  </Link>
                  <div className="pt-4 border-t">
                    <a
                      href="https://forms.gle/your-corrections-form"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleNav("https://forms.gle/your-corrections-form", true)}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Submit a correction
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
    </>
  )
}

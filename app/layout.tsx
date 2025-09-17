import "@/app/globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import ScrollToTopOnRoute from "@/components/scroll-to-top-on-route"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Dink Bank - Professional Pickleball Earnings Tracker",
  description: "Track professional pickleball earnings across PPA, MLP, and APP tours with Dink Bank",
  openGraph: {
    title: "Dink Bank - Professional Pickleball Earnings Tracker",
    description: "Track professional pickleball earnings across PPA, MLP, and APP tours with Dink Bank",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollToTopOnRoute />
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Image src="/dink-bank-logo.png" alt="Dink Bank Logo" width={130} height={24} className="h-6 w-[130px]" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link href="/" className="transition-colors hover:text-foreground/80">
                Money List
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

            {/* Mobile Navigation */}
            <div className="md:hidden ml-auto">
              <Sheet>
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
                    >
                      {/* Close icon or text can be added here */}
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-4 mt-6">
                    <Link href="/" className="text-lg font-medium transition-colors hover:text-foreground/80">
                      Money List
                    </Link>
                    <Link href="/players" className="text-lg font-medium transition-colors hover:text-foreground/80">
                      Players
                    </Link>
                    <Link href="/events" className="text-lg font-medium transition-colors hover:text-foreground/80">
                      Events
                    </Link>
                    <Link
                      href="/methodology"
                      className="text-lg font-medium transition-colors hover:text-foreground/80"
                    >
                      Methodology
                    </Link>
                    <Link href="/sources" className="text-lg font-medium transition-colors hover:text-foreground/80">
                      Sources
                    </Link>
                    <div className="pt-4 border-t">
                      <Link href="/submit-correction" className="text-sm text-muted-foreground hover:text-foreground">
                        Submit a correction
                      </Link>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  )
}

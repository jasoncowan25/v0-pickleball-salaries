import "@/app/globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"
import ScrollToTopOnRoute from "@/components/scroll-to-top-on-route"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pickleball Earnings Leaders – Pro Prize Money & Contracts Tracker | Dink Bank",
  description: "Tracking pro pickleball prize money and contracts across PPA, MLP, and APP tours.",
  openGraph: {
    title: "Pickleball Earnings Leaders – Pro Prize Money & Contracts Tracker | Dink Bank",
    description: "Tracking pro pickleball prize money and contracts across PPA, MLP, and APP tours.",
    type: "website",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-dvh w-full antialiased bg-background text-foreground`}>
        <ScrollToTopOnRoute />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

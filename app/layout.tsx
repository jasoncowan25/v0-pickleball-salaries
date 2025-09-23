import "@/app/globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"
import ScrollToTopOnRoute from "@/components/scroll-to-top-on-route"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pickleball Earnings Leaders – Pro Prize Money & Contracts Tracker | DinkBank",
  description: "Tracking pro pickleball prize money and contracts across PPA, MLP, and APP tours.",
  icons: {
    icon: [
      { url: "/dinkbank_favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/dinkbank_favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/dinkbank_favicon.png",
  },
  openGraph: {
    title: "Pickleball Earnings Leaders – Pro Prize Money & Contracts Tracker | DinkBank",
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
      <body className={`${inter.className} w-full antialiased bg-background text-foreground`}>
        <ScrollToTopOnRoute />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

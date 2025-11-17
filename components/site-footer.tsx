"use client"

import Link from "next/link"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import LanguageSwitcher from "@/components/language-switcher"

export default function SiteFooter() {
  return (
    <footer role="contentinfo" aria-labelledby="footer-heading" className="border-t bg-muted/40">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Main Columns - Desktop */}
      <div className="container mx-auto hidden grid-cols-4 gap-8 px-6 py-12 lg:grid">
        <FooterColumn
          title="Trust & Data"
          links={[
            { label: "Methodology", href: "/methodology" },
            { label: "Data Sources", href: "/methodology#sources" },
            { label: "Submit a Correction", href: "/submit-correction" },
            { label: "Disclaimer", href: "/disclaimer" },
          ]}
        />
        <FooterColumn
          title="Company"
          links={[
            { label: "About DinkBank", href: "/about" },
            { label: "Press & Media", href: "/press" },
            { label: "Contact Us", href: "/contact" },
            { label: "Careers", href: "/careers" },
          ]}
        />
        <FooterColumn
          title="Legal"
          links={[
            { label: "Terms of Service", href: "/terms" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Cookie Policy", href: "/cookies" },
            { label: "Accessibility", href: "/accessibility" },
          ]}
        />
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Connect</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href="https://twitter.com/DinkBankHQ"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                X (Twitter)
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/DinkBankHQ"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram
              </a>
            </li>
          </ul>
          <div className="mt-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Accordion - Mobile/Tablet */}
      <div className="container mx-auto px-4 py-6 lg:hidden">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="trust">
            <AccordionTrigger>Trust &amp; Data</AccordionTrigger>
            <AccordionContent>
              <MobileList
                links={[
                  { label: "Methodology", href: "/methodology" },
                  { label: "Data Sources", href: "/methodology#sources" },
                  { label: "Submit a Correction", href: "/submit-correction" },
                  { label: "Disclaimer", href: "/disclaimer" },
                ]}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="company">
            <AccordionTrigger>Company</AccordionTrigger>
            <AccordionContent>
              <MobileList
                links={[
                  { label: "About DinkBank", href: "/about" },
                  { label: "Press & Media", href: "/press" },
                  { label: "Contact Us", href: "/contact" },
                  { label: "Careers", href: "/careers" },
                ]}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="legal">
            <AccordionTrigger>Legal</AccordionTrigger>
            <AccordionContent>
              <MobileList
                links={[
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Cookie Policy", href: "/cookies" },
                  { label: "Accessibility", href: "/accessibility" },
                ]}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="connect">
            <AccordionTrigger>Connect</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://twitter.com/DinkBankHQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    X (Twitter)
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/DinkBankHQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
              <div className="mt-4">
                <LanguageSwitcher />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Bottom bar */}
      <div className="border-t">
        <div className="container mx-auto flex flex-col gap-3 px-4 py-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-foreground">DinkBank</span>
            <span>© {new Date().getFullYear()} DinkBank. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span>Independent resource; not affiliated with PPA, MLP, APP, or governing bodies.</span>
            <span className="hidden md:inline">•</span>
            <Link className="hover:underline" href="/terms">
              Terms
            </Link>
            <span>·</span>
            <Link className="hover:underline" href="/privacy">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function MobileList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} className="hover:underline">
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

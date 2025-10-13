import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

type SourceItem = {
  tour: "PPA" | "MLP" | "APP"
  title: string
  href: string
  description: string
  status: "confirmed"
}

const sources: SourceItem[] = [
  {
    tour: "PPA",
    title: "PPA Tour Official Results",
    href: "https://www.ppatour.com",
    description: "Official brackets, prize distributions, and event recaps.",
    status: "confirmed",
  },
  {
    tour: "MLP",
    title: "Major League Pickleball Results",
    href: "https://www.majorleaguepickleball.net",
    description: "Official team results, payouts, and championship summaries.",
    status: "confirmed",
  },
  {
    tour: "APP",
    title: "APP Tour Results & Reports",
    href: "https://www.apptour.org",
    description: "Official results and purse information for APP Tour events.",
    status: "confirmed",
  },
]

export default function SourcesPage() {
  return (
    <main aria-labelledby="sources-heading" className="container py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8 md:mb-12">
        <h1 id="sources-heading" className="text-3xl font-bold tracking-tight mb-3">
          Sources
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Verified sources used to compile professional pickleball prize money and earnings data, organized by tour.
        </p>
      </div>

      {/* Source Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mb-12">
        {sources.map((source) => (
          <Card key={source.tour} className="group h-full transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div className="space-y-1.5">
                <CardTitle className="text-base sm:text-lg">{source.title}</CardTitle>
                <CardDescription>{source.description}</CardDescription>
              </div>
              <Badge className="shrink-0 bg-yellow-400 text-black hover:bg-yellow-400 uppercase">Confirmed</Badge>
            </CardHeader>
            <CardContent>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${source.title} in a new tab`}
                className="inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
              >
                {source.href.replace("https://www.", "")}
                <ExternalLink className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Notes Section */}
      <div className="text-sm text-muted-foreground max-w-3xl">
        <p>
          Additional verified sources (media, player, or tour confirmations) may supplement official listings. Each
          dataset entry includes a source URL and confidence tag for transparency.
        </p>
      </div>
    </main>
  )
}

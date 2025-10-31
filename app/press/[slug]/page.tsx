import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Press release data
const pressReleases = {
  "dinkbank-launches-comprehensive-pickleball-earnings-database": {
    title: "DinkBank Launches Comprehensive Pickleball Earnings Database",
    date: "November 12, 2025",
    location: "North America",
    content: [
      "DinkBank today announced the launch of the most comprehensive database of professional pickleball earnings, tracking prize money and contract estimates across all major tours including PPA, MLP, and APP.",
      "The platform compiles verified prize payouts, reported contracts, and official tour data into one centralized database—providing a clear picture of the financial side of professional pickleball for the first time. Each player profile includes per-event earnings, annual totals, and sourcing transparency (confirmed / reported / estimated) updated after every event.",
      '"Our goal is to bring clarity and credibility to the business of professional pickleball," said a DinkBank spokesperson. "Fans, sponsors, and media can now explore player earnings with the same level of transparency that other major sports have enjoyed for years."',
      "Built by a team of pickleball enthusiasts and data specialists, DinkBank's MVP release includes player leaderboards, sortable event pages, and a public methodology outlining how all figures are compiled. Future updates will expand into endorsements, sponsor mapping, and API access for media partners.",
    ],
  },
}

export default async function PressReleasePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const release = pressReleases[slug as keyof typeof pressReleases]

  if (!release) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/press">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Press & Media
        </Link>
      </Button>

      {/* Article */}
      <Card>
        <CardContent className="pt-8">
          <div className="mb-6">
            <Badge variant="outline" className="mb-4">
              {release.date} — {release.location}
            </Badge>
            <h1 className="text-3xl font-bold mb-6">{release.title}</h1>
          </div>

          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {release.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <p>
              Visit{" "}
              <Link href="/" className="text-foreground underline hover:text-foreground/80">
                www.dinkbank.com
              </Link>{" "}
              to explore the live database and see the latest player earnings.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

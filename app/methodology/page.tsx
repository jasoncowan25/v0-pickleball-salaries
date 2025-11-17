import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, HelpCircle, Eye } from 'lucide-react'

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Methodology</h1>
          <p className="text-muted-foreground text-lg">
            How we collect, verify, and present professional pickleball earnings.
          </p>
        </div>

        <div className="space-y-8">


          {/* Confidence Levels */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Data Confidence Levels</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-[hsl(var(--success))] mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">Confirmed</h3>
                    <Badge variant="default">High Confidence</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Verified via publicly available announcements, credible third-party reporting, or direct organizer confirmation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">Reported</h3>
                    <Badge variant="secondary">Medium Confidence</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Published by credible media or player/agent statements; reliable but not official.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <HelpCircle className="h-6 w-6 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">Estimated</h3>
                    <Badge variant="outline">Lower Confidence</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Computed from purse announcements and standard distribution tables when exact figures are
                    unavailable.
                  </p>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Display Cutoffs */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Display Cutoffs & Leaderboard Rules</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Eye className="h-6 w-6 text-primary mt-1" />
                <div className="flex-1">
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      <strong>What we store:</strong> We track every dollar earned across PPA, MLP, and APP—including
                      small checks and early-round payouts.
                    </li>
                    <li>
                      <strong>What we show by default:</strong>
                      <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                        <li>Event Pages: Quarterfinals and above (typically ≈ $450+ per player).</li>
                        <li>Money List: Players with ≥ $1,000 in season prize money.</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Power-user toggle:</strong> A "Show All Earnings" switch reveals all recorded payouts,
                      including Round of 16 and smaller checks.
                    </li>
                    <li>
                      <strong>Why we do this:</strong> To keep the site clean and useful for fans, media, and sponsors
                      while preserving full historical completeness.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Data Sources */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Data Sources</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Primary Sources</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Official PPA Tour results and press releases</li>
                  <li>Major League Pickleball (MLP) official communications</li>
                  <li>APP Tour tournament results and announcements</li>
                  <li>Tournament organizer websites and social media</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Secondary Sources</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Pickleball media outlets and journalists</li>
                  <li>Player social media announcements</li>
                  <li>Live stream commentary and broadcasts</li>
                  <li>Industry publications and newsletters</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Aggregation Rules */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Aggregation Rules</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Prize Money Calculation</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Only tournament prize money is included in official earnings.</li>
                  <li>Appearance fees and bonuses are excluded unless publicly disclosed as prize money.</li>
                  <li>Mixed doubles earnings are attributed to both players equally.</li>
                  <li>
                    Team event winnings are divided equally among team members unless an official breakdown states
                    otherwise.
                  </li>
                  <li>
                    Round of 16 and other low-amount payouts are tracked but hidden by default (see Display Cutoffs).
                  </li>
                  <li>We run purse checksum validation to ensure total payouts match the published purse.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Contract & Endorsement Estimates</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Based on publicly reported figures or credible industry reporting.</li>
                  <li>Calculated using comparable athlete benchmarks when appropriate.</li>
                  <li>
                    Clearly marked as estimates; they do not affect the Money List unless explicitly flagged as prize
                    money.
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Update Cadence */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Update Schedule</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Tournament Results</h3>
                <p className="text-muted-foreground">
                  Updated within 24–72 hours of finals, pending availability of official breakdowns.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Contract Information</h3>
                <p className="text-muted-foreground">
                  Updated as new information becomes publicly available through official announcements or credible
                  reports.
                </p>
              </div>
            </div>
          </Card>

          {/* Disclaimers */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important Disclaimers:</strong> All earnings data is compiled from publicly available sources.
              Actual player compensation may include undisclosed bonuses, appearance fees, or other arrangements not
              reflected in these figures. Contract and endorsement values are estimates unless officially confirmed.
              This site is not affiliated with any professional pickleball tour or organization. We may filter small
              payouts from default views to improve readability; these amounts are still stored and viewable via the
              'Show All Earnings' toggle.
            </AlertDescription>
          </Alert>
        </div>
      </main>
    </div>
  )
}

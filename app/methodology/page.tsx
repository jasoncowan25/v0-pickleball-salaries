import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, HelpCircle, Eye } from "lucide-react"
import Image from "next/image"
import { VerificationStamp } from "@/components/verification-stamp"

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-4xl py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Methodology</h1>
          <p className="text-muted-foreground">
            How we collect, verify, and present professional pickleball earnings.
          </p>
        </div>

        <div className="space-y-6">
          {/* Confidence Levels */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Data Confidence Levels</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0">
                  <VerificationStamp variant="verified" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-2">DinkBank Confirmed</h3>
                  <p className="text-sm text-muted-foreground">
                    {"Identified by the checkmark. These amounts are verified through publicly available announcements, credible third-party reporting, or direct organizer confirmation. Totals may also be marked as confirmed when all underlying amounts are verified."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0">
                  <VerificationStamp variant="estimated" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-2">DinkBank Estimated</h3>
                  <p className="text-sm text-muted-foreground">
                    Amounts shown with a ~ icon are estimates. These values are derived from publicly reported payout structures, comparable player results, historical prize distributions, and DinkBank's internal modeling when exact figures have not been published. Estimates may be updated as new information becomes available.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Display Cutoffs */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Display Cutoffs & Leaderboard Rules</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  <span className="font-medium text-foreground">What we store:</span> We track every dollar earned across PPA, MLP, and APP—including small checks and early-round payouts.
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium text-foreground">What we show by default:</span>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-muted-foreground">
                  <li>Event Pages: Quarterfinals and above (typically ≈ $450+ per player)</li>
                  <li>Money List: Players with ≥ $1,000 in season prize money</li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Why we do this:</span> To keep the site clean and useful for fans, media, and sponsors while preserving full historical completeness.
                </p>
              </div>
            </div>
          </Card>

          {/* Data Sources */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Data Sources</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Primary Sources</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Official PPA Tour results and press releases</li>
                  <li>Major League Pickleball (MLP) official communications</li>
                  <li>APP Tour tournament results and announcements</li>
                  <li>Tournament organizer websites and social media</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Secondary Sources</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
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
            <h2 className="text-xl font-semibold mb-4">Aggregation Rules</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Prize Money Calculation</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Only tournament prize money is included in official earnings</li>
                  <li>Appearance fees and bonuses are excluded unless publicly disclosed as prize money</li>
                  <li>Mixed doubles earnings are attributed to both players equally</li>
                  <li>Team event winnings are divided equally among team members unless an official breakdown states otherwise</li>
                  <li>Round of 16 and other low-amount payouts are tracked but hidden by default (see Display Cutoffs)</li>
                  <li>We run purse checksum validation to ensure total payouts match the published purse</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Contract & Endorsement Estimates</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Based on publicly reported figures or credible industry reporting</li>
                  <li>Calculated using comparable athlete benchmarks when appropriate</li>
                  <li>Clearly marked as estimates; they do not affect the Money List unless explicitly flagged as prize money</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Update Cadence */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Update Schedule</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Tournament Results</h3>
                <p className="text-sm text-muted-foreground">
                  Updated within 24–72 hours of finals, pending availability of official breakdowns.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Contract Information</h3>
                <p className="text-sm text-muted-foreground">
                  Updated as new information becomes publicly available through official announcements or credible reports.
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

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Disclaimer — DinkBank",
  description: "Informational purposes only; see how we handle accuracy, methodology, sponsorships, and corrections.",
  alternates: {
    canonical: "/disclaimer",
  },
}

const formatDate = () => {
  const date = new Date()
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Disclaimer</h1>
          <p className="text-sm text-muted-foreground">Last updated: {formatDate()}</p>
        </div>

        <Alert>
          <AlertDescription>
            DinkBank provides information for <strong>general informational purposes only</strong>. Nothing on this site
            is legal, tax, medical, investment, or financial advice. You should not rely on our content as a substitute
            for professional advice. Use of this site is at your own risk.
          </AlertDescription>
        </Alert>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1) What DinkBank Is (and Isn't)</h2>
            <ul className="space-y-2 text-sm">
              <li>
                • We track <strong>pro pickleball earnings</strong> — prize money, reported contracts/sponsorships, and
                related figures — across <strong>PPA, MLP, and APP</strong>.
              </li>
              <li>
                • We are <strong>not</strong> affiliated with any tour, team, agent, or athlete unless expressly stated.
              </li>
              <li>
                • Our goal is to be transparent and authoritative while staying approachable for fans and B2B audiences
                (media, sponsors, agents, tours).
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-4">2) Data Sources & Accuracy</h2>
            <ul className="space-y-2 text-sm">
              <li>
                • Prize money is compiled from official tournament results, press releases, credible media reports, and
                direct submissions.
              </li>
              <li>
                • Contract/sponsorship figures may be <Badge variant="secondary">reported</Badge>,{" "}
                <Badge variant="secondary">estimated</Badge>, or <Badge variant="secondary">undisclosed</Badge>. When
                exact terms aren't public, we label entries accordingly.
              </li>
              <li>
                • Event totals may be updated post-event for corrections (DQs, withdrawals, retroactive adjustments).
              </li>
              <li>
                • We strive for accuracy, but <strong>errors or omissions may occur</strong>. If you see something off,
                please{" "}
                <a href="/submit-correction" className="underline text-blue-600 hover:text-blue-800">
                  submit a correction
                </a>
                .
              </li>
              <li>
                • Figures are presented in <strong>USD</strong> unless otherwise marked. (See:{" "}
                <a href="/methodology" className="underline text-blue-600 hover:text-blue-800">
                  Methodology
                </a>
                )
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-4">3) Methodology Short-Form</h2>
            <p className="text-sm mb-4">
              <strong>Round labels</strong> follow a tennis-style canon for consistency across tours:
            </p>
            <ul className="space-y-1 text-sm mb-4">
              <li>• Champion, Runner-Up, Semifinalist, Quarterfinalist, Round of 16, Round of 32, Round of 64.</li>
              <li>
                • <strong>PPA "3rd Place" payouts</strong>: placement remains <strong>Semifinalist</strong>, with a
                payout_bonus noted as "Third-Place Bonus".
              </li>
              <li>
                • <strong>MLP</strong>: Champion / Runner-Up / Semifinalist / Quarterfinalist only.
              </li>
              <li>
                • <strong>APP</strong>: Medal terms (Gold/Silver/Bronze) may appear in the UI, but in our database we
                store canonical round labels.
              </li>
              <li>
                • <strong>Side events / consolations</strong> are recorded separately and not as main placements.
              </li>
              <li>
                • <strong>Ties/grouped finishes</strong> may be shown as T# or ranges (e.g., T3, 5–8th) where
                applicable.
              </li>
            </ul>

            <Card className="p-4">
              <h3 className="font-medium mb-3">Canonical Round Labels</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Canonical Round</th>
                      <th className="text-left py-2">Typical Abbrev.</th>
                      <th className="text-left py-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    <tr className="border-b">
                      <td className="py-2">Champion</td>
                      <td className="py-2">—</td>
                      <td className="py-2">Winner of the main draw</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Runner-Up</td>
                      <td className="py-2">—</td>
                      <td className="py-2">Finalist (losing)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Semifinalist</td>
                      <td className="py-2">SF</td>
                      <td className="py-2">For PPA, any 3rd-place payout logged as a bonus</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Quarterfinalist</td>
                      <td className="py-2">QF</td>
                      <td className="py-2">—</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Round of 16</td>
                      <td className="py-2">R16</td>
                      <td className="py-2">—</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Round of 32</td>
                      <td className="py-2">R32</td>
                      <td className="py-2">—</td>
                    </tr>
                    <tr>
                      <td className="py-2">Round of 64</td>
                      <td className="py-2">R64</td>
                      <td className="py-2">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <p className="text-sm mt-4">
              Full details:{" "}
              <a href="/methodology" className="underline text-blue-600 hover:text-blue-800">
                Methodology
              </a>
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-4">4) Estimates, Unverified, and "Reported" Figures</h2>
            <ul className="space-y-2 text-sm">
              <li>
                • When we label an amount as <Badge variant="secondary">Reported</Badge>,{" "}
                <Badge variant="secondary">Estimate</Badge>, or <Badge variant="secondary">Undisclosed</Badge>, it
                reflects the best available information at the time.
              </li>
              <li>• Reported/estimated figures may change with new disclosures or confirmations.</li>
              <li>• We timestamp material updates and welcome primary-source documentation.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-4">5) Sponsorships, Ads & Affiliate Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                • DinkBank may display advertising (banner units, sponsorships) and may earn revenue from paid
                partnerships or affiliate links.
              </li>
              <li>
                • Paid relationships do <strong>not</strong> influence our commitment to accurate reporting. Sponsored
                content will be <strong>clearly labeled</strong>.
              </li>
              <li>
                • For sponsorship or media inquiries, please visit{" "}
                <a href="/contact" className="underline text-blue-600 hover:text-blue-800">
                  Contact
                </a>
                .
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-4">6) Trademarks & Third-Party Rights</h2>
            <ul className="space-y-2 text-sm">
              <li>• All trademarks, service marks, and logos are the property of their respective owners.</li>
              <li>
                • Use of player names, tour names (PPA/MLP/APP), events, and logos is for{" "}
                <strong>identification and reporting</strong> purposes only.
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-4">7) No Warranties; Limitation of Liability</h2>
            <ul className="space-y-2 text-sm">
              <li>
                • The site is provided "as is" and "as available" without warranties of any kind, express or implied.
              </li>
              <li>
                • DinkBank and its contributors are <strong>not liable</strong> for any losses or damages arising from
                your use of the site or reliance on its content, to the maximum extent permitted by law.
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-4">8) User Submissions & Corrections</h2>
            <ul className="space-y-2 text-sm">
              <li>• We welcome verifiable updates from players, agents, tours, and fans.</li>
              <li>• Submissions may be edited for clarity and verified prior to publication.</li>
              <li>
                • Send updates via{" "}
                <a href="/submit-correction" className="underline text-blue-600 hover:text-blue-800">
                  Submit a Correction
                </a>
                .
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-4">9) Privacy & Cookies</h2>
            <ul className="space-y-2 text-sm">
              <li>
                • See our{" "}
                <a href="/privacy" className="underline text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </a>{" "}
                for how we handle data and cookies.
              </li>
              <li>• By using this site, you consent to our use of cookies as described in the Privacy Policy.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-4">10) Governing Law & Venue</h2>
            <ul className="space-y-2 text-sm">
              <li>
                • This site is operated from Ontario, Canada. These terms are governed by the laws of{" "}
                <strong>Ontario</strong> and applicable federal laws of Canada, without regard to conflict-of-laws
                principles.
              </li>
              <li>• Any disputes shall be brought in the courts of Ontario, Canada.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-4">11) Changes to this Disclaimer</h2>
            <p className="text-sm">
              We may update this page periodically. The "Last updated" date reflects the latest material change.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <p className="text-sm">
              For media, sponsorships, or legal inquiries:{" "}
              <a href="/contact" className="underline text-blue-600 hover:text-blue-800">
                Contact
              </a>
              <br />
              For accuracy updates:{" "}
              <a href="/submit-correction" className="underline text-blue-600 hover:text-blue-800">
                Submit a Correction
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TopPrizeEarnersReport() {
  return (
    <div className="max-w-7xl mx-auto lg:px-8 py-6 px-4 space-y-8">
      {/* Back Link */}
      <Link
        href="/reports"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Reports
      </Link>

      {/* Hero Section */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">2025's Top 10 Prize Money Earners</h1>
        <p className="text-lg text-muted-foreground">
          A year-over-year look at the top prize-money earners in professional pickleball, how their rankings shifted
          from 2024, and where injuries and partnership changes shaped the final table.
        </p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>Report Type: Earnings Analysis</span>
          <span>·</span>
          <span>Published: December 2025</span>
        </div>
        <Badge variant="outline" className="text-sm">
          Prize money only (APP, MLP, PPA). Contracts, appearance fees, and endorsements are excluded from all figures.
        </Badge>
      </div>

      {/* Overview Section */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-2xl font-bold">Overview</h2>
          <p>
            Prize money in professional pickleball continued to climb in 2025, with deeper draws and richer purses
            across PPA, MLP, and APP events. Using DinkBank's internal payout data, this report looks at the top 10
            prize-money earners of 2025, compares them to their 2024 prize-money rankings, and highlights where injuries
            or limited schedules shaped the final table. All figures below are prize money only (APP + MLP + PPA) and
            exclude contracts, appearance fees, and endorsements.
          </p>
          <p>
            From a macro view, 2025 reinforced a familiar story at the top: Anna Leigh Waters and Ben Johns once again
            finished No. 1 and No. 2 in prize earnings. Behind them, however, the table churned. Gabriel Tardio,
            Christian Alshon, and Tyra Black all broke into the top 10, while established names like Rachel Rohrbacher,
            Dylan Frazier, and Andrei Daescu slid out of the top-prize group, often due to schedule choices, partner
            changes, or in some cases lingering injuries.
          </p>
        </CardContent>
      </Card>

      {/* Methodology Section */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-2xl font-bold">Methodology Snapshot</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Scope:</strong> PPA, MLP, APP main draws only, 2025 season.
            </li>
            <li>
              <strong>Metric:</strong> Prize money only per player (no contracts, appearance fees, bonuses, or
              endorsements).
            </li>
            <li>
              <strong>Source:</strong> DinkBank's internal payout calculations, built from official event prize
              breakdowns and brackets.
            </li>
            <li>
              <strong>Comparison Year:</strong> 2024 prize-money rankings recalculated on the same basis (APP + MLP +
              PPA only).
            </li>
            <li>
              <strong>Movement:</strong> "Up / down X spots" is based solely on prize-money rank, not overall earnings
              including contracts.
            </li>
          </ul>
          <p className="text-sm text-muted-foreground">
            All dollar figures are DinkBank estimates based on official prize structures and are subject to revision if
            tours update or correct their published payouts. For more details on our data collection process, see our{" "}
            <Link href="/methodology" className="underline hover:text-foreground">
              Methodology
            </Link>{" "}
            page.
          </p>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-2xl font-bold">2025 Top 10 vs 2024</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-medium">Player</th>
                  <th className="text-right py-2 px-3 font-medium">2025 Prize Money</th>
                  <th className="text-center py-2 px-3 font-medium">2025 Rank</th>
                  <th className="text-center py-2 px-3 font-medium">2024 Rank</th>
                  <th className="text-left py-2 px-3 font-medium">Movement</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Anna Leigh Waters",
                    prize2025: "$163,873",
                    rank2025: 1,
                    rank2024: 1,
                    movement: "stays #1",
                  },
                  { name: "Ben Johns", prize2025: "$132,970", rank2025: 2, rank2024: 2, movement: "stays #2" },
                  {
                    name: "Gabriel Tardio",
                    prize2025: "$81,157",
                    rank2025: 3,
                    rank2024: "—",
                    movement: "new to Top 10",
                  },
                  { name: "Anna Bright", prize2025: "$80,345", rank2025: 4, rank2024: 5, movement: "up 1 spot" },
                  { name: "JW Johnson", prize2025: "$77,973", rank2025: 5, rank2024: 6, movement: "up 1 spot" },
                  {
                    name: "Christian Alshon",
                    prize2025: "$75,810",
                    rank2025: 6,
                    rank2024: "—",
                    movement: "new to Top 10",
                  },
                  { name: "Jorja Johnson", prize2025: "$75,547", rank2025: 7, rank2024: 7, movement: "stays #7" },
                  {
                    name: "Catherine Parenteau",
                    prize2025: "$62,861",
                    rank2025: 8,
                    rank2024: 4,
                    movement: "down 4 spots",
                  },
                  {
                    name: "Federico Staksrud",
                    prize2025: "$62,767",
                    rank2025: 9,
                    rank2024: 3,
                    movement: "down 6 spots",
                  },
                  {
                    name: "Tyra Black",
                    prize2025: "$60,300",
                    rank2025: 10,
                    rank2024: "—",
                    movement: "new to Top 10",
                  },
                ].map((row) => (
                  <tr key={row.name} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-3">{row.name}</td>
                    <td className="py-2 px-3 text-right tabular-nums">{row.prize2025}</td>
                    <td className="py-2 px-3 text-center tabular-nums">{row.rank2025}</td>
                    <td className="py-2 px-3 text-center tabular-nums">{row.rank2024}</td>
                    <td className="py-2 px-3">{row.movement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground pt-4">
            This ranking is based solely on DinkBank's prize-money calculations for 2024 and 2025. Contract amounts,
            appearance fees, and endorsement income are tracked separately and are not included in this list.
          </p>
        </CardContent>
      </Card>

      {/* Individual Player Sections */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Player Breakdowns</h2>

        {/* Player 1 */}
        <Card>
          <CardContent className="pt-6 space-y-3">
            <h3 className="text-xl font-bold">1. Anna Leigh Waters — $163,873 (stays #1)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: 1st — Movement: no change</p>
            <p>
              Waters repeats as the sport's top prize-money earner, even with a modest drop in absolute prize compared
              to 2024. Her calendar remained dense, with deep runs across singles, women's doubles, and mixed. She also
              navigated a major narrative shift in 2025, ending her long-time women's doubles partnership with Catherine
              Parenteau and testing new pairings while still producing podium finishes.
            </p>
            <p>
              There were no major publicly reported injuries sidelining Waters in late 2024–2025; if anything, her story
              was about continuity and durability while others around her battled time off.
            </p>
          </CardContent>
        </Card>

        {/* Player 2 */}
        <Card>
          <CardContent className="pt-6 space-y-3">
            <h3 className="text-xl font-bold">2. Ben Johns — $132,970 (stays #2)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: 2nd — Movement: no change</p>
            <p>
              Johns also holds his line, finishing second in prize earnings for the second straight year. Even when he
              played through a rolled ankle in late 2024 and sat out a singles draw, he still managed big results in
              mixed and men's doubles, underlining how high his floor remains.
            </p>
            <p>
              That 2024 ankle issue did not appear to cause lasting damage, and he quickly returned to championship
              form, helping preserve his place near the top of the prize table.
            </p>
          </CardContent>
        </Card>

        {/* Player 3 */}
        <Card>
          <CardContent className="pt-6 space-y-3">
            <h3 className="text-xl font-bold">3. Gabriel Tardio — $81,157 (new to Top 10)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: Outside 2024 Top 10 — Movement: new entry</p>
            <p>
              Tardio is one of the breakout financial stories of 2025. After a 2024 season highlighted by multiple
              doubles medals and big wins over top seeds, he converted that momentum into more frequent deep runs and
              bigger prize checks in 2025.
            </p>
            <p>
              No major publicly reported injuries affected his availability over the 2024–2025 window. His rise looks
              primarily driven by performance and volume rather than a return from injury.
            </p>
          </CardContent>
        </Card>

        {/* Player 4 */}
        <Card>
          <CardContent className="pt-6 space-y-3">
            <h3 className="text-xl font-bold">4. Anna Bright — $80,345 (up 1 spot)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: 5th — Movement: up 1 spot</p>
            <p>
              Bright continues her climb, jumping from 5th to 4th in prize money. Her aggressive style and strong
              women's doubles and mixed campaigns yielded consistent podiums, and she capitalized when legacy pairings
              like Waters/Parenteau showed cracks in 2024 and then reshuffled in 2025.
            </p>
            <p>
              There were no widely reported injuries that significantly shortened her schedule in 2024–2025, so her
              ranking reflects pure on-court performance.
            </p>
          </CardContent>
        </Card>

        {/* Player 5 */}
        <Card>
          <CardContent className="pt-6 space-y-3">
            <h3 className="text-xl font-bold">5. JW Johnson — $77,973 (up 1 spot)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: 6th — Movement: up 1 spot</p>
            <p>
              JW Johnson edges up one place, powered by steady results and high-leverage wins in both doubles and mixed.
              His 2025 season is marked less by a single huge score and more by repeated deep finishes, including
              important MLP success as a key roster anchor.
            </p>
            <p>
              No major injuries were broadly reported; his trajectory reflects incremental improvement, strong
              partnerships, and a full slate of events.
            </p>
          </CardContent>
        </Card>

        {/* Player 6 */}
        <Card>
          <CardContent className="pt-6 space-y-3">
            <h3 className="text-xl font-bold">6. Christian Alshon — $75,810 (new to Top 10)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: Outside 2024 Top 10 — Movement: new entry</p>
            <p>
              Alshon's jump into the top-10 prize-money list is especially impressive given how his 2024 season ended.
              He underwent surgery in mid-2024 and missed a stretch of competition, then later battled a lingering knee
              issue that forced him out of multiple singles draws. In 2025, he bounced back with notable singles titles
              and a more complete all-around resume, which translated directly into higher prize totals.
            </p>
            <p>
              His 2025 season reads as a "return to form" campaign, with a healthier body supporting a heavier playing
              schedule.
            </p>
          </CardContent>
        </Card>

        {/* Player 7 */}
        <Card>
          <CardContent className="pt-6 space-y-3">
            <h3 className="text-xl font-bold">7. Jorja Johnson — $75,547 (stays #7)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: 7th — Movement: no change</p>
            <p>
              Jorja Johnson holds her #7 slot year-over-year, but the story behind the static rank is a step up in
              impact. Her 2025 results include high-profile wins in women's doubles (including marquee victories over
              elite teams) and strong mixed results alongside top-10 partners.
            </p>
            <p>
              With no significant injuries reported in 2024–2025, Jorja's steady availability is part of what keeps her
              anchored in the prize-money elite.
            </p>
          </CardContent>
        </Card>

        {/* Player 8 */}
        <Card>
          <CardContent className="pt-6 space-y-3">
            <h3 className="text-xl font-bold">8. Catherine Parenteau — $62,861 (down 4 spots)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: 4th — Movement: down 4 spots</p>
            <p>
              Parenteau slides from 4th to 8th despite remaining one of the most technically polished players on tour.
              The end of her long-running partnership with Waters in early 2025 signaled a reset; while she still logged
              strong results, the combination of new partner experiments and a more distributed podium picture in
              women's doubles appears to have trimmed her prize-money ceiling compared with 2023–2024.
            </p>
            <p>
              No major injury absences were widely reported; her decline in rank looks more tied to partnership changes
              and tightening competition than health.
            </p>
          </CardContent>
        </Card>

        {/* Player 9 */}
        <Card>
          <CardContent className="pt-6 space-y-3">
            <h3 className="text-xl font-bold">9. Federico Staksrud — $62,767 (down 6 spots)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: 3rd — Movement: down 6 spots</p>
            <p>
              Staksrud takes the sharpest drop among returning top-10 players, falling from 3rd to 9th in prize
              earnings. 2024 was a banner year for him in terms of prize money, and 2025 appears more mixed—still
              strong, but with fewer dominant singles runs and less consistent final-round appearances.
            </p>
            <p>
              There were no major long-term injuries widely reported for Staksrud; his movement seems driven mainly by
              results variance and the emergence of other high-earning players like Tardio and Alshon.
            </p>
          </CardContent>
        </Card>

        {/* Player 10 */}
        <Card>
          <CardContent className="pt-6 space-y-3">
            <h3 className="text-xl font-bold">10. Tyra Black — $60,300 (new to Top 10)</h3>
            <p className="text-sm text-muted-foreground">2024 prize rank: Outside 2024 Top 10 — Movement: new entry</p>
            <p>
              "Hurricane" Tyra Black storms into the 2025 prize-money top 10 on the strength of powerful singles results
              and key doubles runs, including headline-grabbing wins with partners like Jorja Johnson. Media coverage in
              2024 already highlighted her rapid rise and professionalism; in 2025, that narrative converts into pure
              prize dollars.
            </p>
            <p>
              There were no major injuries widely documented in 2024–2025; her trajectory is very much a healthy
              breakout.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Who Dropped Out */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-2xl font-bold">Who Dropped Out of the Top 10?</h2>
          <p>Three players who finished in the 2024 prize-money top 10 fell out of the list in 2025.</p>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold">Rachel Rohrbacher (2024: 8th in prize money)</h4>
              <p className="text-sm text-muted-foreground mt-1">
                A strong 2024 season, including significant wins over top teams with Anna Bright, gave way to a more
                crowded doubles landscape in 2025. As more women's teams stepped up, her earnings dropped just enough to
                push her outside the top-10 prize bracket.
              </p>
            </div>

            <div>
              <h4 className="font-bold">Dylan Frazier (2024: 9th in prize money)</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Frazier remained a dangerous doubles presence, but a mix of schedule choices, partner shifts, and a
                tighter top of the field likely pushed his prize total just outside the 2025 top 10.
              </p>
            </div>

            <div>
              <h4 className="font-bold">Andrei Daescu (2024: 10th in prize money)</h4>
              <p className="text-sm text-muted-foreground mt-1">
                After a 2024 season with meaningful prize checks across APP and MLP, the combination of event selection
                and stronger competition appears to have left Daescu short of repeating as a top-10 prize earner.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Takeaways */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-2xl font-bold">Takeaways for 2026</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Top stability, mid-table volatility.</strong> Waters and Johns remain entrenched at the top of the
              prize-money mountain, but positions 3–10 are highly fluid.
            </li>
            <li>
              <strong>Health plus volume matters.</strong> Alshon's 2024 injuries are a reminder that time off can
              derail a prize-money season, while his 2025 rebound shows how quickly a healthy, talented player can climb
              back.
            </li>
            <li>
              <strong>Partnership choices are financial decisions.</strong> The breakup of Waters and Parenteau
              materially impacted where their doubles prize money landed, reinforcing that partner decisions carry
              direct earnings consequences.
            </li>
            <li>
              <strong>The door is open for new money leaders.</strong> Tardio and Black's entry into the top 10 suggests
              that 2026 could see even more reshuffling—especially if emerging players stay healthy and stack deeper
              runs.
            </li>
          </ul>
          <p className="pt-4">
            For players, agents, and sponsors, these shifts underscore why tracking prize money season over season is
            essential context for negotiations and long-term planning. As tours adjust formats and prize structures,
            DinkBank will continue to update and refine these totals to give the pickleball community a clear view of
            who is getting paid—and how that is changing over time.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

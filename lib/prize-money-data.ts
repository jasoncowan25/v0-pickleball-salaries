// Prize Money Data Structure for PPA, MLP, and APP Tours

export type Tour = "PPA" | "MLP" | "APP"
export type Division = "mens-singles" | "womens-singles" | "mens-doubles" | "womens-doubles" | "mixed-doubles"
export type PayoutBasis = "per-player" | "per-team"

export interface PayoutRow {
  placement: string
  amount: number
  note?: string
}

export interface PayoutTable {
  division: Division
  divisionLabel: string
  payoutBasis: PayoutBasis
  rows: PayoutRow[]
}

export interface EventType {
  id: string
  label: string
  description?: string
  tables: PayoutTable[]
}

export interface TourSection {
  tour: Tour
  tourLabel: string
  description: string
  eventTypes: EventType[]
  sources: { label: string; url: string }[]
  effectiveSeason: string
}

export interface YearData {
  year: number
  lastUpdated: string
  tours: TourSection[]
}

const divisionLabels: Record<Division, string> = {
  "mens-singles": "Men's Singles",
  "womens-singles": "Women's Singles",
  "mens-doubles": "Men's Doubles",
  "womens-doubles": "Women's Doubles",
  "mixed-doubles": "Mixed Doubles",
}

// PPA Payout Data
const ppaSlamPayouts: PayoutTable[] = [
  {
    division: "mens-singles",
    divisionLabel: divisionLabels["mens-singles"],
    payoutBasis: "per-player",
    rows: [
      { placement: "Champion", amount: 50000 },
      { placement: "Runner-Up", amount: 25000 },
      { placement: "Semifinalist", amount: 12500 },
      { placement: "Quarterfinalist", amount: 6250 },
      { placement: "Round of 16", amount: 3125 },
      { placement: "Round of 32", amount: 1500 },
    ],
  },
  {
    division: "womens-singles",
    divisionLabel: divisionLabels["womens-singles"],
    payoutBasis: "per-player",
    rows: [
      { placement: "Champion", amount: 50000 },
      { placement: "Runner-Up", amount: 25000 },
      { placement: "Semifinalist", amount: 12500 },
      { placement: "Quarterfinalist", amount: 6250 },
      { placement: "Round of 16", amount: 3125 },
      { placement: "Round of 32", amount: 1500 },
    ],
  },
  {
    division: "mens-doubles",
    divisionLabel: divisionLabels["mens-doubles"],
    payoutBasis: "per-team",
    rows: [
      { placement: "Champion", amount: 60000, note: "Split between partners" },
      { placement: "Runner-Up", amount: 30000, note: "Split between partners" },
      { placement: "Semifinalist", amount: 15000, note: "Split between partners" },
      { placement: "Quarterfinalist", amount: 7500, note: "Split between partners" },
      { placement: "Round of 16", amount: 3750, note: "Split between partners" },
    ],
  },
  {
    division: "womens-doubles",
    divisionLabel: divisionLabels["womens-doubles"],
    payoutBasis: "per-team",
    rows: [
      { placement: "Champion", amount: 60000, note: "Split between partners" },
      { placement: "Runner-Up", amount: 30000, note: "Split between partners" },
      { placement: "Semifinalist", amount: 15000, note: "Split between partners" },
      { placement: "Quarterfinalist", amount: 7500, note: "Split between partners" },
      { placement: "Round of 16", amount: 3750, note: "Split between partners" },
    ],
  },
  {
    division: "mixed-doubles",
    divisionLabel: divisionLabels["mixed-doubles"],
    payoutBasis: "per-team",
    rows: [
      { placement: "Champion", amount: 50000, note: "Split between partners" },
      { placement: "Runner-Up", amount: 25000, note: "Split between partners" },
      { placement: "Semifinalist", amount: 12500, note: "Split between partners" },
      { placement: "Quarterfinalist", amount: 6250, note: "Split between partners" },
    ],
  },
]

const ppaCupPayouts: PayoutTable[] = [
  {
    division: "mens-singles",
    divisionLabel: divisionLabels["mens-singles"],
    payoutBasis: "per-player",
    rows: [
      { placement: "Champion", amount: 30000 },
      { placement: "Runner-Up", amount: 15000 },
      { placement: "Semifinalist", amount: 7500 },
      { placement: "Quarterfinalist", amount: 3750 },
    ],
  },
  {
    division: "womens-singles",
    divisionLabel: divisionLabels["womens-singles"],
    payoutBasis: "per-player",
    rows: [
      { placement: "Champion", amount: 30000 },
      { placement: "Runner-Up", amount: 15000 },
      { placement: "Semifinalist", amount: 7500 },
      { placement: "Quarterfinalist", amount: 3750 },
    ],
  },
  {
    division: "mens-doubles",
    divisionLabel: divisionLabels["mens-doubles"],
    payoutBasis: "per-team",
    rows: [
      { placement: "Champion", amount: 40000, note: "Split between partners" },
      { placement: "Runner-Up", amount: 20000, note: "Split between partners" },
      { placement: "Semifinalist", amount: 10000, note: "Split between partners" },
      { placement: "Quarterfinalist", amount: 5000, note: "Split between partners" },
    ],
  },
  {
    division: "womens-doubles",
    divisionLabel: divisionLabels["womens-doubles"],
    payoutBasis: "per-team",
    rows: [
      { placement: "Champion", amount: 40000, note: "Split between partners" },
      { placement: "Runner-Up", amount: 20000, note: "Split between partners" },
      { placement: "Semifinalist", amount: 10000, note: "Split between partners" },
      { placement: "Quarterfinalist", amount: 5000, note: "Split between partners" },
    ],
  },
  {
    division: "mixed-doubles",
    divisionLabel: divisionLabels["mixed-doubles"],
    payoutBasis: "per-team",
    rows: [
      { placement: "Champion", amount: 30000, note: "Split between partners" },
      { placement: "Runner-Up", amount: 15000, note: "Split between partners" },
      { placement: "Semifinalist", amount: 7500, note: "Split between partners" },
    ],
  },
]

const ppaOpenPayouts: PayoutTable[] = [
  {
    division: "mens-singles",
    divisionLabel: divisionLabels["mens-singles"],
    payoutBasis: "per-player",
    rows: [
      { placement: "Champion", amount: 20000 },
      { placement: "Runner-Up", amount: 10000 },
      { placement: "Semifinalist", amount: 5000 },
      { placement: "Quarterfinalist", amount: 2500 },
    ],
  },
  {
    division: "womens-singles",
    divisionLabel: divisionLabels["womens-singles"],
    payoutBasis: "per-player",
    rows: [
      { placement: "Champion", amount: 20000 },
      { placement: "Runner-Up", amount: 10000 },
      { placement: "Semifinalist", amount: 5000 },
      { placement: "Quarterfinalist", amount: 2500 },
    ],
  },
  {
    division: "mens-doubles",
    divisionLabel: divisionLabels["mens-doubles"],
    payoutBasis: "per-team",
    rows: [
      { placement: "Champion", amount: 25000, note: "Split between partners" },
      { placement: "Runner-Up", amount: 12500, note: "Split between partners" },
      { placement: "Semifinalist", amount: 6250, note: "Split between partners" },
      { placement: "Quarterfinalist", amount: 3125, note: "Split between partners" },
    ],
  },
  {
    division: "womens-doubles",
    divisionLabel: divisionLabels["womens-doubles"],
    payoutBasis: "per-team",
    rows: [
      { placement: "Champion", amount: 25000, note: "Split between partners" },
      { placement: "Runner-Up", amount: 12500, note: "Split between partners" },
      { placement: "Semifinalist", amount: 6250, note: "Split between partners" },
      { placement: "Quarterfinalist", amount: 3125, note: "Split between partners" },
    ],
  },
  {
    division: "mixed-doubles",
    divisionLabel: divisionLabels["mixed-doubles"],
    payoutBasis: "per-team",
    rows: [
      { placement: "Champion", amount: 20000, note: "Split between partners" },
      { placement: "Runner-Up", amount: 10000, note: "Split between partners" },
      { placement: "Semifinalist", amount: 5000, note: "Split between partners" },
    ],
  },
]

const ppaChallengerPayouts: PayoutTable[] = [
  {
    division: "mens-singles",
    divisionLabel: divisionLabels["mens-singles"],
    payoutBasis: "per-player",
    rows: [
      { placement: "Champion", amount: 10000 },
      { placement: "Runner-Up", amount: 5000 },
      { placement: "Semifinalist", amount: 2500 },
      { placement: "Quarterfinalist", amount: 1250 },
    ],
  },
  {
    division: "womens-singles",
    divisionLabel: divisionLabels["womens-singles"],
    payoutBasis: "per-player",
    rows: [
      { placement: "Champion", amount: 10000 },
      { placement: "Runner-Up", amount: 5000 },
      { placement: "Semifinalist", amount: 2500 },
      { placement: "Quarterfinalist", amount: 1250 },
    ],
  },
  {
    division: "mens-doubles",
    divisionLabel: divisionLabels["mens-doubles"],
    payoutBasis: "per-team",
    rows: [
      { placement: "Champion", amount: 12000, note: "Split between partners" },
      { placement: "Runner-Up", amount: 6000, note: "Split between partners" },
      { placement: "Semifinalist", amount: 3000, note: "Split between partners" },
    ],
  },
  {
    division: "womens-doubles",
    divisionLabel: divisionLabels["womens-doubles"],
    payoutBasis: "per-team",
    rows: [
      { placement: "Champion", amount: 12000, note: "Split between partners" },
      { placement: "Runner-Up", amount: 6000, note: "Split between partners" },
      { placement: "Semifinalist", amount: 3000, note: "Split between partners" },
    ],
  },
  {
    division: "mixed-doubles",
    divisionLabel: divisionLabels["mixed-doubles"],
    payoutBasis: "per-team",
    rows: [
      { placement: "Champion", amount: 10000, note: "Split between partners" },
      { placement: "Runner-Up", amount: 5000, note: "Split between partners" },
      { placement: "Semifinalist", amount: 2500, note: "Split between partners" },
    ],
  },
]

// MLP Payout Data
const mlpEventPayouts: PayoutTable[] = [
  {
    division: "mixed-doubles",
    divisionLabel: "Team Event (Per Player)",
    payoutBasis: "per-player",
    rows: [
      { placement: "Champion", amount: 100000 },
      { placement: "Runner-Up", amount: 50000 },
      { placement: "Semifinalist", amount: 25000 },
      { placement: "Quarterfinalist", amount: 12500 },
    ],
  },
]

const mlpAppearancePayouts: PayoutTable[] = [
  {
    division: "mixed-doubles",
    divisionLabel: "Season Appearance (Per Player)",
    payoutBasis: "per-player",
    rows: [
      { placement: "Gold Card", amount: 200000, note: "Base retainer for top-tier players" },
      { placement: "Futures", amount: 75000, note: "Development tier players" },
      { placement: "Standard", amount: 50000, note: "Standard contracted players" },
    ],
  },
]

// APP Payout Data
const appProsTier1Payouts: PayoutTable[] = [
  {
    division: "mens-singles",
    divisionLabel: "Tier 1 (150k) - Singles",
    payoutBasis: "per-player",
    rows: [
      { placement: "1st Place", amount: 3000 },
      { placement: "2nd Place", amount: 2250 },
      { placement: "3rd", amount: 1800 },
      { placement: "4th", amount: 1350 },
      { placement: "Qtrs", amount: 900 },
      { placement: "9th", amount: 450 },
    ],
  },
  {
    division: "mens-doubles",
    divisionLabel: "Tier 1 (150k) - Doubles",
    payoutBasis: "per-team",
    rows: [
      { placement: "1st Place", amount: 6000, note: "Split between partners" },
      { placement: "2nd Place", amount: 4500, note: "Split between partners" },
      { placement: "3rd", amount: 3600, note: "Split between partners" },
      { placement: "4th", amount: 2700, note: "Split between partners" },
      { placement: "Qtrs", amount: 1800, note: "Split between partners" },
      { placement: "9th", amount: 900, note: "Split between partners" },
    ],
  },
]

const appProsTier2Payouts: PayoutTable[] = [
  {
    division: "mens-singles",
    divisionLabel: "Tier 2 (100k) - Singles",
    payoutBasis: "per-player",
    rows: [
      { placement: "1st Place", amount: 2000 },
      { placement: "2nd Place", amount: 1500 },
      { placement: "3rd", amount: 1200 },
      { placement: "4th", amount: 900 },
      { placement: "Qtrs", amount: 600 },
      { placement: "9th", amount: 300 },
    ],
  },
  {
    division: "mens-doubles",
    divisionLabel: "Tier 2 (100k) - Doubles",
    payoutBasis: "per-team",
    rows: [
      { placement: "1st Place", amount: 4000, note: "Split between partners" },
      { placement: "2nd Place", amount: 3000, note: "Split between partners" },
      { placement: "3rd", amount: 2400, note: "Split between partners" },
      { placement: "4th", amount: 1800, note: "Split between partners" },
      { placement: "Qtrs", amount: 1200, note: "Split between partners" },
      { placement: "9th", amount: 600, note: "Split between partners" },
    ],
  },
]

const appChampionsProsTier1Payouts: PayoutTable[] = [
  {
    division: "mens-singles",
    divisionLabel: "Tier 1 (150k) - Singles",
    payoutBasis: "per-player",
    rows: [
      { placement: "1st Place", amount: 2250 },
      { placement: "2nd Place", amount: 1200 },
      { placement: "3rd", amount: 750 },
      { placement: "4th", amount: 375 },
      { placement: "5th/6th", amount: 187.5 },
    ],
  },
  {
    division: "mens-doubles",
    divisionLabel: "Tier 1 (150k) - Gender Doubles",
    payoutBasis: "per-team",
    rows: [
      { placement: "1st Place", amount: 4000, note: "Split between partners" },
      { placement: "2nd Place", amount: 2200, note: "Split between partners" },
      { placement: "3rd", amount: 1600, note: "Split between partners" },
      { placement: "4th", amount: 1000, note: "Split between partners" },
      { placement: "5th/6th", amount: 500, note: "Split between partners" },
    ],
  },
  {
    division: "mixed-doubles",
    divisionLabel: "Tier 1 (150k) - Mixed Doubles",
    payoutBasis: "per-team",
    rows: [
      { placement: "1st Place", amount: 4000, note: "Split between partners" },
      { placement: "2nd Place", amount: 2200, note: "Split between partners" },
      { placement: "3rd", amount: 1600, note: "Split between partners" },
      { placement: "4th", amount: 1000, note: "Split between partners" },
      { placement: "5th/6th", amount: 500, note: "Split between partners" },
      { placement: "7th/8th", amount: 300, note: "Split between partners" },
      { placement: "9th", amount: 250, note: "Split between partners" },
      { placement: "10th", amount: 250, note: "Split between partners" },
    ],
  },
]

const appChampionsProsTier2Payouts: PayoutTable[] = [
  {
    division: "mens-singles",
    divisionLabel: "Tier 2 (100k) - Singles",
    payoutBasis: "per-player",
    rows: [
      { placement: "1st Place", amount: 1500 },
      { placement: "2nd Place", amount: 800 },
      { placement: "3rd", amount: 500 },
      { placement: "4th", amount: 350 },
      { placement: "5th/6th", amount: 250 },
    ],
  },
  {
    division: "mens-doubles",
    divisionLabel: "Tier 2 (100k) - Gender Doubles",
    payoutBasis: "per-team",
    rows: [
      { placement: "1st Place", amount: 3000, note: "Split between partners" },
      { placement: "2nd Place", amount: 1500, note: "Split between partners" },
      { placement: "3rd", amount: 1000, note: "Split between partners" },
      { placement: "4th", amount: 700, note: "Split between partners" },
      { placement: "5th/6th", amount: 500, note: "Split between partners" },
    ],
  },
  {
    division: "mixed-doubles",
    divisionLabel: "Tier 2 (100k) - Mixed Doubles",
    payoutBasis: "per-team",
    rows: [
      { placement: "1st Place", amount: 3000, note: "Split between partners" },
      { placement: "2nd Place", amount: 1500, note: "Split between partners" },
      { placement: "3rd", amount: 1000, note: "Split between partners" },
      { placement: "4th", amount: 700, note: "Split between partners" },
      { placement: "5th/6th", amount: 500, note: "Split between partners" },
    ],
  },
]

const appMajorPayouts: PayoutTable[] = [
  {
    division: "mens-singles",
    divisionLabel: divisionLabels["mens-singles"],
    payoutBasis: "per-player",
    rows: [
      { placement: "Champion", amount: 25000 },
      { placement: "Runner-Up", amount: 12500 },
      { placement: "Semifinalist", amount: 6250 },
      { placement: "Quarterfinalist", amount: 3125 },
    ],
  },
  {
    division: "womens-singles",
    divisionLabel: divisionLabels["womens-singles"],
    payoutBasis: "per-player",
    rows: [
      { placement: "Champion", amount: 25000 },
      { placement: "Runner-Up", amount: 12500 },
      { placement: "Semifinalist", amount: 6250 },
      { placement: "Quarterfinalist", amount: 3125 },
    ],
  },
  {
    division: "mens-doubles",
    divisionLabel: divisionLabels["mens-doubles"],
    payoutBasis: "per-team",
    rows: [
      { placement: "Champion", amount: 30000, note: "Split between partners" },
      { placement: "Runner-Up", amount: 15000, note: "Split between partners" },
      { placement: "Semifinalist", amount: 7500, note: "Split between partners" },
    ],
  },
  {
    division: "womens-doubles",
    divisionLabel: divisionLabels["womens-doubles"],
    payoutBasis: "per-team",
    rows: [
      { placement: "Champion", amount: 30000, note: "Split between partners" },
      { placement: "Runner-Up", amount: 15000, note: "Split between partners" },
      { placement: "Semifinalist", amount: 7500, note: "Split between partners" },
    ],
  },
  {
    division: "mixed-doubles",
    divisionLabel: divisionLabels["mixed-doubles"],
    payoutBasis: "per-team",
    rows: [
      { placement: "Champion", amount: 25000, note: "Split between partners" },
      { placement: "Runner-Up", amount: 12500, note: "Split between partners" },
      { placement: "Semifinalist", amount: 6250, note: "Split between partners" },
    ],
  },
]

const appStandardPayouts: PayoutTable[] = [
  {
    division: "mens-singles",
    divisionLabel: divisionLabels["mens-singles"],
    payoutBasis: "per-player",
    rows: [
      { placement: "Champion", amount: 10000 },
      { placement: "Runner-Up", amount: 5000 },
      { placement: "Semifinalist", amount: 2500 },
      { placement: "Quarterfinalist", amount: 1250 },
    ],
  },
  {
    division: "womens-singles",
    divisionLabel: divisionLabels["womens-singles"],
    payoutBasis: "per-player",
    rows: [
      { placement: "Champion", amount: 10000 },
      { placement: "Runner-Up", amount: 5000 },
      { placement: "Semifinalist", amount: 2500 },
      { placement: "Quarterfinalist", amount: 1250 },
    ],
  },
  {
    division: "mens-doubles",
    divisionLabel: divisionLabels["mens-doubles"],
    payoutBasis: "per-team",
    rows: [
      { placement: "Champion", amount: 12000, note: "Split between partners" },
      { placement: "Runner-Up", amount: 6000, note: "Split between partners" },
      { placement: "Semifinalist", amount: 3000, note: "Split between partners" },
    ],
  },
  {
    division: "womens-doubles",
    divisionLabel: divisionLabels["womens-doubles"],
    payoutBasis: "per-team",
    rows: [
      { placement: "Champion", amount: 12000, note: "Split between partners" },
      { placement: "Runner-Up", amount: 6000, note: "Split between partners" },
      { placement: "Semifinalist", amount: 3000, note: "Split between partners" },
    ],
  },
  {
    division: "mixed-doubles",
    divisionLabel: divisionLabels["mixed-doubles"],
    payoutBasis: "per-team",
    rows: [
      { placement: "Champion", amount: 10000, note: "Split between partners" },
      { placement: "Runner-Up", amount: 5000, note: "Split between partners" },
      { placement: "Semifinalist", amount: 2500, note: "Split between partners" },
    ],
  },
]

// Full Year Data
export const prizeMoneyData: Record<number, YearData> = {
  2026: {
    year: 2026,
    lastUpdated: "January 15, 2026",
    tours: [
      {
        tour: "PPA",
        tourLabel: "PPA Tour",
        description: "Professional Pickleball Association — premier professional tour",
        eventTypes: [
          {
            id: "slams",
            label: "Slams / Worlds",
            description: "Major championship events with the largest prize pools",
            tables: ppaSlamPayouts,
          },
          {
            id: "cups",
            label: "Cups",
            description: "Mid-tier signature events",
            tables: ppaCupPayouts,
          },
          {
            id: "opens",
            label: "Opens",
            description: "Standard tour stops",
            tables: ppaOpenPayouts,
          },
          {
            id: "challengers",
            label: "Challengers",
            description: "Entry-level professional events",
            tables: ppaChallengerPayouts,
          },
        ],
        sources: [
          { label: "PPA Tour Official Website", url: "https://www.ppatour.com" },
          { label: "PPA 2026 Player Handbook", url: "#" },
        ],
        effectiveSeason: "2026 Season",
      },
      {
        tour: "MLP",
        tourLabel: "Major League Pickleball",
        description: "Team-based professional league with franchise ownership",
        eventTypes: [
          {
            id: "events",
            label: "Event Prize Payouts",
            description: "Prize money awarded based on team finish at each MLP event",
            tables: mlpEventPayouts,
          },
          {
            id: "appearance",
            label: "Appearance / Participation",
            description: "Season-long compensation separate from event winnings",
            tables: mlpAppearancePayouts,
          },
        ],
        sources: [
          { label: "MLP Official Website", url: "https://www.majorleaguepickleball.net" },
          { label: "MLP 2026 Season Guide", url: "#" },
        ],
        effectiveSeason: "2026 Season",
      },
      {
        tour: "APP",
        tourLabel: "APP Tour",
        description: "Association of Pickleball Professionals — developmental and pro tour",
        eventTypes: [
          {
            id: "pros-tier1",
            label: "APP Pros - Tier 1 (150k)",
            description: "Tier 1 APP Pros events with $150k total purse",
            tables: appProsTier1Payouts,
          },
          {
            id: "pros-tier2",
            label: "APP Pros - Tier 2 (100k)",
            description: "Tier 2 APP Pros events with $100k total purse",
            tables: appProsTier2Payouts,
          },
          {
            id: "champions-pros-tier1",
            label: "APP Champions Pros - Tier 1 (150k)",
            description: "Tier 1 APP Champions Pros events with $150k total purse",
            tables: appChampionsProsTier1Payouts,
          },
          {
            id: "champions-pros-tier2",
            label: "APP Champions Pros - Tier 2 (100k)",
            description: "Tier 2 APP Champions Pros events with $100k total purse",
            tables: appChampionsProsTier2Payouts,
          },
          {
            id: "majors",
            label: "Major / Signature Events",
            description: "Top-tier APP events with enhanced prize pools",
            tables: appMajorPayouts,
          },
          {
            id: "standard",
            label: "Standard Tour Stops",
            description: "Regular season tour events",
            tables: appStandardPayouts,
          },
        ],
        sources: [
          { label: "APP Tour Official Website", url: "https://www.theapp.global" },
          { label: "APP 2026 Prize Structure", url: "#" },
        ],
        effectiveSeason: "2026 Season",
      },
    ],
  },
  2025: {
    year: 2025,
    lastUpdated: "December 31, 2025",
    tours: [
      {
        tour: "PPA",
        tourLabel: "PPA Tour",
        description: "Professional Pickleball Association — premier professional tour",
        eventTypes: [
          {
            id: "slams",
            label: "Slams / Worlds",
            description: "Major championship events with the largest prize pools",
            tables: ppaSlamPayouts.map((t) => ({
              ...t,
              rows: t.rows.map((r) => ({ ...r, amount: Math.round(r.amount * 0.9) })),
            })),
          },
          {
            id: "cups",
            label: "Cups",
            description: "Mid-tier signature events",
            tables: ppaCupPayouts.map((t) => ({
              ...t,
              rows: t.rows.map((r) => ({ ...r, amount: Math.round(r.amount * 0.9) })),
            })),
          },
          {
            id: "opens",
            label: "Opens",
            description: "Standard tour stops",
            tables: ppaOpenPayouts.map((t) => ({
              ...t,
              rows: t.rows.map((r) => ({ ...r, amount: Math.round(r.amount * 0.9) })),
            })),
          },
          {
            id: "challengers",
            label: "Challengers",
            description: "Entry-level professional events",
            tables: ppaChallengerPayouts.map((t) => ({
              ...t,
              rows: t.rows.map((r) => ({ ...r, amount: Math.round(r.amount * 0.9) })),
            })),
          },
        ],
        sources: [
          { label: "PPA Tour Official Website", url: "https://www.ppatour.com" },
          { label: "PPA 2025 Player Handbook", url: "#" },
        ],
        effectiveSeason: "2025 Season",
      },
      {
        tour: "MLP",
        tourLabel: "Major League Pickleball",
        description: "Team-based professional league with franchise ownership",
        eventTypes: [
          {
            id: "events",
            label: "Event Prize Payouts",
            description: "Prize money awarded based on team finish at each MLP event",
            tables: mlpEventPayouts.map((t) => ({
              ...t,
              rows: t.rows.map((r) => ({ ...r, amount: Math.round(r.amount * 0.9) })),
            })),
          },
          {
            id: "appearance",
            label: "Appearance / Participation",
            description: "Season-long compensation separate from event winnings",
            tables: mlpAppearancePayouts.map((t) => ({
              ...t,
              rows: t.rows.map((r) => ({ ...r, amount: Math.round(r.amount * 0.9) })),
            })),
          },
        ],
        sources: [
          { label: "MLP Official Website", url: "https://www.majorleaguepickleball.net" },
          { label: "MLP 2025 Season Guide", url: "#" },
        ],
        effectiveSeason: "2025 Season",
      },
      {
        tour: "APP",
        tourLabel: "APP Tour",
        description: "Association of Pickleball Professionals — developmental and pro tour",
        eventTypes: [
          {
            id: "pros-tier1",
            label: "APP Pros - Tier 1 (150k)",
            description: "Tier 1 APP Pros events with $150k total purse",
            tables: appProsTier1Payouts.map((t) => ({
              ...t,
              rows: t.rows.map((r) => ({ ...r, amount: Math.round(r.amount * 0.9) })),
            })),
          },
          {
            id: "pros-tier2",
            label: "APP Pros - Tier 2 (100k)",
            description: "Tier 2 APP Pros events with $100k total purse",
            tables: appProsTier2Payouts.map((t) => ({
              ...t,
              rows: t.rows.map((r) => ({ ...r, amount: Math.round(r.amount * 0.9) })),
            })),
          },
          {
            id: "champions-pros-tier1",
            label: "APP Champions Pros - Tier 1 (150k)",
            description: "Tier 1 APP Champions Pros events with $150k total purse",
            tables: appChampionsProsTier1Payouts.map((t) => ({
              ...t,
              rows: t.rows.map((r) => ({ ...r, amount: Math.round(r.amount * 0.9) })),
            })),
          },
          {
            id: "champions-pros-tier2",
            label: "APP Champions Pros - Tier 2 (100k)",
            description: "Tier 2 APP Champions Pros events with $100k total purse",
            tables: appChampionsProsTier2Payouts.map((t) => ({
              ...t,
              rows: t.rows.map((r) => ({ ...r, amount: Math.round(r.amount * 0.9) })),
            })),
          },
          {
            id: "majors",
            label: "Major / Signature Events",
            description: "Top-tier APP events with enhanced prize pools",
            tables: appMajorPayouts.map((t) => ({
              ...t,
              rows: t.rows.map((r) => ({ ...r, amount: Math.round(r.amount * 0.9) })),
            })),
          },
          {
            id: "standard",
            label: "Standard Tour Stops",
            description: "Regular season tour events",
            tables: appStandardPayouts.map((t) => ({
              ...t,
              rows: t.rows.map((r) => ({ ...r, amount: Math.round(r.amount * 0.9) })),
            })),
          },
        ],
        sources: [
          { label: "APP Tour Official Website", url: "https://www.theapp.global" },
          { label: "APP 2025 Prize Structure", url: "#" },
        ],
        effectiveSeason: "2025 Season",
      },
    ],
  },
}

export const availableYears = Object.keys(prizeMoneyData)
  .map(Number)
  .sort((a, b) => b - a)

export const currentYear = availableYears[0]

export function getPrizeMoneyData(year: string | number): YearData | undefined {
  const yearNum = typeof year === "string" ? Number.parseInt(year, 10) : year
  return prizeMoneyData[yearNum]
}

export function getYearData(year: number): YearData | undefined {
  return prizeMoneyData[year]
}

export function getTourData(year: number, tour: Tour): TourSection | undefined {
  const yearData = getYearData(year)
  return yearData?.tours.find((t) => t.tour === tour)
}

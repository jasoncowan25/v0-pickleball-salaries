export const TOUR_CONFIG = {
  ppa: {
    name: "PPA",
    fullName: "PPA Tour",
    subtitle: "Individual event prize money by finish and contract tier",
    metaTitle: "PPA Prize Money - 2026 Pro Earning Model | DinkBank",
    metaDescription:
      "Explore 2026 PPA Tour prize money and earnings across contract tiers (Gold Card, Standard, Futures) and event types (Slams, Finals, Cups, Opens).",
  },
  mlp: {
    name: "MLP",
    fullName: "Major League Pickleball",
    subtitle: "Team-based earnings and estimated per-player payouts",
    metaTitle: "MLP Prize Money - Team Earnings Model | DinkBank",
    metaDescription:
      "Major League Pickleball prize money breakdown with team-based earnings and estimated per-player payouts.",
  },
  app: {
    name: "APP",
    fullName: "APP Tour",
    subtitle: "Open-tour prize money by event and placement",
    metaTitle: "APP Prize Money - Open Tour Earnings | DinkBank",
    metaDescription:
      "APP Tour prize money structure for open-tour events with earnings by placement and division.",
  },
} as const

export type TourId = keyof typeof TOUR_CONFIG

export function isValidTour(tour: string): tour is TourId {
  return tour in TOUR_CONFIG
}

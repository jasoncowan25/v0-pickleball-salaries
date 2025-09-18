export type TourCode = "PPA" | "MLP" | "APP"

export type PlayerTour = {
  code: TourCode
  appearances?: number
  earnings?: number
  active?: boolean
}

export const TOUR_META: Record<TourCode, { label: string; full: string }> = {
  PPA: { label: "PPA", full: "Professional Pickleball Association" },
  MLP: { label: "MLP", full: "Major League Pickleball" },
  APP: { label: "APP", full: "Association of Pickleball Professionals" },
}

export const TOUR_BADGE_MIN_EVENTS = 2

export function computePrimaryTour(player: any): TourCode | undefined {
  if (!player.tours || player.tours.length === 0) return undefined

  // 1. If player has an exclusive contract flag
  const contractTour = player.tours.find((t: PlayerTour) => t.code && player.contract > 0)
  if (contractTour && player.tours.length === 1) return contractTour.code

  // 2. Pick tour with max appearances
  const toursByAppearances = [...player.tours].sort((a, b) => {
    const aAppearances = a.appearances || 0
    const bAppearances = b.appearances || 0
    if (bAppearances !== aAppearances) return bAppearances - aAppearances

    // 3. Tiebreaker: max earnings
    const aEarnings = a.earnings || 0
    const bEarnings = b.earnings || 0
    if (bEarnings !== aEarnings) return bEarnings - aEarnings

    // 4. Fixed order: PPA > MLP > APP
    const order = { PPA: 3, MLP: 2, APP: 1 }
    return (order[b.code] || 0) - (order[a.code] || 0)
  })

  return toursByAppearances[0]?.code
}

export function visibleTours(player: any): TourCode[] {
  if (!player.tours) return []

  // Filter tours that meet visibility criteria
  const visible = player.tours.filter(
    (tour: PlayerTour) => (tour.appearances || 0) >= TOUR_BADGE_MIN_EVENTS || (tour.earnings || 0) > 0,
  )

  const primary = computePrimaryTour(player)

  // Sort: primary first, then by appearances desc
  return visible
    .sort((a: PlayerTour, b: PlayerTour) => {
      if (a.code === primary) return -1
      if (b.code === primary) return 1
      return (b.appearances || 0) - (a.appearances || 0)
    })
    .map((tour: PlayerTour) => tour.code)
}

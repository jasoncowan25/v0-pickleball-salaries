import { TourBadge } from "./TourBadge"
import { TOUR_META, type TourCode } from "@/lib/tours"

type Props = {
  tours: TourCode[]
  primary?: TourCode
  mobile?: boolean
}

export function TourBadges({ tours, primary, mobile = false }: Props) {
  if (tours.length === 0) return <span className="text-gray-400">—</span>

  if (mobile) {
    const primaryTour = tours.find((t) => t === primary) || tours[0]
    const secondaryCount = tours.length - 1

    return (
      <div className="flex items-center gap-1">
        <TourBadge code={primaryTour} primary={true} />
        {secondaryCount > 0 && (
          <div
            className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
            title={`Also plays: ${tours
              .slice(1)
              .map((t) => TOUR_META[t].label)
              .join(", ")}`}
          >
            +{secondaryCount}
          </div>
        )}
      </div>
    )
  }

  const visibleTours = tours.slice(0, 3)
  const overflowCount = tours.length - 3

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {visibleTours.map((tour, index) => (
        <TourBadge key={tour} code={tour} primary={tour === primary} />
      ))}
      {overflowCount > 0 && (
        <div
          className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
          title={`Also: ${tours
            .slice(3)
            .map((t) => TOUR_META[t].label)
            .join(", ")}`}
        >
          +{overflowCount}
        </div>
      )}
    </div>
  )
}

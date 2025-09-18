import { TOUR_META, type TourCode } from "@/lib/tours"
import { cn } from "@/lib/utils"

type Props = {
  code: TourCode
  primary?: boolean
  className?: string
}

const tourColors = {
  PPA: "bg-blue-100 text-blue-800",
  MLP: "bg-green-100 text-green-800",
  APP: "bg-purple-100 text-purple-800",
}

export function TourBadge({ code, primary = false, className }: Props) {
  const tourInfo = TOUR_META[code]

  return (
    <div
      role="img"
      aria-label={tourInfo.full}
      title={tourInfo.full}
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        tourColors[code],
        primary && "ring-1 ring-black/10 shadow-sm font-semibold",
        className,
      )}
    >
      {tourInfo.label}
    </div>
  )
}

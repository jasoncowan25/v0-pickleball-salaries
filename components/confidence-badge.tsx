interface ConfidenceBadgeProps {
  status: "confirmed" | "reported" | "estimated"
  className?: string
}

export function ConfidenceBadge({ status, className = "" }: ConfidenceBadgeProps) {
  const styles = {
    confirmed: "bg-[#FFD400] text-black font-semibold",
    reported: "bg-[#EFEFEF] text-[#111] font-semibold",
    estimated: "bg-[#F5F5F5] text-[#111] font-semibold",
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs rounded-full whitespace-nowrap ${styles[status]} ${className}`}
    >
      {status}
    </span>
  )
}

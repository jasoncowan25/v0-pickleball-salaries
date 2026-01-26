interface ConfidenceBadgeProps {
  status: "confirmed" | "reported" | "estimated"
  className?: string
}

export function ConfidenceBadge({ status, className = "" }: ConfidenceBadgeProps) {
  if (status === "confirmed") {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-400"
        >
          <path
            d="M13.5 4.5L6 12L2.5 8.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    )
  }

  const styles = {
    reported: "bg-[#EFEFEF] text-[#111] font-semibold",
    estimated: "bg-[#F5F5F5] text-[#111] font-semibold",
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs rounded-full whitespace-nowrap ${styles[status as "reported" | "estimated"]} ${className}`}
    >
      {status}
    </span>
  )
}

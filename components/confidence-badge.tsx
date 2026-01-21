interface ConfidenceBadgeProps {
  status: "confirmed" | "reported" | "estimated"
  className?: string
}

export function ConfidenceBadge({ status, className = "" }: ConfidenceBadgeProps) {
  if (status === "confirmed") {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <div
          className="flex items-center justify-center"
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "#F5F5F5",
            border: "1px solid #D4D4D4",
            borderRadius: "6px",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "#525252" }}
          >
            <path
              d="M10 3L4.5 8.5L2 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
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

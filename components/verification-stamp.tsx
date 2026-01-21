import { TooltipCustom } from "./ui/tooltip-custom"

interface VerificationStampProps {
  variant?: "verified" | "estimated"
}

export function VerificationStamp({ variant = "verified" }: VerificationStampProps) {
  if (variant === "estimated") {
    return (
      <TooltipCustom content="DinkBank Estimate" subtitle="Internal DinkBank estimate based on known structures">
        <div
          className="flex items-center justify-center"
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "#FAFAFA",
            border: "1px dashed #D4D4D4",
            borderRadius: "6px",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "#A3A3A3" }}
          >
            <path
              d="M2 12C2 12 5 9 8 9C11 9 14 15 17 15C20 15 23 12 23 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </TooltipCustom>
    )
  }

  return (
    <TooltipCustom
      content="DinkBank Confirmed"
      subtitle="Verified by DinkBank using official or reported sources."
    >
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
    </TooltipCustom>
  )
}

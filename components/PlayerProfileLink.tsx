import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PlayerProfileLinkProps {
  href: string
  name: string
  gender?: string
  location?: string
  headshotUrl?: string
  className?: string
  avatarSize?: "small" | "large"
}

export default function PlayerProfileLink({
  href,
  name,
  gender,
  location,
  headshotUrl,
  className = "",
  avatarSize = "small",
}: PlayerProfileLinkProps) {
  const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/)
    if (words.length === 1) return words[0].charAt(0).toUpperCase()
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
  }

  const avatarClasses = avatarSize === "large" ? "h-10 w-10" : "h-8 w-8"

  return (
    <Link href={href} className={`group inline-flex items-center gap-3 focus-visible:outline-none ${className}`}>
      <Avatar
        className={`
          ${avatarClasses} border border-gray-300 shrink-0
          transition-shadow duration-150
          group-hover:shadow-[0_0_0_2px_rgba(17,24,39,0.12)]
          group-focus-visible:shadow-[0_0_0_2px_rgba(234,179,8,0.35)]
        `}
      >
        <AvatarImage src={headshotUrl || "/placeholder.svg"} alt={name} />
        <AvatarFallback className="text-sm font-semibold">{getInitials(name)}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="font-medium flex items-center gap-2">
          <span className="truncate underline decoration-transparent group-hover:decoration-current transition-[text-decoration-color]">
            {name}
          </span>
          <span
            aria-hidden="true"
            className="opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-focus-visible:opacity-100 group-focus-visible:translate-x-0.5 text-gray-400 transition"
          >
            →
          </span>
        </div>
        {(gender || location) && (
          <div className="text-sm text-muted-foreground">
            {gender && location ? `${gender} • ${location}` : gender || location}
          </div>
        )}
      </div>
    </Link>
  )
}

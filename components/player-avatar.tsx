"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface PlayerAvatarProps {
  playerImage?: string | null
  playerName: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-16 w-16 text-lg",
}

export function PlayerAvatar({ playerImage, playerName, size = "md", className }: PlayerAvatarProps) {
  // Generate initials from player name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) // Limit to 2 characters max
  }

  const initials = getInitials(playerName)

  return (
    <Avatar
      className={cn(
        // Base styles with professional sports-finance aesthetic
        "border border-gray-200 transition-all duration-200",
        // Hover state with subtle elevation
        "hover:shadow-md hover:border-gray-300",
        // Size variants
        sizeClasses[size],
        className,
      )}
      aria-label={`${playerName} profile picture`}
    >
      <AvatarImage src={playerImage || "/placeholder.svg"} alt={`${playerName} headshot`} className="object-cover" />
      <AvatarFallback
        className={cn(
          // Professional styling with high contrast
          "bg-gray-50 text-gray-900 font-bold",
          // Ensure text scales with avatar size
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          size === "lg" && "text-lg",
        )}
        aria-label={`${playerName} initials`}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}

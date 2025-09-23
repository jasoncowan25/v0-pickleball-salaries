"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface PlayerAvatarProps {
  playerImage?: string | null
  playerName: string
  size?: "small" | "large"
  href?: string
  className?: string
}

const sizeClasses = {
  small: "h-12 w-12 text-base",
  large: "h-24 w-24 text-2xl",
}

const getInitials = (name: string): string => {
  const words = name.trim().split(/\s+/)
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase()
  }
  // Take first letter of first word and first letter of last word
  const firstInitial = words[0].charAt(0).toUpperCase()
  const lastInitial = words[words.length - 1].charAt(0).toUpperCase()
  return firstInitial + lastInitial
}

export function PlayerAvatar({ playerImage, playerName, size = "small", href, className }: PlayerAvatarProps) {
  const initials = getInitials(playerName)

  const avatarElement = (
    <Avatar className={cn("border border-gray-300 shrink-0", sizeClasses[size], className)}>
      {playerImage ? (
        <AvatarImage src={playerImage || "/placeholder.svg"} alt={playerName} className="object-cover object-center" />
      ) : null}
      <AvatarFallback className="bg-gray-100 text-gray-800 font-bold" role="img" aria-label={playerName}>
        <span aria-hidden="true">{initials}</span>
      </AvatarFallback>
    </Avatar>
  )

  if (href) {
    return (
      <a href={href} className="inline-block">
        {avatarElement}
      </a>
    )
  }

  return avatarElement
}

type Props = { href: string; name: string; className?: string }

export default function PlayerNameLink({ href, name, className = "" }: Props) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-1 text-gray-900 focus-visible:outline-none 
                  focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-sm ${className}`}
    >
      {/* Player name */}
      <span className="truncate underline decoration-transparent group-hover:decoration-current transition-[text-decoration-color] duration-150">
        {name}
      </span>

      {/* Reserved arrow space to avoid layout shift */}
      <span
        aria-hidden="true"
        className="shrink-0 opacity-0 translate-x-0 
                   group-hover:opacity-100 group-hover:translate-x-0.5 
                   group-focus-visible:opacity-100 group-focus-visible:translate-x-0.5
                   transition duration-150 ease-out"
      >
        →
      </span>
    </a>
  )
}

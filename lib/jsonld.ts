import type { Player, EventPayout } from "./mock-data"

export function generatePlayerJsonLd(player: Player) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://pickleballmoneylist.com/players/${player.slug}`,
    name: player.name,
    jobTitle: "Professional Pickleball Player",
    nationality: player.country,
    sport: "Pickleball",
    award: `$${player.totals.allTimePrize.toLocaleString()} career prize money`,
  }
}

export function generatePlayersListJsonLd(players: Player[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Pickleball Earnings Index",
    description: "Professional pickleball player earnings rankings",
    itemListElement: players.slice(0, 10).map((player, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Person",
        name: player.name,
        url: `https://pickleballmoneylist.com/players/${player.slug}`,
      },
    })),
  }
}

export function generateEventJsonLd(event: EventPayout) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: event.eventName,
    startDate: event.date,
    location: {
      "@type": "Place",
      name: event.city,
    },
    organizer: {
      "@type": "Organization",
      name: `${event.tour} Tour`,
    },
    offers: {
      "@type": "Offer",
      price: event.purse,
      priceCurrency: "USD",
    },
  }
}

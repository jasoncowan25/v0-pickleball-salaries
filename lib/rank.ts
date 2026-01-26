import { mockPlayers, mockPayouts } from "./mock-data"

export function getRankedPlayers(timeframe: "ytd" | "alltime" = "ytd") {
  return mockPlayers
    .map((player) => ({
      ...player,
      rankValue: timeframe === "ytd" ? player.totals.ytdPrize : player.totals.allTimePrize,
    }))
    .sort((a, b) => b.rankValue - a.rankValue)
    .map((player, index) => ({
      ...player,
      rank: index + 1,
    }))
}

export function getPlayerPayouts(playerId: string) {
  const player = mockPlayers.find((p) => p.id === playerId)
  return mockPayouts
    .filter((payout) => payout.playerId === playerId)
    .map((payout) => ({
      ...payout,
      contractTier: player?.contractTier,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

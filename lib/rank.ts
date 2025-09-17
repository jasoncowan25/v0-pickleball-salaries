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
  return mockPayouts
    .filter((payout) => payout.playerId === playerId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

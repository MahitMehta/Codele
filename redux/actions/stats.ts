import { EStatsActions, ISetCurrentStreak, ISetGamesPlayed, ISetGamesWon, ISetMaxStreak } from "../constants/stats";

export const setGamesPlayed = (payload:number) : ISetGamesPlayed => ({
    type: EStatsActions.SET_GAMES_PLAYED,
    payload,
})

export const setGamesWon = (payload:number) : ISetGamesWon => ({
    type: EStatsActions.SET_GAMES_WON,
    payload,
})

export const setCurrentStreak = (payload:number) : ISetCurrentStreak => ({
    type: EStatsActions.SET_CURRENT_STREAK,
    payload,
})
export const setMaxStreak = (payload:number) : ISetMaxStreak => ({
    type: EStatsActions.SET_MAX_STREAK,
    payload,
})
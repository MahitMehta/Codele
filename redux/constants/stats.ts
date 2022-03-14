export enum EStatsActions {
    SET_GAMES_WON = "SET_GAMES_WON",
    SET_GAMES_PLAYED = "SET_GAMES_PLAYED",
    SET_CURRENT_STREAK = "SET_CURRENT_STREAK",
    SET_MAX_STREAK = "SET_MAX_STREAK",
}

export interface ISetGamesWon {
    type: EStatsActions.SET_GAMES_WON,
    payload: number; 
}

export interface ISetGamesPlayed {
    type: EStatsActions.SET_GAMES_PLAYED,
    payload: number; 
}

export interface ISetCurrentStreak {
    type: EStatsActions.SET_CURRENT_STREAK,
    payload: number; 
}

export interface ISetMaxStreak {
    type: EStatsActions.SET_MAX_STREAK,
    payload: number; 
}
import { IRootReducer } from "../reducers";

export const getGamesWon = (state:IRootReducer) => state.stats.gamesWon;
export const getCurrentStreak = (state:IRootReducer) => state.stats.currentStreak;
export const getMaxStreak = (state:IRootReducer) => state.stats.maxStreak;
export const getGamesPlayed = (state:IRootReducer) => state.stats.gamesPlayed;
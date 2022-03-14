import { EStatsActions } from "../constants/stats";
import { IAction } from "../interfaces/action";

export interface IStatsReducer {
   currentStreak: number; 
   gamesPlayed: number; 
   gamesWon: number; 
   maxStreak: number; 
}

const initialState : IStatsReducer = {
    currentStreak: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    maxStreak: 0,
};

const statsReducer = (state:IStatsReducer=initialState, action:IAction) : IStatsReducer => {
    switch(action.type) {
        case EStatsActions.SET_CURRENT_STREAK: {
            return { ...state, currentStreak: action.payload }
        }
        case EStatsActions.SET_MAX_STREAK: {
            return { ...state, maxStreak: action.payload }
        }
        case EStatsActions.SET_GAMES_WON: {
            return { ...state, gamesWon: action.payload }
        }
        case EStatsActions.SET_GAMES_PLAYED: {
            return { ...state, gamesPlayed: action.payload }
        }
        default: {
            return state; 
        }
    }
};

export { statsReducer };
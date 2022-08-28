import { IPuzzleCharacter } from "../../components/GameBoard/interfaces/puzzleCharacter";
import { EBoard } from "../constants/board";
import { EGameType } from "../enums/gameType";
import { EPuzzleStatus } from "../enums/puzzleStatus";
import { IAction } from "../interfaces/action";

export interface IBoardReducer {
    puzzleAttempts: IPuzzleCharacter[][],
    puzzleAttemptsUnlimited: IPuzzleCharacter[][],
    puzzleStatus: string;
    puzzleStatusUnlimited: string; 
    puzzlePatternUnlimited?: string[]; 
    puzzlePattern?: string; 
    puzzleTimestamp?: string; 
}

interface IBoardAction extends IAction {
    gameType?: EGameType
}

const initialState : IBoardReducer = {
    puzzleAttempts: [],
    puzzleAttemptsUnlimited: [],
    puzzleStatus: EPuzzleStatus.IN_PROGRESS,
    puzzleStatusUnlimited: EPuzzleStatus.IN_PROGRESS
};

const boardReducer = (state:IBoardReducer=initialState, action:IBoardAction) : IBoardReducer => {
    switch(action.type) {
        case EBoard.SET_PUZZLE_ATTEMPTS: {
            return { 
                ...state, 
                [ action.gameType === EGameType.DAILY ? "puzzleAttempts" : "puzzleAttemptsUnlimited" ]: action.payload 
            };
        }   
        case EBoard.SET_STATUS: {
            return { 
                ...state, 
                [ action.gameType === EGameType.DAILY ? "puzzleStatus" : "puzzleStatusUnlimited" ]: action.payload,
            }
        }
        case EBoard.SET_PUZZLE_IDENTIFERS_UNLIMITED: {
            return {
                ...state,
                puzzlePatternUnlimited: action.payload.puzzlePattern
            }
        }
        case EBoard.SET_PUZZLE_IDENTIFERS: {
            return { 
                ...state,
                puzzlePattern: action.payload.puzzlePattern,
                puzzleTimestamp: action.payload.puzzleTimestamp
            }
        }
        default: {
            return state; 
        }
    }
};

export { boardReducer };
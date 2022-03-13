import { IPuzzleCharacter } from "../../components/GameBoard/interfaces/puzzleCharacter";
import { EBoard } from "../constants/board";
import { EPuzzleStatus } from "../enums/puzzleStatus";
import { IAction } from "../interfaces/action";

export interface IBoardReducer {
    puzzleAttempts: IPuzzleCharacter[][],
    puzzlePattern?: string; 
    puzzleTimestamp?: string; 
    puzzleStatus: string;
}

const initialState : IBoardReducer = {
    puzzleAttempts: [],
    puzzleStatus: EPuzzleStatus.IN_PROGRESS,
};

const boardReducer = (state:IBoardReducer=initialState, action:IAction) : IBoardReducer => {
    switch(action.type) {
        case EBoard.SET_PUZZLE_ATTEMPTS: {
            return { ...state, puzzleAttempts: action.payload };
        }   
        case EBoard.SET_STATUS: {
            return { ...state, puzzleStatus: action.payload }
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
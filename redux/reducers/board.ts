import { IPuzzleCharacter } from "../../components/GameBoard/interfaces/puzzleCharacter";
import { EBoard } from "../constants/board";
import { IAction } from "../interfaces/action";

export interface IBoardReducer {
    puzzleAttempts: IPuzzleCharacter[][],
}

const initialState : IBoardReducer = {
    puzzleAttempts: [],
};

const boardReducer = (state:IBoardReducer=initialState, action:IAction) : IBoardReducer => {
    switch(action.type) {
        case EBoard.SET_PUZZLE_ATTEMPTS: {
            return { ...state, puzzleAttempts: action.payload };
        }
        default: {
            return state; 
        }
    }
};

export { boardReducer };
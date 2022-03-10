import { IPuzzleCharacter } from "../../components/GameBoard/interfaces/puzzleCharacter";
import { ETempBoard } from "../constants/tempBoard";
import { IAction } from "../interfaces/action";

export interface ITempBoardReducer {
    currentAttempt: IPuzzleCharacter[],
    sequence: string[],
}

const initialState : ITempBoardReducer = {
   currentAttempt: [],
   sequence: [],
};

const tempBoardReducer = (state:ITempBoardReducer=initialState, action:IAction) : ITempBoardReducer => {
    switch(action.type) {
        case ETempBoard.SET_CURRENT_ATTEMPT: {
            return { ...state, currentAttempt: action.payload };
        }
        case ETempBoard.SET_PUZZLE_SEQUENCE: {
            return { ...state, sequence: action.payload };
        }
        default: {
            return state; 
        }
    }
};

export { tempBoardReducer };
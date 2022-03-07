import { IPuzzleCharacter } from "../../components/GameBoard/interfaces/puzzleCharacter";
import { ETempBoard } from "../constants/tempBoard";
import { IAction } from "../interfaces/action";

export interface ITempBoardReducer {
    currentAttempt: IPuzzleCharacter[],
}

const initialState : ITempBoardReducer = {
   currentAttempt: [],
};

const tempBoardReducer = (state:ITempBoardReducer=initialState, action:IAction) : ITempBoardReducer => {
    switch(action.type) {
        case ETempBoard.SET_CURRENT_ATTEMPT: {
            return { ...state, currentAttempt: action.payload };
        }
        default: {
            return state; 
        }
    }
};

export { tempBoardReducer };
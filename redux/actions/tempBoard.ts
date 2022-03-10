import { IPuzzleCharacter } from "../../components/GameBoard/interfaces/puzzleCharacter";
import { ETempBoard, ISetCurrentAttempt, ISetPuzzleSequence } from "../constants/tempBoard";

export const setCurrentAttempt = (payload:IPuzzleCharacter[]) : ISetCurrentAttempt => ({
    type: ETempBoard.SET_CURRENT_ATTEMPT,
    payload,
})

export const setPuzzleSequence = (payload:string[]) : ISetPuzzleSequence => ({
    type: ETempBoard.SET_PUZZLE_SEQUENCE,
    payload,
})
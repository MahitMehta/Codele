import { IPuzzleCharacter } from "../../components/GameBoard/interfaces/puzzleCharacter";
import { ETempBoard, ISetCurrentAttempt } from "../constants/tempBoard";

export const setCurrentAttempt = (payload:IPuzzleCharacter[]) : ISetCurrentAttempt => ({
    type: ETempBoard.SET_CURRENT_ATTEMPT,
    payload,
})
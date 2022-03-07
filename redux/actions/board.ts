import { IPuzzleCharacter } from "../../components/GameBoard/interfaces/puzzleCharacter";
import { EBoard, ISetPuzzleAttempts } from "../constants/board";

export const setPuzzleAttempts = (payload:IPuzzleCharacter[][]) : ISetPuzzleAttempts => ({
    type: EBoard.SET_PUZZLE_ATTEMPTS,
    payload,
})
import { IPuzzleCharacter } from "../../components/GameBoard/interfaces/puzzleCharacter";
import { EBoard, ISetPuzzleAttempts } from "../constants/board";
import { EPuzzleStatus } from "../enums/puzzleStatus";

export const setPuzzleAttempts = (payload:IPuzzleCharacter[][]) : ISetPuzzleAttempts => ({
    type: EBoard.SET_PUZZLE_ATTEMPTS,
    payload,
})

export const setPuzzleIdentifers = (payload: { puzzlePattern: string, puzzleTimestamp: string }) => ({
    type: EBoard.SET_PUZZLE_IDENTIFERS,
    payload,
})

export const setPuzzleStatus = (payload:EPuzzleStatus) => ({
    type: EBoard.SET_STATUS,
    payload,
});
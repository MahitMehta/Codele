import { IPuzzleCharacter } from "../../components/GameBoard/interfaces/puzzleCharacter";

export enum EBoard {
    SET_PUZZLE_ATTEMPTS = "SET_PUZZLE_ATTEMPTS"
}

export interface ISetPuzzleAttempts {
    type: EBoard.SET_PUZZLE_ATTEMPTS,
    payload: IPuzzleCharacter[][]
}
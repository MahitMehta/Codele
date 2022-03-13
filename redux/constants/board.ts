import { IPuzzleCharacter } from "../../components/GameBoard/interfaces/puzzleCharacter";

export enum EBoard {
    SET_PUZZLE_ATTEMPTS = "SET_PUZZLE_ATTEMPTS",
    SET_PUZZLE_IDENTIFERS = "SET_PUZZLE_IDENTIFERS",
    SET_STATUS = "SET_STATUS"
}

export interface ISetPuzzleAttempts {
    type: EBoard.SET_PUZZLE_ATTEMPTS,
    payload: IPuzzleCharacter[][]
}

export interface ISetPuzzleIdentifiers {
    type: EBoard.SET_PUZZLE_IDENTIFERS,
    payload: {
        puzzlePattern: string,
        puzzleTimestamp: string,
    }
}
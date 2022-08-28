import { IPuzzleCharacter } from "../../components/GameBoard/interfaces/puzzleCharacter";
import { EGameType } from "../enums/gameType";

export enum EBoard {
    SET_PUZZLE_ATTEMPTS = "SET_PUZZLE_ATTEMPTS",
    SET_PUZZLE_IDENTIFERS = "SET_PUZZLE_IDENTIFERS",
    SET_STATUS = "SET_STATUS",
    SET_PUZZLE_IDENTIFERS_UNLIMITED = "SET_PUZZLE_IDENTIFERS_UNLIMITED"
}

export interface ISetPuzzleAttempts {
    type: EBoard.SET_PUZZLE_ATTEMPTS,
    payload: IPuzzleCharacter[][],
    gameType: EGameType
}

export interface ISetPuzzleIdentifiers {
    type: EBoard.SET_PUZZLE_IDENTIFERS,
    payload: {
        puzzlePattern: string,
        puzzleTimestamp: string,
    }
}

export interface ISetPuzzleIdentifiersUnlimited {
    type: EBoard.SET_PUZZLE_IDENTIFERS_UNLIMITED,
    payload: {
        puzzlePattern: string[]
    }
}
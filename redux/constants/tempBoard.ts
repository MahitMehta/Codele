import { IPuzzleCharacter } from "../../components/GameBoard/interfaces/puzzleCharacter";

export enum ETempBoard {
    SET_CURRENT_ATTEMPT = "SET_CURRENT_ATTEMPT",
    SET_PUZZLE_SEQUENCE = "SET_PUZZLE_SEQUENCE"
}

export interface ISetCurrentAttempt {
    type: ETempBoard.SET_CURRENT_ATTEMPT,
    payload: IPuzzleCharacter[]
}

export interface ISetPuzzleSequence {
    type: ETempBoard.SET_PUZZLE_SEQUENCE,
    payload: string[],
}
import { IPuzzleCharacter } from "../../components/GameBoard/interfaces/puzzleCharacter";

export enum ETempBoard {
    SET_CURRENT_ATTEMPT = "SET_CURRENT_ATTEMPT"
}

export interface ISetCurrentAttempt {
    type: ETempBoard.SET_CURRENT_ATTEMPT,
    payload: IPuzzleCharacter[]
}
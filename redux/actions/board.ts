import { IPuzzleCharacter } from "../../components/GameBoard/interfaces/puzzleCharacter";
import { EBoard, ISetPuzzleAttempts, ISetPuzzleIdentifiers, ISetPuzzleIdentifiersUnlimited } from "../constants/board";
import { EGameType } from "../enums/gameType";
import { EPuzzleStatus } from "../enums/puzzleStatus";

export const setPuzzleAttempts = (payload:IPuzzleCharacter[][], gameType:EGameType) : ISetPuzzleAttempts => ({
    type: EBoard.SET_PUZZLE_ATTEMPTS,
    payload,
    gameType
})

export const setPuzzleIdentifers = (payload: { puzzlePattern: string, puzzleTimestamp: string }) : ISetPuzzleIdentifiers => ({
    type: EBoard.SET_PUZZLE_IDENTIFERS,
    payload,
})

export const setPuzzleIdentifersUnlimited = (payload: { puzzlePattern: string[] }) : ISetPuzzleIdentifiersUnlimited => ({
    type: EBoard.SET_PUZZLE_IDENTIFERS_UNLIMITED,
    payload,
})

export const setPuzzleStatus = (payload:EPuzzleStatus, gameType:EGameType) => ({
    type: EBoard.SET_STATUS,
    payload,
    gameType
});
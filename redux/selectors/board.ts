import { EGameType } from "../enums/gameType";
import { IRootReducer } from "../reducers";

export const getPuzzleAttempts = (state:IRootReducer, gameType: EGameType = EGameType.DAILY) => {
    return gameType === EGameType.DAILY ? state.board.puzzleAttempts : state.board.puzzleAttemptsUnlimited;
}

export const getPuzzleStatus = (state:IRootReducer, gameType: EGameType = EGameType.DAILY) => {
    return gameType === EGameType.DAILY ? state.board.puzzleStatus : state.board.puzzleStatusUnlimited;
}

export const getPuzzlePattern = (state:IRootReducer) => state.board.puzzlePattern;
export const getPuzzlePatternUnlimited = (state:IRootReducer) => state.board.puzzlePatternUnlimited;
export const getPuzzleTimestamp = (state:IRootReducer) => state.board.puzzleTimestamp;
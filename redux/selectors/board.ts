import { EGameType } from "../enums/gameType";
import { EPuzzleStatus } from "../enums/puzzleStatus";
import { IRootReducer } from "../reducers";

export const getPuzzleAttempts = (state:IRootReducer, gameType: EGameType = EGameType.DAILY) => {
    const attempts = gameType === EGameType.DAILY ? state.board.puzzleAttempts : state.board.puzzleAttemptsUnlimited;
    return attempts || [];
}

export const getPuzzleStatus = (state:IRootReducer, gameType: EGameType = EGameType.DAILY) => {
    const status = gameType === EGameType.DAILY ? state.board.puzzleStatus : state.board.puzzleStatusUnlimited;
    return status || EPuzzleStatus.IN_PROGRESS;
}

export const getPuzzlePattern = (state:IRootReducer) => state.board.puzzlePattern;
export const getPuzzlePatternUnlimited = (state:IRootReducer) => state.board.puzzlePatternUnlimited;
export const getPuzzleTimestamp = (state:IRootReducer) => state.board.puzzleTimestamp;
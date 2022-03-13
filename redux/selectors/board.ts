import { IRootReducer } from "../reducers";

export const getPuzzleAttempts = (state:IRootReducer) => state.board.puzzleAttempts;
export const getPuzzlePattern = (state:IRootReducer) => state.board.puzzlePattern;
export const getPuzzleTimestamp = (state:IRootReducer) => state.board.puzzleTimestamp;
export const getPuzzleStatus = (state:IRootReducer) => state.board.puzzleStatus;
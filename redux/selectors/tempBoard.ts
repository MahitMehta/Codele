import { IRootReducer } from "../reducers";

export const getCurrentAttempt = (state:IRootReducer) => state.tempBoard.currentAttempt;
export const getPuzzleSequence = (state:IRootReducer) => state.tempBoard.sequence;
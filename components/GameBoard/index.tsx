import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { IRootReducer } from "../../redux/reducers";
import { getPuzzleAttempts } from "../../redux/selectors/board";
import { getCurrentAttempt } from "../../redux/selectors/tempBoard";
import PuzzleRow from "./components/PuzzleRow";
import { ESymbolStatus } from "./enums/symbolStatus";
import { IPuzzleCharacter } from "./interfaces/puzzleCharacter";

const ATTEMPTS = 6; 
const MAX_SYMBOLS = 8; 

const GameBoard = () => {
    const state = useSelector((state:IRootReducer) => state);
    const currentAttempt = getCurrentAttempt(state); 

    const puzzleAttempts = getPuzzleAttempts(state);

    const futureAttempts:IPuzzleCharacter[][] = Array.from({ length: ATTEMPTS - puzzleAttempts.length - 1 }).map(() => (
        Array.from({ length: MAX_SYMBOLS }).map(() => ({ status: ESymbolStatus.UNKNOWN, symbol: "" }))
    ))

    const currentAttemptHydrated = useMemo(() => {
        return [ ...currentAttempt, ...Array.from({ length: MAX_SYMBOLS - currentAttempt.length }).map(() => ({ symbol: "", status: ESymbolStatus.UNKNOWN }))];
    }, [ currentAttempt ]);

    const attempts = useMemo(() => {
        if (puzzleAttempts.length >= ATTEMPTS) return puzzleAttempts;
        else  return [ ...puzzleAttempts, currentAttemptHydrated, ...futureAttempts ];
    }, [ puzzleAttempts, futureAttempts, currentAttemptHydrated ]);

    return (
        <div className="md:p-5 p-[5px] my-10 md:my-0 w-screen flex justify-center">
            <div className="border-black/5 dark:border-white/5 w-full md:w-[auto] border not-prose relative bg-slate-50 rounded-sm md:p-5 p-[5px] overflow-hidden dark:bg-slate-800/25">
                {
                    attempts.map((attempt, index) => (
                        <PuzzleRow key={index} attempt={attempt} />
                    ))
                }
            </div>
        </div>
    )
}

export default GameBoard;
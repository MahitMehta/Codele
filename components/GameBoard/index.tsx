import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import config from "../../config";
import { IRootReducer } from "../../redux/reducers";
import { getPuzzleAttempts } from "../../redux/selectors/board";
import { getCurrentAttempt } from "../../redux/selectors/tempBoard";
import PuzzleRow from "./components/PuzzleRow";
import { ESymbolStatus } from "./enums/symbolStatus";
import { IPuzzleCharacter } from "./interfaces/puzzleCharacter";

const GameBoard = () => {
    const state = useSelector((state:IRootReducer) => state);
    const currentAttempt = getCurrentAttempt(state); 

    const puzzleAttempts = getPuzzleAttempts(state);

    const futureAttempts:IPuzzleCharacter[][] = Array.from({ length: config.max_attempts - puzzleAttempts.length - 1 }).map(() => (
        Array.from({ length: config.max_symbols }).map(() => ({ status: ESymbolStatus.UNKNOWN, symbol: "" }))
    ))

    const currentAttemptHydrated = useMemo(() => {
        return [ ...currentAttempt, ...Array.from({ length: config.max_symbols - currentAttempt.length }).map(() => ({ symbol: "", status: ESymbolStatus.UNKNOWN }))];
    }, [ currentAttempt ]);

    const attempts = useMemo(() => {
        if (puzzleAttempts.length >= config.max_attempts) return puzzleAttempts;
        else  return [ ...puzzleAttempts, currentAttemptHydrated, ...futureAttempts ];
    }, [ puzzleAttempts, futureAttempts, currentAttemptHydrated ]);

    return (
        <div className="md:p-5 p-[5px] my-10 md:my-0 w-screen flex justify-center">
            <div className="border-black/5 dark:border-white/5 w-full md:w-auto border not-prose relative bg-slate-50 rounded-sm md:p-5 p-[5px] overflow-hidden dark:bg-slate-800/25">
                <div className="w-full md:w-screen md:max-w-[500px]">
                    {
                        attempts.map((attempt, index) => (
                            <PuzzleRow key={index} attempt={attempt} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default GameBoard;
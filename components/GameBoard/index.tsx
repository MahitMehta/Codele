import React from "react";
import PuzzleRow from "./components/PuzzleRow";

const ATTEMPTS = 6; 

const GameBoard = () => {
    return (
        <div className="p-5 w-screen flex justify-center">
            <div className="border-black/5 dark:border-white/5 w-full md:w-[auto] border not-prose relative bg-slate-50 rounded-xl p-5 overflow-hidden dark:bg-slate-800/25">
                {
                    Array.from({ length: ATTEMPTS }).map(() => (
                        <PuzzleRow />
                    ))
                }
            </div>
        </div>
    )
}

export default GameBoard;
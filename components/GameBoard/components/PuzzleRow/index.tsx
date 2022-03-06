import React from "react";
import PuzzlePiece from "../PuzzlePiece";

const PIECES = 7; 

const PuzzleRow = () => {
    return (
        <div className="flex justify-center shrink w-full md:w-screen md:max-w-[500px]">
           {
                Array.from({ length: PIECES }).map(() => (
                    <PuzzlePiece />
                ))
            }
        </div>
    )
}

export default PuzzleRow; 
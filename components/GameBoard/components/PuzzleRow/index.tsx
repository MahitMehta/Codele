import React from "react";
import { IPuzzleCharacter } from "../../interfaces/puzzleCharacter";
import PuzzlePiece from "../PuzzlePiece";

interface PuzzleRowProps {
    attempt: IPuzzleCharacter[]
}

const PuzzleRow : React.FC<PuzzleRowProps> = ({ attempt }) => {
    return (
        <div className="flex justify-center shrink w-full md:w-screen md:max-w-[500px]">
           {
                attempt.map((character, index) => (
                    <PuzzlePiece index={index} key={index} { ...character } />
                ))
            }
        </div>
    )
}

export default PuzzleRow; 
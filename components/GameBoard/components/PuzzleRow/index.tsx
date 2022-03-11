import React from "react";
import { IPuzzleCharacter } from "../../interfaces/puzzleCharacter";
import PuzzlePiece from "../PuzzlePiece";
import clsx from "clsx";

interface PuzzleRowProps {
    attempt: IPuzzleCharacter[]
    containerClassName?: string;
}

const PuzzleRow : React.FC<PuzzleRowProps> = ({ attempt, containerClassName }) => {
    return (
        <div className={clsx("flex justify-center shrink", containerClassName)}>
           {
                attempt.map((character, index) => (
                    <PuzzlePiece index={index} key={index} { ...character } />
                ))
            }
        </div>
    )
}

export default PuzzleRow; 
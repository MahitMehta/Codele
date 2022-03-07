import React from "react";
import { ESymbolStatus } from "../../enums/symbolStatus";

interface PuzzlePieceProps {
    symbol?: string; 
    status: ESymbolStatus;
    index: number; 
}

// in milliseconds
const ROTATE_TRANSITION = 750;
const TRANSITION_DELAY_FACTOR = 200;
const TRANSITION_DELAY_CONSTANT = 200;

const PuzzlePiece : React.FC<PuzzlePieceProps> = ({ symbol, status, index }) => {
    return (
        <div 
            style={{ 
                transform: status === ESymbolStatus.UNKNOWN ? "rotateX(0deg)" : "rotateX(180deg)", 
                transition: `transform ${ROTATE_TRANSITION}ms ease`, 
                transitionDelay: `${TRANSITION_DELAY_FACTOR * index}ms` 
            }}
            className="flex justify-center items-center bg-white dark:bg-slate-500 rounded-md border border-black/5 dark:border-white/5  flex-1 md:max-w-[3.5em] max-w-[3em] h-[3em] md:h-14 m-1">
            <h1    
                style={{ 
                    transform: status === ESymbolStatus.UNKNOWN ? "rotateX(0deg)" : "rotateX(180deg)",
                    transition: `transform 0s ease ${TRANSITION_DELAY_FACTOR * index + TRANSITION_DELAY_CONSTANT}ms`
                }}
                className="text-slate-900 text-1xl dark:text-white text-base font-semibold tracking-tight">{ symbol }</h1>
        </div>
    )
}

export default PuzzlePiece;
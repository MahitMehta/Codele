import React from "react";
import { pieceColorMap } from "../../../../utils/maps/colors";
import { ESymbolStatus } from "../../enums/symbolStatus";
import styles from "./styles.module.css";

interface PuzzlePieceProps {
    symbol?: string; 
    status: ESymbolStatus;
    index: number; 
}

// in milliseconds
const ROTATE_TRANSITION = 750;
const TRANSITION_DELAY_FACTOR = 200;
const TRANSITION_DELAY_CONSTANT = 200;


const PuzzlePieceContent: React.FC<PuzzlePieceProps> = ({ index, status, symbol }) => {
    return (
         <div 
            style={{ 
                transform: status === ESymbolStatus.UNKNOWN ? "rotateX(0deg)" : "rotateX(180deg)", 
                transition: `transform ${ROTATE_TRANSITION}ms ease, background ${ROTATE_TRANSITION}ms ease`, 
                transitionDelay: `${TRANSITION_DELAY_FACTOR * index}ms`,
                backgroundColor: pieceColorMap[status]
                // "--piece-background": pieceColorMap[status],
                // "--index": index,
            }}
            className={`${styles.puzzle_content} flex justify-center items-center flex-1 w-full h-full rounded-md`}>
            <h1    
                style={{ 
                    transform: status === ESymbolStatus.UNKNOWN ? "rotateX(0deg)" : "rotateX(180deg)",
                    transition: `transform 0s ease ${TRANSITION_DELAY_FACTOR * index + TRANSITION_DELAY_CONSTANT}ms`
                }}
                className="text-slate-900 text-1xl dark:text-white text-base font-semibold tracking-tight">{ symbol }</h1>
        </div> 
    )
}

export default PuzzlePieceContent;
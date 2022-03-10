import dynamic from "next/dynamic";
import React from "react";
import { ESymbolStatus } from "../../enums/symbolStatus";
const PuzzlePieceContent = dynamic(() => import("../PuzzlePieceContent"), { ssr: false });

interface PuzzlePieceProps {
    symbol?: string; 
    status: ESymbolStatus;
    index: number; 
}

const PuzzlePiece : React.FC<PuzzlePieceProps> = ({ ...props }) => {
    return (
        <div id="puzzle-piece" className="flex justify-center items-center bg-white dark:bg-slate-500 rounded-md border border-black/5 dark:border-slate-600 border-b-4 flex-1 md:max-w-[3.5em] max-w-[3em] h-[3em] md:h-14 m-1">
            <PuzzlePieceContent { ...props } />
        </div>
    )
}

export default PuzzlePiece;
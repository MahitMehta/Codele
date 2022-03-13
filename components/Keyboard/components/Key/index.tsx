import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";
import { EPuzzleStatus } from "../../../../redux/enums/puzzleStatus";
import { IRootReducer } from "../../../../redux/reducers";
import { getPuzzleStatus } from "../../../../redux/selectors/board";
import { EKeyType } from "../../enums/keyType";
import { IKey } from "../../interfaces/key";
const KeyContent = dynamic(() => import("../KeyContent"), { ssr: false });


interface KeyProps extends IKey {
    onClick: (k:IKey) => void; 
}

const Key : React.FC<KeyProps> = ({ symbol, type, onClick, icon}) => {
    const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        onClick({ symbol, type });
    };

    const state = useSelector((state:IRootReducer) => state);
    const puzzleStatus = getPuzzleStatus(state);

    return (
        <button
            disabled={puzzleStatus !== EPuzzleStatus.IN_PROGRESS}
            name={`${symbol} Key`}
            title={symbol}
            onClick={handleClick}
            style={{ 
                maxWidth: type === EKeyType.SYMBOL ? "2.5em" : "4.5em", 
            }}
            className={`flex relative transition-colors text-slate-900 text-1xl dark:text-white text-base font-semibold justify-center items-center bg-white dark:bg-slate-400 dark:hover:bg-slate-300 rounded-md overflow-clip border border-black/5 dark:border-slate-500 flex-1 h-[3em] md:h-14 m-1 border-b-4 `}
        >
            <span className="z-10">
                { !icon && symbol }
                { icon && icon }
            </span>
            <KeyContent type={type} symbol={symbol} icon={icon} />
        </button>
    )
}

export default Key; 
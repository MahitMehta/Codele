import React from "react";
import { EKeyType } from "../../enums/keyType";
import { IKey } from "../../interfaces/key";

interface KeyProps extends IKey {
    onClick: (k:IKey) => void; 
}

const Key : React.FC<KeyProps> = ({ symbol, type, onClick }) => {
    const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        onClick({ symbol, type });
    };

    return (
        <button
            onClick={handleClick}
            style={{ maxWidth: type === EKeyType.SYMBOL ? "2.5em" : "4.5em" }}
            className={`flex text-slate-900 text-1xl dark:text-white text-base font-semibold justify-center items-center bg-white dark:bg-slate-500 rounded-md border border-black/5 dark:border-white/5 flex-1 h-14 m-1`}
        >
            { symbol }
        </button>
    )
}

export default Key; 
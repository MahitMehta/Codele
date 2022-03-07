import React from "react";
import { IKey } from "../../interfaces/key";
import Key from "../Key";

interface IKeyRowProps {
    keys: IKey[],
    onClick: (k:IKey) => void; 
}

const KeyRow : React.FC<IKeyRowProps> = ({ keys, onClick }) => {
    return (
        <div className="flex w-screen justify-center lg:px-0 px-[5px]">
        {
            keys.map((key, index) => (
                <Key onClick={onClick} key={index} { ...key }/>
            ))
        }
        </div>
    )
}

export default KeyRow; 
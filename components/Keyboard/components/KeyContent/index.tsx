import React, { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { GameTypeContext } from "../../../../common/context/gameTypeContext";
import { IRootReducer } from "../../../../redux/reducers";
import { getPuzzleAttempts } from "../../../../redux/selectors/board";
import { pieceColorMap } from "../../../../utils/maps/colors";
import { ESymbolStatus } from "../../../GameBoard/enums/symbolStatus";
import { IKey } from "../../interfaces/key";
import styles from "./styles.module.css";

interface KeyContentProps extends IKey {}

const KeyContent : React.FC<KeyContentProps> = ({ icon, symbol }) => {
    const state = useSelector((state:IRootReducer) => state);
    const { type } = useContext(GameTypeContext);
    const attempts = getPuzzleAttempts(state, type);

    const status = useMemo(() => {
        let tempStatus = ESymbolStatus.UNKNOWN;
        for (let i = 0; i < attempts.length; i++) {
            for (let j = 0; j < attempts[i].length; j++) {
                if (attempts[i][j].symbol !== symbol) continue; 
                switch (attempts[i][j].status) {
                    case ESymbolStatus.CORRECT: {
                        return ESymbolStatus.CORRECT;
                    }
                    case ESymbolStatus.PARTIAL: {
                        tempStatus = ESymbolStatus.PARTIAL;
                    }
                    case ESymbolStatus.INCORRECT: {
                        if (tempStatus != ESymbolStatus.PARTIAL) {
                            tempStatus = ESymbolStatus.INCORRECT;
                        }
                    }
                }
            }
        }
        return tempStatus; 
    }, [ attempts, symbol ]);

    return (
        <div
            style={{ 
                background: status === ESymbolStatus.UNKNOWN ? undefined : pieceColorMap[status]
            }}
            className={`${styles.key_content} transition-colors absolute w-full h-full`}
        />
    )
}

export default KeyContent; 
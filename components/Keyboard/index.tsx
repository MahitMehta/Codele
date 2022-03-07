import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useDimensions from "../../hooks/useDimensions";
import { setPuzzleAttempts } from "../../redux/actions/board";
import { setCurrentAttempt } from "../../redux/actions/tempBoard";
import { IRootReducer } from "../../redux/reducers";
import { getPuzzleAttempts } from "../../redux/selectors/board";
import { getCurrentAttempt } from "../../redux/selectors/tempBoard";
import { ESymbolStatus } from "../GameBoard/enums/symbolStatus";
import KeyRow from "./components/KeyRow";
import { EKeyType } from "./enums/keyType";
import { IKey } from "./interfaces/key";

const MAX_SYMBOLS = 8; 

const Keyboard = () => {
    const dispatch = useDispatch();
    const state = useSelector((state:IRootReducer) => state);
    const currentAttempt = getCurrentAttempt(state); 
    const puzzleAttempts = getPuzzleAttempts(state);

    const handleKeyboardClick = (key:IKey) => {
        switch (key.type) {
            case EKeyType.SYMBOL: {
                if (currentAttempt.length >= MAX_SYMBOLS) return; 
                dispatch(setCurrentAttempt([ 
                    ...currentAttempt, 
                    { symbol: key.symbol, status: ESymbolStatus.UNKNOWN }
                ]));
                break; 
            }
            case EKeyType.ENTER: {
                if (currentAttempt.length >= MAX_SYMBOLS) {
                    dispatch(setPuzzleAttempts([...puzzleAttempts, currentAttempt.map((attempt) => ({ ...attempt, status: ESymbolStatus.CORRECT }))]));
                    dispatch(setCurrentAttempt([]));
                }
                break; 
            }
            case EKeyType.DELETE: {
                if (!!currentAttempt.length) {
                    dispatch(setCurrentAttempt(currentAttempt.slice(0, currentAttempt.length - 1)));
                }
                break; 
            }
            default: return; 
        }
    };

    const { height } = useDimensions();

    return (
        <div style={{ marginBottom: `calc(100vh - ${height}px)`}} className="z-10 mt-auto">
           <KeyRow onClick={handleKeyboardClick} keys={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map((symbol) => ({ 
               symbol, type: EKeyType.SYMBOL 
            }))}/>
           <KeyRow onClick={handleKeyboardClick} keys={["(", ")", "<", ">", "T", "F", "&&", "||", "==", "!="].map((symbol) => ({
               symbol, type: EKeyType.SYMBOL
           }))}/>
           <KeyRow onClick={handleKeyboardClick} keys={[{
                    symbol: "Enter",
                    type: EKeyType.ENTER,
                },
                ...[">=", "<=", "!"].map((symbol) => ({ symbol, type: EKeyType.SYMBOL })),
                {
                    symbol: "Back",
                    type: EKeyType.DELETE,
                }]}
            />
        </div>
    )
}

export default Keyboard;
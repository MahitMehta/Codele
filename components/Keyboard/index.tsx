import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPuzzleAttempts } from "../../redux/actions/board";
import { setCurrentAttempt } from "../../redux/actions/tempBoard";
import { IRootReducer } from "../../redux/reducers";
import { getPuzzleAttempts } from "../../redux/selectors/board";
import { getCurrentAttempt, getPuzzleSequence } from "../../redux/selectors/tempBoard";
import { ESymbolStatus } from "../GameBoard/enums/symbolStatus";
import KeyRow from "./components/KeyRow";
import { EKeyType } from "./enums/keyType";
import { IKey } from "./interfaces/key";
import { BackspaceIcon } from '@heroicons/react/outline'
import { IPuzzleCharacter } from "../GameBoard/interfaces/puzzleCharacter";

const Keyboard = () => {
    const dispatch = useDispatch();
    const state = useSelector((state:IRootReducer) => state);
    const currentAttempt = getCurrentAttempt(state); 
    const puzzleAttempts = getPuzzleAttempts(state);
    const sequence = getPuzzleSequence(state);

    const gradedCurrentAttempt = () => {
        const gradedAttempt:(IPuzzleCharacter | null)[] = [];

        for (let i = 0; i < sequence.length; i++) {
            const guessCharacter = currentAttempt[i].symbol.toLowerCase();
            const answerCharacter = sequence[i].toLowerCase();

            if (guessCharacter === answerCharacter) {
                gradedAttempt.push({ status: ESymbolStatus.CORRECT, symbol: currentAttempt[i].symbol });
            } 
            else {
                gradedAttempt.push(null);
            }
        }

        // Insert All Correct Letter, Incorrect Position Letters
        for (let i = 0; i < sequence.length; i++) {
            const guessCharacter = currentAttempt[i].symbol.toLowerCase();
            const answerCharacter = gradedAttempt[i]?.symbol.toLowerCase();

            // Prevents Attempting to Replace an Underscore or a Letter that doesn't exist
            if (!!answerCharacter || (answerCharacter && sequence.indexOf(answerCharacter) == -1)) continue; 
           
            let guessLetterCount = gradedAttempt.filter((attempt) => attempt?.symbol === guessCharacter).length;
            let answerLetterCount = sequence.filter((symbol) => symbol === guessCharacter).length;
           
            if (guessLetterCount < answerLetterCount) {
                gradedAttempt[i] = { status: ESymbolStatus.PARTIAL, symbol: currentAttempt[i].symbol };
            } else {
                gradedAttempt[i] = { status: ESymbolStatus.INCORRECT, symbol: currentAttempt[i].symbol };
            }
        }

        return gradedAttempt as IPuzzleCharacter[];
        // return currentAttempt.map((attempt) => ({ ...attempt, status: ESymbolStatus.CORRECT }));
    };

    const handleKeyboardClick = (key:IKey) => {
        switch (key.type) {
            case EKeyType.SYMBOL: {
                if (currentAttempt.length >= sequence.length) return; 
                dispatch(setCurrentAttempt([ 
                    ...currentAttempt, 
                    { symbol: key.symbol, status: ESymbolStatus.UNKNOWN }
                ]));
                break; 
            }
            case EKeyType.ENTER: {
                if (currentAttempt.length >= sequence.length) {
                    dispatch(setPuzzleAttempts([...puzzleAttempts, gradedCurrentAttempt()]));
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

    // TODO: Dynamic Margin Bottom to Adjust for Mobile Bottom Browser Navigation
    // const { height } = useDimensions({ enableDebounce: true });
    //  marginBottom: `calc(100vh - ${height}px)`

    return (
        <div style={{ marginBottom: 15 }} className="z-10 mt-auto">
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
                    symbol: "Delete",
                    type: EKeyType.DELETE,
                    icon: <BackspaceIcon style={{ width: "2em "}} />
                }]}
            />
        </div>
    )
}

export default Keyboard;
import React, { useEffect } from "react";
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
import { Key } from "ts-key-enum";

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
            let guessLetterCount = gradedAttempt.filter((attempt) => attempt?.symbol.toLowerCase() === guessCharacter).length;
            let answerLetterCount = sequence.filter((symbol) => symbol.toLowerCase() === guessCharacter).length;
           
            if (guessLetterCount < answerLetterCount) {
                gradedAttempt[i] = { status: ESymbolStatus.PARTIAL, symbol: currentAttempt[i].symbol };
            } else {
                gradedAttempt[i] = { status: ESymbolStatus.INCORRECT, symbol: currentAttempt[i].symbol };
            }
        }

        return gradedAttempt as IPuzzleCharacter[];
        // return currentAttempt.map((attempt) => ({ ...attempt, status: ESymbolStatus.CORRECT }));
    };

    const handleKeyPress = (key:string) => {
        if (currentAttempt.length >= sequence.length) return; 
        dispatch(setCurrentAttempt([ 
            ...currentAttempt, 
            { symbol: key, status: ESymbolStatus.UNKNOWN }
        ]));
    }

    const keyboardHandler = (e:KeyboardEvent) => {
        switch (e.key) {
            case "0": { handleKeyPress("0"); break; }
            case "1": { handleKeyPress("1"); break; }
            case "2": { handleKeyPress("2"); break; }
            case "3": { handleKeyPress("3"); break; }
            case "4": { handleKeyPress("4"); break; }
            case "5": { handleKeyPress("5"); break; }
            case "6": { handleKeyPress("6"); break; }
            case "7": { handleKeyPress("7"); break; }
            case "8": { handleKeyPress("8"); break; }
            case "9": { handleKeyPress("9"); break; }
            case "(": { handleKeyPress("("); break; }
            case ")": { handleKeyPress(")"); break; }
            case "<": { handleKeyPress("<"); break; }
            case ">": { handleKeyPress(">"); break; }
            case "t": { handleKeyPress("T"); break; }
            case "T": { handleKeyPress("T"); break; }
            case "f": { handleKeyPress("F"); break; }
            case "F": { handleKeyPress("F"); break; }
            case "&": { handleKeyPress("&&"); break; }
            case "|": { handleKeyPress("||"); break; }
            case "!": { handleKeyPress("!"); break; }
            case "=": { 
                if (currentAttempt.length > 0 && currentAttempt[currentAttempt.length - 1].symbol === "<") {
                    dispatch(setCurrentAttempt([ 
                        ...currentAttempt.slice(0, currentAttempt.length - 1), 
                        { symbol: "<=", status: ESymbolStatus.UNKNOWN }
                    ]));
                    return; 
                } else if (currentAttempt.length > 0 && currentAttempt[currentAttempt.length - 1].symbol === ">") {
                    dispatch(setCurrentAttempt([ 
                        ...currentAttempt.slice(0, currentAttempt.length - 1), 
                        { symbol: ">=", status: ESymbolStatus.UNKNOWN }
                    ]));
                    return; 
                } else if (currentAttempt.length > 0 && currentAttempt[currentAttempt.length - 1].symbol === "!") {
                    dispatch(setCurrentAttempt([ 
                        ...currentAttempt.slice(0, currentAttempt.length - 1), 
                        { symbol: "!=", status: ESymbolStatus.UNKNOWN }
                    ]));
                    return; 
                }
                handleKeyPress("=="); 
                break; 
            }
            case Key.Backspace: {
                if (!!currentAttempt.length) {
                    dispatch(setCurrentAttempt(currentAttempt.slice(0, currentAttempt.length - 1)));
                }
                break; 
             }
            case Key.Enter: {
                if (currentAttempt.length >= sequence.length) {
                    dispatch(setPuzzleAttempts([...puzzleAttempts, gradedCurrentAttempt()]));
                    dispatch(setCurrentAttempt([]));
                }
                break; 
            }
            default: break; 
        }
    };

    useEffect(() => {
        window.addEventListener("keyup", keyboardHandler);
        return () => window.removeEventListener("keyup", keyboardHandler);
    }, [ currentAttempt, sequence, dispatch ]);

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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPuzzleAttempts, setPuzzleStatus } from "../../redux/actions/board";
import { setCurrentAttempt } from "../../redux/actions/tempBoard";
import { IRootReducer } from "../../redux/reducers";
import { getPuzzleAttempts, getPuzzleStatus } from "../../redux/selectors/board";
import { getCurrentAttempt, getPuzzleSequence } from "../../redux/selectors/tempBoard";
import { ESymbolStatus } from "../GameBoard/enums/symbolStatus";
import KeyRow from "./components/KeyRow";
import { EKeyType } from "./enums/keyType";
import { IKey } from "./interfaces/key";
import { BackspaceIcon } from '@heroicons/react/outline'
import { IPuzzleCharacter } from "../GameBoard/interfaces/puzzleCharacter";
import { Key } from "ts-key-enum";
import { EPuzzleStatus } from "../../redux/enums/puzzleStatus";
import { setSnackbarItem } from "../../redux/actions/snackbar";
import { getGamesPlayed, getGamesWon, getCurrentStreak, getMaxStreak } from "../../redux/selectors/stats";
import { setCurrentStreak, setGamesPlayed, setGamesWon, setMaxStreak } from "../../redux/actions/stats";
import ReactGA from "react-ga";
import config from "../../config";

const Keyboard = () => {
    const dispatch = useDispatch();
    const state = useSelector((state:IRootReducer) => state);
    const currentAttempt = getCurrentAttempt(state); 
    const puzzleAttempts = getPuzzleAttempts(state);
    const sequence = getPuzzleSequence(state);
    // Statistics
    const gamesPlayed = getGamesPlayed(state) || 0;
    const gamesWon = getGamesWon(state) || 0;
    const currentStreak = getCurrentStreak(state) || 0;
    const maxStreak = getMaxStreak(state) || 0;

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
    };

    const handleKeyPress = (key:string) => {
        if (currentAttempt.length >= sequence.length) return; 
        dispatch(setCurrentAttempt([ 
            ...currentAttempt, 
            { symbol: key, status: ESymbolStatus.UNKNOWN }
        ]));
    }

    const handleEnter = () => {
        ReactGA.event({
            category: 'Game Status',
            action: 'Daily Game In Progress',
            value: puzzleAttempts.length + 1,
        });

        if (currentAttempt.length === 0) return; 

        else if (currentAttempt.length < sequence.length) {
            dispatch(setSnackbarItem({ title: "Not Enough Symbols"}));
            return; 
        }

        const newAttempt = gradedCurrentAttempt(); 
        const strAttempt = newAttempt.map(c => {
            switch(c.symbol) {
                case "T": return "true";
                case "F": return "false";
                default: return c.symbol;
            }
        }).join('');
        try {
            const valid = eval(`!!(${strAttempt})`);
            if (!valid) {
                dispatch(setSnackbarItem({ title: "Enter True Statement"}));
                return; 
            }
        } catch (e:any) {
            dispatch(setSnackbarItem({ title: "Invalid Statement"}));
            return; 
        }

        if (currentAttempt.length >= sequence.length) {
            const solved = newAttempt.every((s) => s.status === ESymbolStatus.CORRECT);

            dispatch(setPuzzleAttempts([...puzzleAttempts, newAttempt ]));
            dispatch(setCurrentAttempt([]));
            if (solved) {
                dispatch(setPuzzleStatus(EPuzzleStatus.WON));
                dispatch(setSnackbarItem({ title: "Genius!", permanent: true }))
                dispatch(setGamesPlayed(gamesPlayed + 1));
                dispatch(setGamesWon(gamesWon + 1));
                dispatch(setCurrentStreak(currentStreak + 1));

                if (currentStreak + 1 > maxStreak) {
                    dispatch(setMaxStreak(maxStreak + 1));
                }

                ReactGA.event({
                    category: 'Game Status',
                    action: 'Won Daily Game',
                });
            }
            else if (!solved && puzzleAttempts.length === config.max_attempts - 1) {
                const answerFormatted = sequence.map((symbol) => {
                    if (["!=", "==", "<=", ">=", "&&", "||"].includes(symbol)) {
                        return ` ${symbol} `;
                    }
                    return symbol;
                });;

                dispatch(setPuzzleStatus(EPuzzleStatus.FAIL));
                dispatch(setSnackbarItem({ title: answerFormatted.join(""), permanent: true }));
                dispatch(setGamesPlayed(gamesPlayed + 1));
                dispatch(setCurrentStreak(0));

                ReactGA.event({
                    category: 'Game Status',
                    action: 'Lost Daily Game',
                });
            } 
        }
    }

    const handleBack = () => {
        if (!!currentAttempt.length) {
            dispatch(setCurrentAttempt(currentAttempt.slice(0, currentAttempt.length - 1)));
        }
    }

    const handleEqual = () => {
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
    }

    const puzzleStatus = getPuzzleStatus(state);
    const keyboardDisabled = [ EPuzzleStatus.WON, EPuzzleStatus.FAIL ].includes(puzzleStatus as EPuzzleStatus)

    
    const keyboardHandler = (e:KeyboardEvent) => {
        if (keyboardDisabled) return; 

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
            case "=": { handleEqual(); break; }
            case Key.Backspace: { handleBack(); break; }
            case Key.Enter: { handleEnter(); break; }
            default: { break; }
        }
    };

    useEffect(() => {
        window.addEventListener("keyup", keyboardHandler);
        return () => window.removeEventListener("keyup", keyboardHandler);
    }, [ currentAttempt, sequence, dispatch ]);

    const handleKeyboardClick = (key:IKey) => {
        switch (key.type) {
            case EKeyType.SYMBOL: { handleKeyPress(key.symbol); break; }
            case EKeyType.ENTER: { handleEnter(); break; }
            case EKeyType.DELETE: { handleBack(); break; }
            default: { return; }
        }
    };

    return (
        <div style={{ marginBottom: 15 }} className="z-10 mt-auto">
           <KeyRow onClick={handleKeyboardClick} keys={["0", "1", "2", "3", "4", "5", "6", "7", "8"].map((symbol) => ({ 
               symbol, type: EKeyType.SYMBOL 
            }))}/>
           <KeyRow onClick={handleKeyboardClick} keys={["9", "<", ">", "T", "F", "&&", "||", "==", "!="].map((symbol) => ({
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
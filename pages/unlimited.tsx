import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import Snackbar from '../components/Snackbar';
import ParticlesBG from '../components/Particles';
import Navbar from "../components/Navbar";
import GameBoard from "../components/GameBoard";
import Keyboard from "../components/Keyboard";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentAttempt, setPuzzleSequence } from "../redux/actions/tempBoard";
import { EGameType } from "../redux/enums/gameType";
import { GameTypeContext } from "../common/context/gameTypeContext";
import { decodeSequence } from "../utils/puzzle/decode";
import { setPuzzleAttempts, setPuzzleIdentifersUnlimited, setPuzzleStatus } from "../redux/actions/board";
import { IRootReducer } from "../redux/reducers";
import { getPuzzlePatternUnlimited } from "../redux/selectors/board";
import { getPuzzleSequence } from "../redux/selectors/tempBoard";
import { RefreshIcon } from "@heroicons/react/outline";
import styles from "../styles/unlimited.module.css";
import clsx from "clsx";
import { EPuzzleStatus } from "../redux/enums/puzzleStatus";
import { setSnackbarItem } from "../redux/actions/snackbar";

const Unlimited = () => {
    const dispatch = useDispatch();

    const state = useSelector((state:IRootReducer) => state);
    const puzzlePatternUnlimited = getPuzzlePatternUnlimited(state);
    const puzzleSquence = getPuzzleSequence(state);

    const [ generating, setGenerating ] = useState(false);

    const getPuzzle = useCallback(async () : Promise<boolean> => {
        // setGenerating(true);
        // const puzzle = await fetch("/api/puzzle/generate").then(res => res.json()).catch(() => null)
        // if (!puzzle || !puzzle.sequence || !puzzle.sequence.length) return false; 
        // const decodedPuzzle = decodeSequence(puzzle.sequence); 
        // dispatch(setPuzzleSequence(decodedPuzzle));
        // dispatch(setPuzzleIdentifersUnlimited({ puzzlePattern: puzzle.sequence }));
        // setGenerating(false);
        // return true; 
        return false; 
    }, [ dispatch ]);

    const handleNewCodle = useCallback(async () => {
        setGenerating(true);

        const status = await getPuzzle();
        if (status) {
            dispatch(setSnackbarItem({ title: "Codle Generated" }));
            dispatch(setPuzzleAttempts([], EGameType.UNLIMITED));
            dispatch(setPuzzleStatus(EPuzzleStatus.IN_PROGRESS, EGameType.UNLIMITED));
            dispatch(setCurrentAttempt([]))
        } else {
            dispatch(setSnackbarItem({ title: "Failed Generation. Try Again." }));
        }
        setGenerating(false);
    }, [ getPuzzle, dispatch ]);

    useEffect(() => {
        if (puzzlePatternUnlimited && puzzlePatternUnlimited.length && puzzleSquence.length === 0) {
            dispatch(setPuzzleSequence(decodeSequence(puzzlePatternUnlimited)));
        };
    }, [ puzzlePatternUnlimited, puzzleSquence ]);
    
    useEffect(() => {
        if (puzzlePatternUnlimited && puzzlePatternUnlimited?.length) return; 
        getPuzzle();
    }, [ getPuzzle, puzzlePatternUnlimited ]); 

    return (
        <GameTypeContext.Provider value={{ type: EGameType.UNLIMITED }}>
            <div className='h-full bg-[#111111]'>
                <Head key="unlimited">
                    <title>Unlimited | Codle</title>
                    <link rel="canonical" href="https://codle.mahitm.com/unlimited"/>
                </Head>
                <ParticlesBG />
                <Snackbar />
                <Navbar type={EGameType.UNLIMITED} />
                <main style={{ height: "calc(100% - var(--navbar-height))"}} className='flex justify-center min-h-[575px] md:min-h-[675px] flex-col items-center'>
                    <div 
                        onClick={handleNewCodle}
                        className={clsx(
                            "pt-5 z-10 flex space-x-2 hover:opacity-75 transition-opacity",
                            generating ? "cursor-not-allowed" : 'cursor-pointer' 
                        )}
                        role="button"> 
                            <RefreshIcon  
                                className={clsx(
                                    generating && styles.refreshing
                                )}
                                width={25} 
                                color="white"  
                            />
                            <p className="text-white font-medium">
                                { generating ? "Generating Codle..." : "New Codle."}
                            </p>
                    </div>
                    <GameBoard type={EGameType.UNLIMITED} />
                    <Keyboard type={EGameType.UNLIMITED} />
                    <div style={{ 
                    background: "linear-gradient(180deg, #111111 0%, #2A2A52 36.46%, #774B6B 100%)" 
                    }} className='h-96 fixed w-screen bottom-0' />
                </main>
            </div>
        </GameTypeContext.Provider>
    )
}

export default Unlimited; 
import React, { useEffect, useMemo, useState } from "react";
import { QuestionMarkCircleIcon, ChartBarIcon } from "@heroicons/react/outline";
import InfoModal from "../InfoModal";
import StatsModal from "../StatsModal";
import { useSelector } from "react-redux";
import { EPuzzleStatus } from "../../redux/enums/puzzleStatus";
import { IRootReducer } from "../../redux/reducers";
import { getPuzzleStatus } from "../../redux/selectors/board";
import { getGamesPlayed } from "../../redux/selectors/stats";
import { EGameType } from "../../redux/enums/gameType";

const Navbar = ({ type = EGameType.DAILY }: { type?: EGameType }) => {
    const [ infoModalOpen, setInfoModalOpen ] = useState(false);
    const [ statsModalOpen, setStatsModalOpen ] = useState(false);
    
    const state = useSelector((state:IRootReducer) => state);
    const puzzleStatus = getPuzzleStatus(state, type);    
    const dailyGameOver = useMemo(() => {
        return [ EPuzzleStatus.FAIL, EPuzzleStatus.WON ].includes(puzzleStatus as EPuzzleStatus);
    }, [ puzzleStatus ]);
    const gamesPlayed = getGamesPlayed(state);

    useEffect(() => {
        if (dailyGameOver) {
            setTimeout(() => {
                if (dailyGameOver) {
                    setStatsModalOpen(true);
                    setInfoModalOpen(false);
                }
            }, 1000);
        } else {
            setTimeout(() => {
                if (!dailyGameOver && !gamesPlayed) {
                    setInfoModalOpen(true);
                    setStatsModalOpen(false);
                }
            }, 500);
        }
    }, [ dailyGameOver ]);

    const handleInfoModal = (e:boolean) => {
        setInfoModalOpen(e);
        if (!e) setStatsModalOpen(false);
    };

    return (
        <>
            { type === EGameType.DAILY && <StatsModal open={statsModalOpen} setOpen={setStatsModalOpen} /> }
            <InfoModal open={infoModalOpen} setOpen={handleInfoModal} /> 
            <nav className="flex relative z-10 justify-between py-3 border-b border-slate-900/10 lg:px-8 dark:border-slate-300/10 mx-4 !h-[65px]">
                <div className="flex z-1">
                    <button 
                        title="How to Play" 
                        name="How to Play" 
                        onClick={() => { setInfoModalOpen(!infoModalOpen) }} 
                        type="button" 
                        className="text-gray-400 bg-transparent hover:bg-slate-400  dark:hover:border-slate-500 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-slate-400 dark:border-transparent  border-b-4 dark:hover:text-white">
                        <QuestionMarkCircleIcon color="#fff" style={{ width: 25 }} role="button" />
                    </button>   
                </div>
                <h1 style={{ fontSize: 30 }} className="absolute text-center left-[50%] whitespace-nowrap top-[50%] text-slate-900 text-2xl dark:text-white font-extrabold tracking-tight -translate-x-2/4  -translate-y-2/4">
                    { type === EGameType.DAILY ? "Codle" : "Codle Unlimited" }
                </h1>
                <div className="flex z-1">
                    {
                        type === EGameType.DAILY && (
                            <button 
                                title="Statistics" 
                                name="Game Statistics" 
                                onClick={() => { setStatsModalOpen(!statsModalOpen) }} 
                                type="button" 
                                className="text-gray-400 bg-transparent hover:bg-slate-400  dark:hover:border-slate-500 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-slate-400 dark:border-transparent  border-b-4 dark:hover:text-white">
                                <ChartBarIcon color="#fff" style={{ width: 25 }} role="button" />
                            </button> 
                        )
                    }  
                </div>
            </nav>
        </>
    )
}

export default Navbar;
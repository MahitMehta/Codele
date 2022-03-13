import React from "react";
import { XIcon } from "@heroicons/react/outline";
import { ESymbolStatus } from "../GameBoard/enums/symbolStatus";
import PuzzleRow from "../GameBoard/components/PuzzleRow";
import styles from "./styles.module.css";

interface InfoModalProps {
    open: boolean,
    setOpen: (e:boolean) => void; 
}

const InfoModal : React.FC<InfoModalProps> = ({ open, setOpen }) => {
    return (
        <div 
            style={{ backgroundColor: "rgba(0, 0, 0, 0.25)"}} 
            className={`flex ${ open ? styles.modal_open : "pointer-events-none" } overflow-hidden opacity-0 transition-all  overflow-y-auto fixed h-screen right-0 left-0 z-50 justify-center items-center md:inset-0 h-modal" id="info-modal`}>
            <div className="flex justify-center relative px-4 md:px-0 py-[15px] h-screen w-full max-w-md">
                <div className={`${ open ? "translate-y-0" : "translate-y-[100px]"} transition-transform flex items-center  overflow-auto relative rounded-lg`}>
                    <div className="h-min my-auto bg-white  rounded-lg shadow dark:bg-gray-700">
                        <div className="flex justify-between items-center p-3 px-5 rounded-lg border-b dark:border-gray-600">
                            <h3 className="text-xl font-medium capitalize text-gray-900 dark:text-white">
                                how to play
                            </h3>
                            <button 
                                onClick={() => { setOpen(false) }} 
                                type="button" 
                                className="text-gray-400 bg-transparent hover:bg-gray-200 border-b-4 dark:border-transparent dark:hover:border-slate-600 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-slate-500 dark:hover:text-white" data-modal-toggle="small-modal">
                                <XIcon style={{ width: 22.5 }} />  
                            </button>
                        </div>
                        <div className="p-5 space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Guess the <b className="uppercase">codle</b> in six tries.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Each guess must be a valid eight-character <b className="uppercase">true</b> boolean statement. Hit the enter button to submit.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                After each guess, the color of the tiles will change to show how close your guess was to the statement.
                            </p>
                        </div>
                        <div className="p-5 space-y-3 border-t dark:border-gray-600">
                            <p className="text-base font-bold leading-relaxed text-gray-500 dark:text-gray-400">
                                Examples
                            </p>
                            <PuzzleRow 
                                containerClassName="!justify-start"
                                attempt={[
                               {
                                    status: ESymbolStatus.CORRECT,
                                    symbol: "3",
                                },
                                {
                                    status: ESymbolStatus.UNKNOWN,
                                    symbol: ">",
                                },
                                {
                                    status: ESymbolStatus.UNKNOWN,
                                    symbol: "2",
                                },
                                {
                                    status: ESymbolStatus.UNKNOWN,
                                    symbol: "&&",
                                },
                                {
                                    status: ESymbolStatus.UNKNOWN,
                                    symbol: "T",
                                }
                            ]} />
                            <p className="ml-2 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                               3 is in the solution and in the correct place.
                            </p>
                            <PuzzleRow 
                                containerClassName="!justify-start"
                                attempt={[
                                {
                                    status: ESymbolStatus.UNKNOWN,
                                    symbol: "F",
                                },
                                {
                                    status: ESymbolStatus.UNKNOWN,
                                    symbol: "||",
                                },
                                {
                                    status: ESymbolStatus.PARTIAL,
                                    symbol: "5",
                                },
                                {
                                    status: ESymbolStatus.UNKNOWN,
                                    symbol: "<",
                                },
                                {
                                    status: ESymbolStatus.UNKNOWN,
                                    symbol: "9",
                                }
                            ]} />
                            <p className="ml-2 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                5 is in the solution, but not in the correct place.
                            </p>
                            <PuzzleRow 
                                containerClassName="!justify-start"
                                attempt={[
                                {
                                    status: ESymbolStatus.UNKNOWN,
                                    symbol: "6",
                                },
                                {
                                    status: ESymbolStatus.UNKNOWN,
                                    symbol: "0",
                                },
                                {
                                    status: ESymbolStatus.UNKNOWN,
                                    symbol: ">",
                                },
                                {
                                    status: ESymbolStatus.UNKNOWN,
                                    symbol: "3",
                                },
                                {
                                    status: ESymbolStatus.INCORRECT,
                                    symbol: "0",
                                }
                            ]} />
                            <p className="ml-2 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                0 is not in any spot in the solution.
                            </p>
                        </div>
                        <div className="p-6 space-y-6 border-t dark:border-gray-600">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                <b className="font-semibold">A new <span className="uppercase">Codle</span> will be available each day! </b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default InfoModal;
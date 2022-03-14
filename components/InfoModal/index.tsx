import React from "react";
import { ESymbolStatus } from "../GameBoard/enums/symbolStatus";
import PuzzleRow from "../GameBoard/components/PuzzleRow";
import Modal, { ModalProps } from "../Modal";

interface InfoModalProps extends ModalProps {}

const InfoModal : React.FC<InfoModalProps> = ({ ...props }) => {
    return (
        <Modal title="how to play" { ...props }>
            <div>
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
                    <h2 className="text-base font-bold leading-relaxed text-gray-500 dark:text-gray-400">
                        Examples
                    </h2>
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
                        <b className="font-medium">A new <span className="uppercase font-bold">Codle</span> will be available each day! </b>
                    </p>
                </div>
            </div>
        </Modal>
    )
}

export default InfoModal;
import React, { ReactChild } from "react";
import { XIcon } from "@heroicons/react/outline";
import styles from "./styles.module.css";

export interface ModalProps {
    open: boolean,
    setOpen: (e:boolean) => void; 
    children?: ReactChild,
    title?: string; 
}

const Modal : React.FC<ModalProps> = ({ title, open, setOpen, children }) => {
    return (
        <div 
            aria-hidden={!open}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.25)"}} 
            className={`flex scrollbar-hide ${ open ? styles.modal_open : "pointer-events-none" } overflow-hidden opacity-0 transition-all overflow-y-auto fixed h-screen right-0 left-0 z-50 justify-center items-center md:inset-0 h-modal"`}>
            <div className="flex justify-center relative px-4 md:px-0 py-[15px] h-screen w-full max-w-md">
                <div className={`${ open ? "translate-y-0" : "translate-y-[50px]"} transition-transform flex items-center  overflow-auto relative rounded-lg`}>
                    <div className="h-min my-auto bg-white  rounded-lg shadow dark:bg-gray-700">
                        <div className="flex justify-between items-center p-3 px-5  border-b dark:border-gray-600">
                            <h1 className="text-xl font-medium capitalize text-gray-900 dark:text-white">
                                { title }
                            </h1>
                            <button 
                                aria-label="hide modal"
                                name="hide modal"
                                onClick={() => { setOpen(false) }} 
                                type="button" 
                                className="text-gray-400 bg-transparent hover:bg-gray-200 border-b-4 dark:border-transparent dark:hover:border-slate-600 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-slate-500 dark:hover:text-white" data-modal-toggle="small-modal">
                                <XIcon style={{ width: 22.5 }} />  
                            </button>
                        </div>
                        {
                            children && children
                        }
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Modal; 
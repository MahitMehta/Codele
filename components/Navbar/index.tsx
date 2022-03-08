import React, { useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import InfoModal from "../InfoModal";

const Navbar = () => {
    const [ infoModalOpen, setInfoModalOpen ] = useState(false);

    return (
        <>
            <InfoModal open={infoModalOpen} setOpen={setInfoModalOpen} /> 
            <nav className="flex relative justify-between py-3 border-b border-slate-900/10 lg:px-8 dark:border-slate-300/10 mx-4">
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
                <h1 style={{ fontSize: 30 }} className="absolute left-[50%] top-[50%] text-slate-900 text-2xl dark:text-white font-extrabold tracking-tight -translate-x-2/4  -translate-y-2/4">Codle</h1>
                <div>

                </div>
            </nav>
        </>
    )
}

export default Navbar;
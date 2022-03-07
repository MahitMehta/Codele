import React from "react";

const Navbar = () => {
    return (
        <nav className="flex justify-center py-4 border-b border-slate-900/10 lg:px-8 dark:border-slate-300/10 mx-4">
            <h1 style={{ fontSize: 30 }} className="text-slate-900 text-2xl dark:text-white text-base font-extrabold tracking-tight">Codle</h1>
        </nav>
    )
}

export default Navbar;
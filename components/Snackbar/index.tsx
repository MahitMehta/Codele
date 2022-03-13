import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootReducer } from "../../redux/reducers";
import { getSnackItem } from "../../redux/selectors/snackbar";
import SnackItem, { ISnackItem } from "./SnackItem";

interface IStateSnackItem extends ISnackItem {
    disappear: boolean; 
}

const Snackbar = () => {
    const [ items, setItems ] = useState<IStateSnackItem[]>([]);

    const state = useSelector((state:IRootReducer) => state);
    const snackItem = getSnackItem(state);
    const handleNewSnackItem = useCallback(() => {
        if (!snackItem) return; 
         
        setItems([ { ...snackItem, disappear: false }, ...items, ])

        setTimeout(() => {
            setDisappear();
        }, 1000);
    }, [ snackItem ]);

    useEffect(handleNewSnackItem, [ handleNewSnackItem ]);

    const handleUnmountItem = () => {
        // setItems([ ...items.slice(0, items.length - 1) ])
    };

    const setDisappear = () => {
        const adjustedItem = { ...items[items.length - 1], disappear: true };
        console.log(items, adjustedItem);
       // setItems([ ...items.slice(0, items.length), adjustedItem])
    };

    return (
        <div className="w-full h-full z-[9999] fixed pointer-events-none flex-col items-center">
            <div className="mt-24">
                {
                    items.map((item, index) => {
                        return <SnackItem setDisappear={setDisappear} onDisappear={handleUnmountItem} key={index} { ...item }/>
                    })
                }
            </div>
        </div>
    )
}

export default Snackbar;
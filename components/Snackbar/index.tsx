import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IRootReducer } from "../../redux/reducers";
import { getSnackItem } from "../../redux/selectors/snackbar";
import SnackItem, { ISnackItem } from "./SnackItem";

interface IStateSnackItem extends ISnackItem {
    disappear: boolean; 
}

const Snackbar = () => {
    const [ items, setItems ] = useState<IStateSnackItem[]>([]);

    const itemsRef = useRef<IStateSnackItem[]>([]);

    itemsRef.current = items; 

    const state = useSelector((state:IRootReducer) => state);
    const snackItem = getSnackItem(state);
    const handleNewSnackItem = useCallback(() => {
        if (!snackItem || items.length >= 3) return; 
         
        setItems([ { ...snackItem, disappear: false }, ...items, ])
    }, [ snackItem ]);

    useEffect(handleNewSnackItem, [ handleNewSnackItem ]);

    useEffect(() => {
        const interval = setInterval(() => {
            const oldItems = items.filter((item) => !item.permanent);
            if (oldItems.length) {
                setItems([
                    ... oldItems.slice(0, items.length - 1),
                    { ...oldItems[oldItems.length - 1], disappear: true }
                ])
            }
        }, 750);
        return () => {
            clearInterval(interval);
        }
    }, [ items ]);

    const handleUnmountItem = () => {
        const updatedItems = [ ...itemsRef.current.slice(0, itemsRef.current.length - 1) ];
        setItems(updatedItems);
    };

    return (
        <div className="w-full h-full z-[999] fixed pointer-events-none flex-col items-center">
            <div className="mt-24">
                {
                    itemsRef.current.map((item, index) => {
                        return <SnackItem onDisappear={handleUnmountItem} key={index} { ...item }/>
                    })
                }
            </div>
        </div>
    )
}

export default Snackbar;
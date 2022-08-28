import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbarItem } from "../../redux/actions/snackbar";
import { IRootReducer } from "../../redux/reducers";
import { getSnackItem } from "../../redux/selectors/snackbar";
import SnackItem, { ISnackItem } from "./SnackItem";

interface IStateSnackItem extends ISnackItem {
    disappear: boolean; 
    id: string; 
}

const Snackbar = () => {
    const [ items, setItems ] = useState<IStateSnackItem[]>([]);

    const itemsRef = useRef<IStateSnackItem[]>(items);

    itemsRef.current = items; 

    const dispatch = useDispatch();

    const state = useSelector((state:IRootReducer) => state);
    const snackItem = getSnackItem(state);
    const handleNewSnackItem = useCallback(() => {
        if (!snackItem || items.length >= 3) return; 
            
        let existingItems = items;

        if (!snackItem.permanent) {
            existingItems = existingItems.map(i => ({ ...i, permanent: false }));
        };

        setItems([ { ...snackItem, disappear: false, id: Math.random().toString() }, ...existingItems, ])
    }, [ snackItem ]);

    useEffect(handleNewSnackItem, [ handleNewSnackItem ]);

    useEffect(() => {
        const interval = setInterval(() => {
            const permanentItems = items.filter((item) => item.permanent);
            if (!permanentItems.length && items.length) {
                setItems([
                    ... items.slice(0, items.length - 1),
                    { ...items[items.length - 1], disappear: true }
                ])
            }
        }, 750);
        return () => {
            clearInterval(interval);
        }
    }, [ items ]);

    const handleUnmountItem = useCallback(() => {
        const updatedItems = [ ...itemsRef.current.slice(0, itemsRef.current.length - 1) ];
        setItems(updatedItems);
        dispatch(setSnackbarItem(undefined));
    }, [ items ])


    return (
        <div className="w-full h-full z-[999] fixed pointer-events-none flex-col items-center">
            <div className="mt-24">
                {
                    items.map((item) => {
                        return <SnackItem onDisappear={handleUnmountItem} key={item.id} { ...item }/>
                    })
                }
            </div>
        </div>
    )
}

export default Snackbar;
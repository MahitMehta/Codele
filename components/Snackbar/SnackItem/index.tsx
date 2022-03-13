import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export interface ISnackItem {
    title: string; 
}

interface SnackItemProps extends ISnackItem {
    onDisappear: () => void; 
    disappear: boolean;
    setDisappear: () => void;
}

const SnackItem : React.FC<SnackItemProps> = ({ title, onDisappear, disappear = false, setDisappear }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
        
    useEffect(() => {
        if (!containerRef.current || !disappear) return; 

        gsap.timeline({
            repeat: 0
        }).fromTo(containerRef.current, {
            opacity: 1,
        }, {
            opacity: 0, duration: 0.5, delay: 1,
        }).eventCallback("onComplete", () => {
            onDisappear();
        });
    }, [ containerRef, disappear ]);

    return (
        <div ref={containerRef} className="w-min mx-auto bg-white px-3 py-4 rounded-md my-3">
            <h1 className="whitespace-nowrap font-semibold">{ title }</h1>
        </div>
    )
}

export default SnackItem;
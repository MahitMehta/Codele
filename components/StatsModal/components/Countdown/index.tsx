import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

interface ICountdown {
    hours: number; 
    minutes: number; 
    seconds: number; 
}

const DEFAULT_TIMEZONE = "America/New_York"; // ET

const SECONDS_MS = 1000; 
const MINUTES_MS = SECONDS_MS * 60; 
const HOUR_MS = 60 *  MINUTES_MS; 


const Countdown = () => {
    const [ countdown, setCountdown ] = useState<ICountdown>({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const diff = moment()
                .tz(DEFAULT_TIMEZONE)
                .endOf("day")
                .diff(moment()
                .tz(DEFAULT_TIMEZONE));
            
            const hours = Math.floor(diff / (HOUR_MS));
            const minutes = Math.floor((diff - (hours * HOUR_MS)) / MINUTES_MS); 
            const seconds = Math.floor((diff - (hours * HOUR_MS) - (minutes * MINUTES_MS)) / SECONDS_MS);
    
            setCountdown({ hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <p className="text-white text-center text-[2rem]">
            <span>{ countdown.hours.toLocaleString(undefined, { minimumIntegerDigits: 2 })}</span>:
            <span>{ countdown.minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })}</span>:
            <span>{ countdown.seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}</span>
        </p> 
    )
}

export default Countdown;
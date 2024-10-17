"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function countdown() {
    const [duration, setDuration] = useState<number | string>("");
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleSetDuration = (): void => {
        if (typeof duration === "number" && duration > 0)  {
            setTimeLeft(duration);
            setIsActive(false);
            setIsPaused(false);

            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    }

    const handleStart = () : void => {
        if (timeLeft > 0) {
            setIsActive(true);
            setIsPaused(false);
        }
    }

    const handlePause = () : void => {
        if (isActive) {
            setIsPaused(true);
            setIsActive(false);

            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    }

    const handleReset = () : void => {
        setIsActive(false);
        setIsPaused(false);
        setTimeLeft(typeof duration === "number" ? duration : 0);

        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    }

    useEffect(() => {
        if (isActive && !isPaused) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if(prevTime <= 1) {
                        clearInterval(timerRef.current!);
                        return 0;
                    }
                    return prevTime - 1
                })
            }, 1000)
        }
        return () => {
            if(timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    }, [isActive , isPaused]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
    };

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setDuration(Number(e.target.value) || "");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-l md:bg-gradient-to-r">
       {/* Timer box container */}

       <div className="bg-sky-300 dark:bg-sky-500 shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Title of the countdown timer */}
     
       <h1 className="text-3xl font-bold mb-4 text--700 dark:text-blue-500 text-center">Countdown Timer</h1>
       {/* Input and set button cimtainer */}

       <div className="flex items-center mb-6 text-white text-2xl"> 
        <Input type="number" id="duration" placeholder="Enter duration in second"
        value={duration} onChange={handleDurationChange} 
        className="flex-1 mr-4 rounded-md border-gray-900 dark:border-gray-600 bg-sky-700"/>

        <Button onClick={handleSetDuration}
        variant="outline" 
        className="border-gray-900 dark:border-gray-600 bg-sky-700">
            Set
        </Button>
</div>
{/* Display the formatbtime left */}

        <div className="text-6xl font-bold text-slate-950 mb-8 text-center">
            {formatTime(timeLeft)}
        </div>

        {/* Button to start,pause and reset the timer */}

        <div className="flex justify-center gap-4">
            <Button onClick={handleStart}
            variant="outline" 
            className="text-white border-gray-900 dark:border-gray-600 bg-sky-700">
                {isPaused ? "Resume" : "Start"}
            </Button>
 
            <Button onClick={handlePause}
            variant="outline" 
            className="text-white border-gray-900 dark:border-gray-600 bg-sky-700">
                Pause
            </Button>

            <Button onClick={handleReset}
            variant="outline" 
            className="text-white border-gray-900 dark:border-gray-600 bg-sky-700">
                Reset
            </Button>
        </div>
        <br />
        <div className="flex items-center text-blue-950 text-sm text-center justify-center font-mono">
            <p>Made by <b>Maryam Ansari</b></p>
        </div>
       </div>
        </div>
    );
}
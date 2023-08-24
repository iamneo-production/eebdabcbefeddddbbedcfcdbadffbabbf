import React, { useState, useRef } from "react";


const Stopwatch = () => {
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const increment = useRef(null)

    const handleStart = () => {
        setIsActive(true)
        setIsPaused(true)
        increment.current = setInterval(() => {
          setTimer((timer) => timer + 1)
        }, 1000)
      }
    
      const handlePause = () => {
        clearInterval(increment.current)
        setIsPaused(false)
      }
    
      const handleResume = () => {
        setIsPaused(true)
        increment.current = setInterval(() => {
          setTimer((timer) => timer + 1)
        }, 1000)
      }
    
      const handleReset = () => {
        clearInterval(increment.current)
        setIsActive(false)
        setIsPaused(false)
        setTimer(0)
      }
  
    const renderButton = () => {
    if (!isActive && !isPaused) {
        return (
            <button onClick={handleStart} className="button" data-testid="start">
                Start
            </button>
        );
    } else {
        if (isPaused) {
            return (
                <button onClick={handlePause} className="button" data-testid="pause">
                    Pause
                </button>
            );
        } else {
            return (
                <button onClick={handleResume} className="button" data-testid="resume">
                    Resume
                </button>
            );
        }
    }
};
  
     
    const formatTime = () => {
      const getSeconds = `0${(timer % 60)}`.slice(-2)
      const minutes = `${Math.floor(timer / 60)}`
      const getMinutes = `0${minutes % 60}`.slice(-2)
      const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
  
      return `${getHours} : ${getMinutes} : ${getSeconds}`
    }
  
    return (
        <div className="outer-main">
        <p className="inner-main">
            <p className="head">React Stopwatch</p>
            <p data-testid="time" className="time">
                {formatTime()}
            </p>
            <div data-testid="button">
                {renderButton()}
                <button onClick={handleReset} disabled={!isActive} className="button" data-testid="reset">
                    Reset
                </button>
            </div>
        </p>
    </div>
);
};
  
  export default Stopwatch;
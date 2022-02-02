import "./Timer.css";
import React, { useState, useEffect, useRef } from "react";
import {
    MdOutlinePlayArrow,
    MdOutlinePause,
    MdOutlineRefresh,
    MdOutlineArrowDownward,
    MdOutlineArrowUpward,
} from "react-icons/md";

const Timer = () => {
    const [displayTime, setDisplayTime] = useState(25 * 60);
    const [breakTime, setBreakTime] = useState(5 * 60);
    const [sessionTime, setSessionTime] = useState(25 * 60);
    const [onBreak, setOnBreak] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const audio = useRef(null);

    useEffect(() => {
        setDisplayTime(sessionTime);
    }, [sessionTime]);

    useEffect(() => {
        if (displayTime === 0) {
            audio.current.currentTime = 0;
            audio.current.play();
            if (!onBreak) {
                setOnBreak(true);
                setDisplayTime(breakTime);
            } else {
                setOnBreak(false);
                setDisplayTime(sessionTime);
            }
        }
    }, [displayTime, breakTime, onBreak, sessionTime]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return (
            (minutes < 10 ? "0" + minutes : minutes) +
            ":" +
            (seconds < 10 ? "0" + seconds : seconds)
        );
    };

    const Minutes = (time) => {
        return time / 60;
    };

    const controlTime = () => {
        if (intervalId === null) {
            const interval = setInterval(() => {
                setDisplayTime(
                    (previousdisplayTime) => previousdisplayTime - 1
                );
            }, 1000);
            setIntervalId(interval);
        } else {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    const decBreak = () => {
        setBreakTime(breakTime <= 60 ? breakTime : breakTime - 60);
    };

    const incBreak = () => {
        setBreakTime(breakTime >= 60 * 60 ? breakTime : breakTime + 60);
    };

    const decSession = () => {
        setSessionTime(sessionTime <= 60 ? sessionTime : sessionTime - 60);
    };

    const incSession = () => {
        setSessionTime(sessionTime >= 60 * 60 ? sessionTime : sessionTime + 60);
    };

    const resetTime = () => {
        audio.current.pause();
        audio.current.currentTime = 0;
        clearInterval(intervalId);
        setIntervalId(null);
        setDisplayTime(25 * 60);
        setBreakTime(5 * 60);
        setSessionTime(25 * 60);
        setOnBreak(false);
    };

    return (
        <div className="Timer">
            <div className="container">
                <h1>Pomodoro Timer</h1>
                <div className="time-sets">
                    <h2 id="break-label">Break Length</h2>
                    <div className="arrows">
                        <button id="break-decrement" onClick={decBreak}>
                            <MdOutlineArrowDownward />
                        </button>
                        <h3 id="break-length">{Minutes(breakTime)}</h3>
                        <button id="break-increment" onClick={incBreak}>
                            <MdOutlineArrowUpward />
                        </button>
                    </div>
                </div>
                <div className="time-sets">
                    <h2 id="session-label">Session Length</h2>
                    <div className="arrows">
                        <button id="session-decrement" onClick={decSession}>
                            <MdOutlineArrowDownward />
                        </button>
                        <h3 id="session-length">{Minutes(sessionTime)}</h3>
                        <button id="session-increment" onClick={incSession}>
                            <MdOutlineArrowUpward />
                        </button>
                    </div>
                </div>
                <div className="display">
                    <h2 id="timer-label">{onBreak ? "Break" : "Session"}</h2>
                    <h3 id="time-left">{formatTime(displayTime)}</h3>
                    <button id="start_stop" onClick={controlTime}>
                        <MdOutlinePlayArrow />|
                        <MdOutlinePause />
                    </button>
                    <button id="reset" onClick={resetTime}>
                        <MdOutlineRefresh />
                    </button>
                </div>
                <audio
                    id="beep"
                    ref={audio}
                    src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                />
            </div>
        </div>
    );
};

export default Timer;

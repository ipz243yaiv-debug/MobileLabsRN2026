import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [score, setScore] = useState(0);
    const [taps, setTaps] = useState(0);
    const [doubleTaps, setDoubleTaps] = useState(0);
    const [isDragged, setIsDragged] = useState(false);
    const [isPinched, setIsPinched] = useState(false);
    const [isSwiped, setIsSwiped] = useState(false);
    const [isDark, setIsDark] = useState(false);

    return (
        <GameContext.Provider value={{
            score, setScore, taps, setTaps, doubleTaps, setDoubleTaps,
            isDragged, setIsDragged, isPinched, setIsPinched, isSwiped, setIsSwiped,
            isDark, setIsDark
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);
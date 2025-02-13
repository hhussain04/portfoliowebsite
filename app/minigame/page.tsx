"use client";

import React, { useEffect, useRef, useState } from 'react';
import './minigame.css'; // Assuming you have a CSS file for styling

const DinoGame: React.FC = () => {
    const [isJumping, setIsJumping] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const dinoRef = useRef<HTMLDivElement>(null);
    const cactusRef = useRef<HTMLDivElement>(null);

    useEffect(() => {  
        const handleJump = (e: KeyboardEvent) => {
            if (e.code === 'Space' && !isJumping) {
                setIsJumping(true);
                setTimeout(() => setIsJumping(false), 500);
            }
        };

        document.addEventListener('keydown', handleJump);

        return () => {
            document.removeEventListener('keydown', handleJump);
        };
    }, [isJumping]);

    useEffect(() => {
        const checkCollision = setInterval(() => {
            const dino = dinoRef.current;
            const cactus = cactusRef.current;

            if (dino && cactus) {
                const dinoRect = dino.getBoundingClientRect();
                const cactusRect = cactus.getBoundingClientRect();

                if (
                    dinoRect.right > cactusRect.left &&
                    dinoRect.left < cactusRect.right &&
                    dinoRect.bottom > cactusRect.top
                ) {
                    setIsGameOver(true);
                    clearInterval(checkCollision);
                }
            }
        }, 10);

        return () => {
            clearInterval(checkCollision);
        };
    }, []);

    useEffect(() => {
        if (!isGameOver) {
            const scoreInterval = setInterval(() => {
                setScore((prevScore) => prevScore + 1);
            }, 100);

            return () => {
                clearInterval(scoreInterval);
            };
        }
    }, [isGameOver]);

    return (
        <div className="game-container">
            <div className={`dino ${isJumping ? 'jump' : ''}`} ref={dinoRef}></div>
            <div className="cactus" ref={cactusRef}></div>
            <div className="score">Score: {score}</div>
            {isGameOver && <div className="game-over">Game Over</div>}
        </div>
    );
};

export default DinoGame;
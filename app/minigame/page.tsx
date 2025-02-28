// app/minigame/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Play, Pause, RotateCcw } from "lucide-react";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;
const DINO_WIDTH = 50;
const DINO_HEIGHT = 50;
const OBSTACLE_WIDTH = 30;
const OBSTACLE_HEIGHT = 50;
const GRAVITY = 0.8;
const JUMP_VELOCITY = -15;
const OBSTACLE_SPEED = 5;

interface Obstacle {
  id: number;
  x: number;
  type: number;
}

export default function DinoRunner() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [dinoY, setDinoY] = useState(GAME_HEIGHT - DINO_HEIGHT);
  const [velocity, setVelocity] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);

  // Handle jumping
  const jump = () => {
    if (dinoY === GAME_HEIGHT - DINO_HEIGHT && isPlaying) {
      setVelocity(JUMP_VELOCITY);
    }
  };

  // Game loop
  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = setInterval(() => {
      // Update dino position
      setVelocity((v) => v + GRAVITY);
      setDinoY((y) => {
        const newY = y + velocity;
        return Math.min(GAME_HEIGHT - DINO_HEIGHT, Math.max(0, newY));
      });

      // Update obstacles
      setObstacles((obs) =>
        obs
          .map((ob) => ({
            ...ob,
            x: ob.x - OBSTACLE_SPEED,
          }))
          .filter((ob) => ob.x > -OBSTACLE_WIDTH)
      );

      // Add new obstacle
      if (Math.random() < 0.01) {
        setObstacles((obs) => [
          ...obs,
          {
            id: Date.now(),
            x: GAME_WIDTH,
            type: Math.random() > 0.5 ? 1 : 2,
          },
        ]);
      }

      // Update score
      setScore((s) => s + 1);

      // Collision detection
      obstacles.forEach((ob) => {
        const dinoRight = DINO_WIDTH;
        const dinoBottom = dinoY + DINO_HEIGHT;
        const obRight = ob.x + OBSTACLE_WIDTH;
        const obBottom = GAME_HEIGHT;

        if (
          dinoRight > ob.x &&
          0 < obRight &&
          dinoBottom > GAME_HEIGHT - OBSTACLE_HEIGHT &&
          dinoY < obBottom
        ) {
          setIsPlaying(false);
        }
      });
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [isPlaying, dinoY, velocity, obstacles]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        jump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dinoY, isPlaying]);

  // Reset game
  const resetGame = () => {
    setScore(0);
    setDinoY(GAME_HEIGHT - DINO_HEIGHT);
    setVelocity(0);
    setObstacles([]);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-8">
      <Card className="bg-black/40 backdrop-blur-md border-[#8A2BE2]/20 p-6 shadow-lg shadow-[#8A2BE2]/5 max-w-4xl w-full">
        <div className="space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#9370DB] bg-clip-text text-transparent">
              Dino Runner
            </h1>
            <div className="text-xl text-[#8A2BE2] font-mono">
              Score: {score}
            </div>
          </motion.div>

          {/* Game Area */}
          <div
            ref={gameRef}
            className="relative bg-[#0A0A0A] rounded-lg overflow-hidden border border-[#8A2BE2]/30"
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
            onClick={jump}
          >
            {/* Dino */}
            <motion.div
              animate={{ y: dinoY }}
              transition={{ ease: "linear", duration: 0 }}
              className="absolute bottom-0 left-0"
            >
              <Image
                src="/minigame/dino.png"
                alt="Dino"
                width={DINO_WIDTH}
                height={DINO_HEIGHT}
                className="object-contain"
              />
            </motion.div>

            {/* Obstacles */}
            <AnimatePresence>
              {obstacles.map((ob) => (
                <motion.div
                  key={ob.id}
                  initial={{ x: GAME_WIDTH }}
                  animate={{ x: ob.x }}
                  exit={{ x: -OBSTACLE_WIDTH }}
                  transition={{ ease: "linear", duration: 0 }}
                  className="absolute bottom-0"
                  style={{ left: ob.x }}
                >
                  <Image
                    src={`/minigame/obstacle${ob.type}.png`}
                    alt={`Obstacle ${ob.type}`}
                    width={OBSTACLE_WIDTH}
                    height={OBSTACLE_HEIGHT}
                    className="object-contain"
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Game Over Overlay */}
            <AnimatePresence>
              {!isPlaying && score > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/70 flex items-center justify-center"
                >
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-[#8A2BE2]">
                      Game Over
                    </h2>
                    <p className="text-xl text-muted-foreground">
                      Score: {score}
                    </p>
                    <Button
                      onClick={resetGame}
                      className="bg-[#8A2BE2] hover:bg-[#9370DB]"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Play Again
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center">
            <div className="text-muted-foreground">
              Press <span className="text-[#8A2BE2] font-mono">SPACE</span> or
              click to jump
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                variant="outline"
                className="border-[#8A2BE2] text-[#8A2BE2] hover:bg-[#8A2BE2] hover:text-white"
              >
                {isPlaying ? (
                  <Pause className="mr-2 h-4 w-4" />
                ) : (
                  <Play className="mr-2 h-4 w-4" />
                )}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button
                onClick={resetGame}
                variant="outline"
                className="border-[#8A2BE2] text-[#8A2BE2] hover:bg-[#8A2BE2] hover:text-white"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Play, Pause, RotateCcw } from "lucide-react";

// Adjusted constants for better gameplay
const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;
const PLATFORM_HEIGHT = 20;
const DINO_WIDTH = 60;    // Reduced size for better collision
const DINO_HEIGHT = 60;
const OBSTACLE_WIDTH = 40;
const OBSTACLE_HEIGHT = 40;
const GRAVITY = 1;        // Slightly increased for more natural fall
const JUMP_VELOCITY = -18; // Adjusted for more controlled jump height
const OBSTACLE_SPEED = 6;

interface Obstacle {
  id: number;
  x: number;
  type: number;
}

const DINOSPAWNHEIGHT = GAME_HEIGHT - PLATFORM_HEIGHT - DINO_HEIGHT;
const OBSTACLESPAWNHEIGHT = GAME_HEIGHT - PLATFORM_HEIGHT - OBSTACLE_HEIGHT;

export default function DinoRunner() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [dinoY, setDinoY] = useState(DINOSPAWNHEIGHT);
  const [velocity, setVelocity] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);

  const jump = () => {
    if (dinoY >= DINOSPAWNHEIGHT && isPlaying) {
      setVelocity(JUMP_VELOCITY);
    }
  };

  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = setInterval(() => {
      // Physics updates
      setVelocity((v) => v + GRAVITY);
      setDinoY((prevY) => {
        const newY = prevY + velocity;
        // Better ground collision
        if (newY >= DINOSPAWNHEIGHT) {
          setVelocity(0);
          return DINOSPAWNHEIGHT;
        }
        return Math.max(0, newY);
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

      // Spawn obstacles less frequently
      if (Math.random() < 0.008 && obstacles.length < 3) {
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

      // Improved collision detection
      const dinoLeft = 20;  // Added padding from left edge
      const dinoRight = dinoLeft + DINO_WIDTH - 10;  // Reduced hitbox
      const dinoTop = dinoY + 10;                    // Reduced hitbox
      const dinoBottom = dinoY + DINO_HEIGHT - 10;

      obstacles.forEach((ob) => {
        const obLeft = ob.x + 5;                    // Added padding
        const obRight = ob.x + OBSTACLE_WIDTH - 5;
        const obTop = OBSTACLESPAWNHEIGHT + 5;
        const obBottom = OBSTACLESPAWNHEIGHT + OBSTACLE_HEIGHT - 5;

        if (
          dinoRight > obLeft &&
          dinoLeft < obRight &&
          dinoBottom > obTop &&
          dinoTop < obBottom
        ) {
          setIsPlaying(false);
        }
      });
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [isPlaying, dinoY, velocity, obstacles]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault(); // Prevent page scrolling
        jump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dinoY, isPlaying]);

  const resetGame = () => {
    setScore(0);
    setDinoY(DINOSPAWNHEIGHT);
    setVelocity(0);
    setObstacles([]);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-8">
      <Card className="bg-black/40 backdrop-blur-md border-[#8A2BE2]/20 p-6 shadow-lg shadow-[#8A2BE2]/5 max-w-4xl w-full">
        <div className="space-y-6">
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

          <div
            ref={gameRef}
            className="relative bg-[#0A0A0A] rounded-lg overflow-hidden border border-[#8A2BE2]/30"
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
            onClick={jump}
          >
            {/* Ground */}
            <div
              className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#8A2BE2] to-[#6A0DAD]"
              style={{ height: PLATFORM_HEIGHT }}
            >
              <div className="w-full h-1 bg-[#9370DB]" />
            </div>

            {/* Dino */}
            <motion.div
              animate={{ y: dinoY }}
              transition={{ ease: "linear", duration: 0 }}
              className="absolute"
              style={{ 
                left: 20, // Fixed position from left
                width: DINO_WIDTH,
                height: DINO_HEIGHT,
              }}
            >
              <Image
                src="/minigame/dino.png"
                alt="Dino"
                width={DINO_WIDTH}
                height={DINO_HEIGHT}
                className="object-contain"
                style={{ filter: "hue-rotate(270deg)" }}
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
                  className="absolute"
                  style={{ 
                    left: ob.x,
                    bottom: OBSTACLESPAWNHEIGHT,
                    width: OBSTACLE_WIDTH,
                    height: OBSTACLE_HEIGHT
                  }}
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
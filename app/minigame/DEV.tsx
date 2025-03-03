"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Play, Pause, RotateCcw } from "lucide-react";

// Vector class with TypeScript types
class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Vector): Vector {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  multiply(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar);
  }
}

// Adjusted constants for better gameplay
const GAME_WIDTH: number = 800;
const GAME_HEIGHT: number = 400;
const PLATFORM_HEIGHT: number = 20;
const DINO_WIDTH: number = 60;
const DINO_HEIGHT: number = 60;
const OBSTACLE_WIDTH: number = 40;
const OBSTACLE_HEIGHT: number = 40;
const GRAVITY: number = 1;
const JUMP_VELOCITY: number = -18;
const DOUBLE_JUMP_VELOCITY: number = -15;
const OBSTACLE_SPEED: number = 6;

const DINOSPAWNHEIGHT: number = GAME_HEIGHT - PLATFORM_HEIGHT - DINO_HEIGHT;
const OBSTACLESPAWNHEIGHT: number = PLATFORM_HEIGHT;

// Define Obstacle interface
interface Obstacle {
  id: number;
  x: number;
  type: number;
}

export default function DinoRunner(): JSX.Element {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [position, setPosition] = useState<Vector>(new Vector(20, DINOSPAWNHEIGHT));
  const [velocity, setVelocity] = useState<Vector>(new Vector(0, 0));
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [hasDoubleJumped, setHasDoubleJumped] = useState<boolean>(false);
  const gameRef = useRef<HTMLDivElement>(null);

  // Removed gravity initialization from here

  const jump = useCallback((): void => {
    if (position.y >= DINOSPAWNHEIGHT && isPlaying) {
      setVelocity(new Vector(0, JUMP_VELOCITY));
      setHasDoubleJumped(false);
    } else if (!hasDoubleJumped && isPlaying) {
      setVelocity(new Vector(velocity.x, DOUBLE_JUMP_VELOCITY));
      setHasDoubleJumped(true);
    }
  }, [position.y, isPlaying, hasDoubleJumped, velocity.x]);

  useEffect(() => {
    if (!isPlaying) return;

    const gravity: Vector = new Vector(0, GRAVITY);

    const gameLoop = setInterval(() => {
      // Physics updates
      setVelocity((prevVelocity: Vector) => prevVelocity.add(gravity));
      setPosition((prevPosition: Vector) => {
        const newPosition: Vector = prevPosition.add(velocity);
        if (newPosition.y >= DINOSPAWNHEIGHT) {
          setVelocity(new Vector(0, 0));
          return new Vector(prevPosition.x, DINOSPAWNHEIGHT);
        }
        return new Vector(prevPosition.x, Math.max(0, newPosition.y));
      });

      // Update obstacles
      setObstacles((obs: Obstacle[]) =>
        obs
          .map((ob: Obstacle) => ({
            ...ob,
            x: ob.x - OBSTACLE_SPEED,
          }))
          .filter((ob: Obstacle) => ob.x > -OBSTACLE_WIDTH)
      );

      // Spawn obstacles less frequently
      if (Math.random() < 0.008 && obstacles.length < 3) {
        setObstacles((obs: Obstacle[]) => [
          ...obs,
          {
            id: Date.now(),
            x: GAME_WIDTH,
            type: Math.random() > 0.5 ? 1 : 2,
          },
        ]);
      }

      // Update score
      setScore((s: number) => s + 1);

      // Improved collision detection
      const dinoLeft: number = position.x;
      const dinoRight: number = position.x + DINO_WIDTH - 10;
      const dinoTop: number = position.y + 10;
      const dinoBottom: number = position.y + DINO_HEIGHT - 10;

      obstacles.forEach((ob: Obstacle) => {
        const obLeft: number = ob.x + 5;
        const obRight: number = ob.x + OBSTACLE_WIDTH - 5;
        const obTop: number = OBSTACLESPAWNHEIGHT + 5;
        const obBottom: number = OBSTACLESPAWNHEIGHT + OBSTACLE_HEIGHT - 5;

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
  }, [isPlaying, position, velocity, obstacles, hasDoubleJumped]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.code === "Space") {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [position, isPlaying, hasDoubleJumped, jump]);

  const resetGame = (): void => {
    setScore(0);
    setPosition(new Vector(20, DINOSPAWNHEIGHT));
    setVelocity(new Vector(0, 0));
    setObstacles([]);
    setHasDoubleJumped(false);
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
              animate={{ y: position.y }}
              transition={{ ease: "linear", duration: 0 }}
              className="absolute"
              style={{
                left: position.x,
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
              {obstacles.map((ob: Obstacle) => (
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
                    height: OBSTACLE_HEIGHT,
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

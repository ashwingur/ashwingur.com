import { GameStartEvent, GameTickEvent } from "@interfaces/tron.interface";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import sketch from "./TronGameSketch";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

interface TronGameProps {
  socket: Socket;
  sid: string;
  gameStart?: GameStartEvent;
  gameTick?: GameTickEvent;
}

const TronGame: React.FC<TronGameProps> = ({
  socket,
  sid,
  gameStart,
  gameTick,
}) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [playerColour, setPlayerColour] = useState<string | null>(null);
  const [direction, setDirection] = useState<string | null>(null);

  // Countdown logic
  useEffect(() => {
    if (gameStart !== undefined && countdown === null) {
      setCountdown(gameStart.countdown);
      setPlayerColour(
        gameStart.room.players.find((p) => p.sid === sid)?.colour ?? "#FFF"
      );
    }
  }, [gameStart, countdown, sid]);

  useEffect(() => {
    if (countdown === null || countdown <= 0) {
      if (gameStart !== undefined) {
        setDirection(
          gameStart.room.players.find((p) => p.sid === sid)?.direction ?? "UP"
        );
      }
    }

    const timerId = setTimeout(() => {
      setCountdown((prevCount) => (prevCount ? prevCount - 1 : 0));
    }, 1000);

    return () => clearTimeout(timerId);
  }, [countdown, gameStart, sid]);

  // Handling user input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      let newDirection: string | null = null;

      switch (event.key) {
        case "ArrowUp":
        case "w":
        case "W":
          newDirection = "UP";
          break;
        case "ArrowDown":
        case "s":
        case "S":
          newDirection = "DOWN";
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          newDirection = "LEFT";
          break;
        case "ArrowRight":
        case "d":
        case "D":
          newDirection = "RIGHT";
          break;
        default:
          break;
      }

      if (newDirection && newDirection !== direction) {
        setDirection(newDirection);
        //emit the new direction to the server
        socket.emit("change_direction", {
          room_code: gameStart?.room.room_code,
          direction: newDirection,
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  const playerColours = gameStart?.room.players.map((p) => p.colour);

  return (
    <div className="relative flex flex-col items-center mb-4 lg:mb-8">
      {countdown !== null && countdown > 0 && (
        <div className="absolute top-1/2 transform -translate-y-1/2 text-9xl z-10">
          {countdown}
        </div>
      )}
      {playerColour && (
        <h2 className="mb-4">
          Your colour is{" "}
          <span
            className="w-8 h-8 inline-block"
            style={{ background: playerColour }}
          ></span>
        </h2>
      )}
      <div className="relative min-h-96">
        <NextReactP5Wrapper
          sketch={sketch}
          players={gameStart?.room.players}
          colours={playerColours}
          positions={gameTick?.positions}
          grid_size={gameStart?.room.grid_size}
        />
      </div>
    </div>
  );
};

export default TronGame;

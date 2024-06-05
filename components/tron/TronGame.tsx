import { GameStartEvent, GameTickEvent } from "@interfaces/tron.interface";
import React, { useEffect, useState } from "react";

interface TronGameProps {
  gameStart?: GameStartEvent;
  gameTick?: GameTickEvent;
}

const TronGame: React.FC<TronGameProps> = ({ gameStart, gameTick }) => {
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (gameStart && countdown === null) {
      setCountdown(gameStart.countdown);
    }
  }, [gameStart, countdown]);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;

    const timerId = setTimeout(() => {
      setCountdown((prevCount) => (prevCount ? prevCount - 1 : 0));
    }, 1000);

    return () => clearTimeout(timerId);
  }, [countdown]);

  return (
    <div>
      {countdown !== null && countdown > 0 ? (
        <div className="countdown">Game starts in: {countdown}</div>
      ) : (
        <div className="tron-game">{/* Render game UI here */}</div>
      )}
    </div>
  );
};

export default TronGame;

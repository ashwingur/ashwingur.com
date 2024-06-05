import { GameOverEvent } from "@interfaces/tron.interface";
import React from "react";

interface TronGameOverProps {
  gameover_event?: GameOverEvent;
  sid: string | null;
  resetToLobby: () => void;
}

const TronGameOver: React.FC<TronGameOverProps> = ({
  sid,
  gameover_event,
  resetToLobby,
}) => {
  if (gameover_event === undefined) {
    gameover_event = { winner: "", colour: "#FFF", tie: false };
  }
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-black self-center w-11/12 lg:w-2/3 xl:w-2/5 p-4 md:p-8 mt-4 rounded-2xl border-4 border-tron-blue animate-pulse-glow">
      {gameover_event.tie && <h2>Everyone lost...</h2>}
      {sid === gameover_event.winner && <h2>Game Won!</h2>}
      {sid !== gameover_event.winner && !gameover_event.tie && (
        <div className="flex items-center gap-4">
          <h2 className="text-xl md:text-3xl">Game over, winner is </h2>
          <div
            className="w-8 h-8 inline-block"
            style={{ background: gameover_event.colour }}
          />
        </div>
      )}
      <button
        onClick={resetToLobby}
        className="p-4 w-48 border-2 my-8 rounded-lg border-tron-orange shadow-glow-orange-md hover:shadow-glow-orange-2xl hover:text-tron-orange hover:font-bold transition-all text-lg"
      >
        Return to Lobby
      </button>
    </div>
  );
};

export default TronGameOver;

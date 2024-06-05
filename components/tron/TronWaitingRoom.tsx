import React from "react";
import { AvailableRoomsResponse } from "@interfaces/tron.interface";

interface TronWaitingRoomProps {
  room: string | null;
  availableRooms: AvailableRoomsResponse;
  leaveRoom: () => void;
}

const TronWaitingRoom: React.FC<TronWaitingRoomProps> = ({
  room,
  availableRooms,
  leaveRoom,
}) => {
  const currentRoom = availableRooms.rooms.find(
    (item) => item.room_code === room
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-black self-center w-11/12 lg:w-2/3 xl:w-2/5 p-4 md:p-8 mt-4 rounded-2xl border-4 border-tron-blue shadow-2xl shadow-tron-blue/50">
      <h2>Room: {room}</h2>
      <div className="font-mono text-xl">
        Players: {currentRoom?.players.length}/{currentRoom?.max_players}
      </div>
      <button
        onClick={leaveRoom}
        className="p-4 w-48 border-2 rounded-lg border-tron-orange shadow-md shadow-tron-orange hover:bg-tron-orange/20 transition-all text-lg"
      >
        Leave Room
      </button>
    </div>
  );
};

export default TronWaitingRoom;

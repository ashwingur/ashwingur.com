import { AvailableRoomsResponse, Room } from "@interfaces/tron.interface";
import React from "react";

interface RoomTableProps {
  availableRooms: AvailableRoomsResponse;
  roomInput: string;
  createRoom: () => void;
  joinRoom: (room?: Room) => void;
  updateRoomInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RoomTable: React.FC<RoomTableProps> = ({
  availableRooms,
  roomInput,
  createRoom,
  joinRoom,
  updateRoomInput,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-black self-center w-11/12 lg:w-2/3 xl:w-2/5 p-4 md:p-8 mt-4 rounded-2xl border-4 border-tron-blue animate-pulse-glow">
      <button
        onClick={createRoom}
        className="p-4 w-48 border-2 rounded-lg border-tron-orange shadow-glow-orange-md hover:shadow-glow-orange-2xl hover:text-tron-orange hover:font-bold transition-all text-lg"
      >
        Create Room
      </button>
      <button
        onClick={() => joinRoom()}
        className="p-4 w-48 border-2 rounded-lg border-tron-orange shadow-glow-orange-md hover:shadow-glow-orange-2xl hover:text-tron-orange hover:font-bold transition-all text-lg mt-2"
      >
        Join Room
      </button>
      <div>
        <input
          value={roomInput}
          type="text"
          maxLength={4}
          placeholder="JOIN CODE"
          onChange={updateRoomInput}
          className="px-4 py-2 bg-slate-800 border-tron-blue border-2 rounded-lg shadow-glow-blue-lg text-center text-lg w-32 mt-2"
        />
      </div>
      <div className="w-full overflow-x-auto mt-4 border-tron-blue border-2 rounded-lg shadow-glow-blue-lg">
        <table className="w-full bg-slate-950 rounded-lg text-center">
          <thead>
            <tr>
              <th className="px-4 py-4">Room</th>
              <th className="px-4 py-4">Players</th>
              <th className="px-4 py-4">Join</th>
            </tr>
          </thead>
          <tbody>
            {availableRooms.rooms.length === 0 ? (
              <tr className="border-t border-tron-blue/40">
                <td
                  colSpan={3}
                  className="px-4 py-4 text-center text-lg font-mono"
                >
                  No rooms available
                </td>
              </tr>
            ) : (
              availableRooms.rooms.map((room, index) => (
                <tr key={index} className="border-t border-tron-blue/40">
                  <td className="px-4 py-2">{room.room_code}</td>
                  <td className="px-4 py-2">
                    {room.players.length}/{room.max_players}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => joinRoom(room)}
                      disabled={room.game_started}
                      className={`p-2 rounded-lg bg-black border-tron-orange shadow-glow-orange transition-all ${
                        room.game_started
                          ? "cursor-not-allowed"
                          : "hover:shadow-glow-orange-md hover:text-tron-orange"
                      }`}
                    >
                      {room.game_started ? "In Progress" : "Join"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomTable;

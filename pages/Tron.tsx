import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Socket, io } from "socket.io-client";

interface AvailableRoomsResponse {
  rooms: Room[];
  connected_users: number;
}

interface Room {
  room_code: string;
  max_players: number;
  players: string[];
  game_started: boolean;
}

interface JoinRoomResponse {
  success: boolean;
  room?: Room;
  error?: string;
}

interface PingPacket {
  timestamp: number;
}

const Tron = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [room, setRoom] = useState<string | null>(null);
  const [roomInput, setRoomInput] = useState("");
  const [availableRooms, setAvailableRooms] = useState<AvailableRoomsResponse>({
    rooms: [],
    connected_users: 0,
  });
  const [latency, setLatency] = useState<number | null>(null);

  const createRoom = () => {
    socket?.emit("create_room", { max_players: 3 });
  };
  const joinRoom = () => {
    socket?.emit("join_room", { room_code: roomInput });
    socket?.emit("room_details");
  };

  const updateRoomInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomInput(event.target.value);
  };

  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_ASHWINGUR_API}/tron`, {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.emit("available_rooms");

    const pingInterval = setInterval(() => {
      if (newSocket) {
        newSocket.emit("available_rooms");
        newSocket.emit("ping", { timestamp: Date.now() });
      }
    }, 3000);

    newSocket.on("pong", (data: PingPacket) => {
      setLatency(Date.now() - data.timestamp);
    });

    // newSocket.on("connect", () => {
    //   console.log("connected");
    // });

    // Response to both create and join room
    newSocket.on("join_room", (data: JoinRoomResponse) => {
      if (data.success && data.room !== undefined) {
        setRoom(data.room.room_code);
        setRoomInput("");
      }
    });
    newSocket.on("available_rooms", (data: AvailableRoomsResponse) => {
      setAvailableRooms(data);
    });

    return () => {
      clearInterval(pingInterval);
      newSocket.close();
    };
  }, []);

  return (
    <div>
      <Navbar fixed={false} />
      <h1 className="text-center mt-4">Tron</h1>
      <button
        onClick={createRoom}
        disabled={room !== null}
        className="p-4 bg-blue-600"
      >
        Create Room
      </button>
      <div>
        <input
          value={roomInput}
          type="text"
          placeholder="room code"
          onChange={updateRoomInput}
        ></input>
        <button
          onClick={joinRoom}
          disabled={room !== null}
          className="p-4 bg-blue-600"
        >
          Join Room
        </button>
      </div>
      <div>Users online: {availableRooms.connected_users}</div>
      <div>ms: {latency ?? "NA"}</div>
      {availableRooms.rooms.map((room, index) => (
        <div key={index}>
          {room.room_code} - {room.players.length}/{room.max_players}
        </div>
      ))}
      <h2>Room: {room}</h2>
    </div>
  );
};

export default Tron;

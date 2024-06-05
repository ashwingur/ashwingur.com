import React, { useEffect, useState, useRef } from "react";
import { Socket, io } from "socket.io-client";
import { AiOutlineLoading } from "react-icons/ai";
import {
  AvailableRoomsResponse,
  GAME_STATE,
  GameOverEvent,
  GameStartEvent,
  GameTickEvent,
  JoinRoomEvent,
  PingPacket,
  Room,
  SIDEvent,
} from "@interfaces/tron.interface";
import BasicNavbar from "@components/BasicNavbar";
import TronLobby from "@components/tron/TronLobby";
import TronConnecting from "@components/tron/TronConnecting";
import TronStatus from "@components/tron/TronStatus";
import TronWaitingRoom from "@components/tron/TronWaitingRoom";
import TronGame from "@components/tron/TronGame";
import TronGameOver from "@components/tron/TronGameOver";

const Tron = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sid, setSid] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GAME_STATE>(GAME_STATE.Connecting);
  // Ref to track latest gameState, so we dont have a stale value in socket.on('leave_room')
  const gameStateRef = useRef(gameState);
  const [room, setRoom] = useState<string | null>(null);
  const [roomInput, setRoomInput] = useState("");
  const [availableRooms, setAvailableRooms] = useState<AvailableRoomsResponse>({
    rooms: [],
    connected_users: 0,
  });
  const [latency, setLatency] = useState<number | null>(null);
  // Game state management
  const [gameStart, setGameStart] = useState<GameStartEvent>();
  const [gameTick, setGameTick] = useState<GameTickEvent>();
  const [gameoverEvent, setGameOverEvent] = useState<GameOverEvent>();

  const createRoom = () => {
    socket?.emit("create_room", { max_players: 4 });
    socket?.emit("available_rooms");
  };

  const joinRoom = (room?: Room) => {
    if (room !== undefined) {
      socket?.emit("join_room", { room_code: room.room_code });
    } else if (roomInput !== "") {
      socket?.emit("join_room", { room_code: roomInput });
    }
    socket?.emit("available_rooms");
  };

  const leaveRoom = () => {
    socket?.emit("leave_room");
    socket?.emit("available_rooms");
  };

  const resetToLobby = () => {
    socket?.emit("available_rooms");
    setRoom(null);
    setRoomInput("");
    setGameStart(undefined);
    setGameTick(undefined);
    setGameOverEvent(undefined);
    setGameState(GAME_STATE.Lobby);
  };

  const updateRoomInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomInput(event.target.value.toUpperCase());
  };

  useEffect(() => {
    gameStateRef.current = gameState; // Update ref whenever gameState changes
  }, [gameState]);

  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_ASHWINGUR_API}/tron`, {
      transports: ["websocket"],
    });
    setSocket(newSocket);
    setGameState(GAME_STATE.Lobby);

    newSocket.emit("available_rooms");
    newSocket.emit("ping", { timestamp: Date.now() });

    const pingInterval = setInterval(() => {
      if (newSocket) {
        newSocket.emit("available_rooms");
        newSocket.emit("ping", { timestamp: Date.now() });
      }
    }, 3000);

    newSocket.on("sid", (data: SIDEvent) => {
      setSid(data.sid);
    });

    newSocket.on("pong", (data: PingPacket) => {
      setLatency(Date.now() - data.timestamp);
    });

    // Response to both create and join room
    newSocket.on("join_room", (data: JoinRoomEvent) => {
      if (data.success && data.room !== undefined) {
        setRoom(data.room.room_code);
        setRoomInput("");
        setGameState(GAME_STATE.WaitingRoom);
      }
    });

    newSocket.on("available_rooms", (data: AvailableRoomsResponse) => {
      setAvailableRooms(data);
    });

    newSocket.on("leave_room", () => {
      setRoom(null);
      console.log(
        `Leave room received, game state is ${GAME_STATE[gameStateRef.current]}`
      );
      if (gameStateRef.current !== GAME_STATE.GameOver) {
        setGameState(GAME_STATE.Lobby);
      }
    });

    newSocket.on("game_start", (data: GameStartEvent) => {
      setGameStart(data);
      setGameState(GAME_STATE.Game);
    });

    newSocket.on("game_tick", (data: GameTickEvent) => {
      setGameTick(data);
    });

    newSocket.on("game_over", (data: GameOverEvent) => {
      console.log("Game over received");
      setGameOverEvent(data);
      setGameState(GAME_STATE.GameOver);
    });

    newSocket.on("disconnect", () => {
      console.log("disconnecting");
    });

    return () => {
      clearInterval(pingInterval);
      newSocket.close();
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#001724] to-[#001c26] min-h-screen text-slate-100 flex flex-col items-stretch">
      <BasicNavbar
        fixed={false}
        className="bg-slate-800/100 dark:bg-slate-800/100"
      />
      <h1 className="text-center mt-4">Tron</h1>
      {gameState !== GAME_STATE.Connecting && (
        <TronStatus
          connectedUsers={availableRooms.connected_users}
          latency={latency}
        />
      )}
      {gameState === GAME_STATE.Connecting && <TronConnecting />}
      {gameState === GAME_STATE.Lobby && (
        <TronLobby
          availableRooms={availableRooms}
          roomInput={roomInput}
          createRoom={createRoom}
          joinRoom={joinRoom}
          updateRoomInput={updateRoomInput}
        />
      )}
      {gameState === GAME_STATE.WaitingRoom && (
        <TronWaitingRoom
          room={room}
          availableRooms={availableRooms}
          leaveRoom={leaveRoom}
        />
      )}
      {gameState === GAME_STATE.Game && socket && sid && (
        <TronGame
          socket={socket}
          sid={sid}
          gameStart={gameStart}
          gameTick={gameTick}
        />
      )}
      {gameState === GAME_STATE.GameOver && (
        <TronGameOver
          gameover_event={gameoverEvent}
          sid={sid}
          resetToLobby={resetToLobby}
        />
      )}
    </div>
  );
};

export default Tron;

export interface AvailableRoomsResponse {
  rooms: Room[];
  connected_users: number;
}

export interface Room {
  room_code: string;
  max_players: number;
  players: string[];
  game_started: boolean;
}

export interface JoinRoomEvent {
  success: boolean;
  room?: Room;
  error?: string;
}

export interface GameStartEvent {
  room: Room;
  countdown: number;
}

export interface GameTickEvent {
  positions: Record<string, [number, number]>;
}

export interface PingPacket {
  timestamp: number;
}

export enum GAME_STATE {
  Connecting,
  Lobby,
  WaitingRoom,
  Game,
  GameOver,
}

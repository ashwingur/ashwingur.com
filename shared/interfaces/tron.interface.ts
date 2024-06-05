export interface AvailableRoomsResponse {
  rooms: Room[];
  connected_users: number;
}

export interface Room {
  room_code: string;
  max_players: number;
  players: Player[];
  game_started: boolean;
  grid_size: number;
}

export interface Player {
  sid: string;
  colour: string;
  position: [number, number];
  direction: string;
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

export interface GameOverEvent {
  winner: string;
  colour: string;
  tie: boolean;
}

export interface PingPacket {
  timestamp: number;
}

export interface SIDEvent {
  sid: string;
}

export enum GAME_STATE {
  Connecting,
  Lobby,
  WaitingRoom,
  Game,
  GameOver,
}

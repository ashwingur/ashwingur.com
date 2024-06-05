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

export interface JoinRoomResponse {
  success: boolean;
  room?: Room;
  error?: string;
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

// Tipos para autenticación
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Tipos para salas
export interface Room {
  id: string;
  slug: string;
  name: string;
  isPrivate: boolean;
  currentPlayers: number;
  maxPlayers: number;
  status: 'waiting' | 'playing' | 'finished';
  createdAt: string;
}

export interface CreateRoomRequest {
  name: string;
  isPrivate: boolean;
  maxPlayers: number;
}

// Tipos para el juego
export interface GameMove {
  playerId: string;
  move: 'rock' | 'paper' | 'scissors';
}

export interface GameResult {
  winnerId?: string;
  isDraw: boolean;
  moves: GameMove[];
}

// Tipos para WebSocket
export interface WebSocketMessage {
  type: string;
  data: any;
}

export interface GameState {
  roomId: string;
  players: User[];
  currentRound: number;
  gameStatus: 'waiting' | 'playing' | 'finished';
  moves: GameMove[];
  result?: GameResult;
}

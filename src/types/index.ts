// Re-importar User para uso interno en este archivo
import type { User } from "../app/auth/types/authTypes";

// Importar tipos de autenticación desde la nueva ubicación ABCC
export type {
  User,
  AuthResponse,
  LoginCredentials as LoginRequest,
  AuthRegisterRequest as RegisterRequest,
  ApiError,
} from "../app/auth/types/authTypes";

// También exportar con nombres actualizados para migración gradual
export type {
  LoginCredentials,
  AuthRegisterRequest,
} from "../app/auth/types/authTypes";

// Tipos para salas
export interface Room {
  id: string;
  slug: string;
  name: string;
  isPrivate: boolean;
  currentPlayers: number;
  maxPlayers: number;
  status: "waiting" | "playing" | "finished";
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
  move: "rock" | "paper" | "scissors";
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
  gameStatus: "waiting" | "playing" | "finished";
  moves: GameMove[];
  result?: GameResult;
}

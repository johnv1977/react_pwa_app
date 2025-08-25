/**
 * Tipos para autenticación
 * Arquitectura ABCC - App/Auth/Types Layer
 *
 * Compatibilidad con el backend .NET API y el proyecto Vue
 */

// Interfaces para credenciales de login
export interface LoginCredentials {
  email: string;
  password: string;
}

// Interface para registro de usuario
export interface AuthRegisterRequest {
  username: string;
  email: string;
  password: string;
}

// Interface para usuario
export interface User {
  id: string;
  username: string;
  email: string;
}

// Interface para respuesta de autenticación
export interface AuthResponse {
  token: string;
  user: User;
}

// Interface para errores de API
export interface ApiError {
  type?: string | null;
  title?: string | null;
  detail?: string | null;
  status: number;
}

// Tipos para compatibilidad con el código existente (serán migrados gradualmente)
export type LoginRequest = LoginCredentials;
export type RegisterRequest = AuthRegisterRequest;

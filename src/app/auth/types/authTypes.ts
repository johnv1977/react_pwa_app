/**
 * Tipos del módulo de autenticación
 * Basados en swagger.json
 */

// Interfaces para credenciales de login
export interface LoginCredentials {
  usernameOrEmail: string;
  password: string;
}

// Interface para registro de usuario
export interface AuthRegisterRequest {
  username: string;
  email: string;
  password: string;
  displayName?: string | null;
}

// Interface para usuario
export interface User {
  id?: string | null;
  userName?: string | null;
  normalizedUserName?: string | null;
  email?: string | null;
  normalizedEmail?: string | null;
  emailConfirmed: boolean;
  passwordHash?: string | null;
  securityStamp?: string | null;
  concurrencyStamp?: string | null;
  phoneNumber?: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd?: string | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  displayName?: string | null;
}

// Interface para respuesta de autenticación
export interface AuthResponse {
  accessToken?: string | null;
  expiresAt: string;
  user: User;
}

// Interface para errores de API
export interface ApiError {
  type?: string | null;
  title?: string | null;
  detail?: string | null;
  status: number;
}

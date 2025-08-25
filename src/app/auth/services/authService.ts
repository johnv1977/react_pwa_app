/**
 * AuthService
 * Arquitectura ABCC - App/Auth/Services Layer
 *
 * Servicio para manejar la autenticación con el backend .NET API
 * Mantiene compatibilidad con el proyecto Vue
 */

import type {
  AuthRegisterRequest,
  AuthResponse,
  LoginCredentials,
  User,
} from "../types/authTypes";
import ApiService from "../../../common/services/ApiService";
import API_CONFIG from "../../../config/const/api";

class AuthService {
  constructor() {
    // Constructor - configuraciones iniciales
  }

  /**
   * Iniciar sesión con email y contraseña
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await ApiService.post<AuthResponse>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      return response;
    } catch (error: any) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Registrar nuevo usuario
   */
  async register(credentials: AuthRegisterRequest): Promise<AuthResponse> {
    try {
      const response = await ApiService.post<AuthResponse>(
        API_CONFIG.ENDPOINTS.AUTH.REGISTER,
        credentials
      );
      return response;
    } catch (error: any) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Obtener información del usuario autenticado
   */
  async getCurrentUser(): Promise<User> {
    try {
      const userData = await ApiService.get<User>(API_CONFIG.ENDPOINTS.AUTH.ME);
      return userData;
    } catch (error: any) {
      throw this.handleApiError(error);
    }
  }

  /**
   * Verificar si el token es válido
   */
  async verifyToken(): Promise<boolean> {
    try {
      await this.getCurrentUser();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Manejar errores de la API
   */
  private handleApiError(error: any): Error {
    if (error.response?.data?.message) {
      return new Error(error.response.data.message);
    }
    if (error.message) {
      return new Error(error.message);
    }
    return new Error("Error desconocido en la API");
  }
}

// Exportar una instancia singleton
export const authService = new AuthService();
export default authService;

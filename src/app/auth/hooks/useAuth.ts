/**
 * Hook de autenticación
 * Arquitectura ABCC - App/Auth/Hooks Layer
 *
 * Wrapper sobre el AuthStore con funcionalidades adicionales
 * Mantiene compatibilidad con la API anterior del AuthContext
 */

import { useAuthStore } from "../stores/useAuthStore";
import type {
  LoginCredentials,
  AuthRegisterRequest,
  User,
} from "../types/authTypes";

export const useAuth = () => {
  const store = useAuthStore();

  return {
    // Estado
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
    userRole: store.userRole,
    userName: store.userName,

    // Acciones principales
    login: store.login,
    register: store.register,
    logout: store.logout,

    // Acciones auxiliares
    getCurrentUser: store.getCurrentUser,
    verifyToken: store.verifyToken,
    clearError: store.clearError,
    checkAuth: store.checkAuth,
  };
};

export default useAuth;

/**
 * Store de autenticación con Zustand
 * Arquitectura ABCC - App/Auth/Stores Layer
 *
 * Maneja el estado de autenticación del usuario usando authService como única fuente de verdad
 * Equivalente al authStore de Pinia en el proyecto Vue
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  AuthRegisterRequest,
  LoginCredentials,
  User,
  AuthResponse,
} from "../types/authTypes";
import authService from "../services/authService";

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  // Getters
  isAuthenticated: boolean;
  userRole: string;
  userName: string;

  // Actions
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (credentials: AuthRegisterRequest) => Promise<AuthResponse>;
  getCurrentUser: () => Promise<User>;
  verifyToken: () => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  loadUserFromStorage: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set, get) => ({
      // State inicial
      user: null,
      token: localStorage.getItem("authToken"),
      isLoading: false,
      error: null,

      // Getters (se actualizan automáticamente)
      get isAuthenticated() {
        const state = get();
        return !!(state.user && state.token);
      },

      get userRole() {
        const state = get();
        return state.user?.userName || "guest";
      },

      get userName() {
        const state = get();
        return state.user?.userName || "";
      },

      // Actions
      login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        set({ isLoading: true, error: null });

        try {
          const response = await authService.login(credentials);

          // Actualizar estado con la respuesta del servicio
          set({
            token: response.accessToken,
            user: response.user,
            isLoading: false,
          });

          // Persistir en localStorage
          localStorage.setItem("authToken", response.accessToken ?? '');
          localStorage.setItem("user", JSON.stringify(response.user));

          return response;
        } catch (error: any) {
          const errorMessage =
            error instanceof Error ? error.message : "Error al iniciar sesión";
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      register: async (
        credentials: AuthRegisterRequest
      ): Promise<AuthResponse> => {
        set({ isLoading: true, error: null });

        try {
          const response = await authService.register(credentials);

          // Actualizar estado con la respuesta del servicio
          set({
            token: response.accessToken,
            user: response.user,
            isLoading: false,
          });

          // Persistir en localStorage
          localStorage.setItem("authToken", response.accessToken ?? '');
          localStorage.setItem("user", JSON.stringify(response.user));

          return response;
        } catch (error: any) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Error al registrar usuario";
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      getCurrentUser: async (): Promise<User> => {
        const { token } = get();
        if (!token) {
          throw new Error("No hay token de autenticación");
        }

        set({ isLoading: true, error: null });

        try {
          const userData = await authService.getCurrentUser();

          set({
            user: userData,
            isLoading: false,
          });

          // Actualizar localStorage
          localStorage.setItem("user", JSON.stringify(userData));

          return userData;
        } catch (error: any) {
          const errorMessage =
            error instanceof Error ? error.message : "Error al obtener usuario";
          set({ error: errorMessage, isLoading: false });

          // Si hay error al obtener el usuario, probablemente el token expiró
          get().logout();
          throw error;
        }
      },

      verifyToken: async (): Promise<boolean> => {
        const { token } = get();
        if (!token) {
          return false;
        }

        try {
          const isValid = await authService.verifyToken();
          if (!isValid) {
            get().logout();
          }
          return isValid;
        } catch {
          get().logout();
          return false;
        }
      },

      logout: (): void => {
        set({
          user: null,
          token: null,
          error: null,
        });

        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      },

      clearError: (): void => {
        set({ error: null });
      },

      loadUserFromStorage: async (): Promise<void> => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("authToken");

        if (storedUser && storedToken) {
          try {
            const user =
              typeof storedUser === "string"
                ? JSON.parse(storedUser)
                : storedUser;

            set({
              user,
              token: storedToken,
            });

            // Verificar que el token sigue siendo válido
            const isValid = await get().verifyToken();
            if (!isValid) {
              // Token inválido, limpiar todo
              get().logout();
            }
          } catch {
            // Si hay error al parsear, limpiar storage
            get().logout();
          }
        }
      },

      checkAuth: async (): Promise<void> => {
        await get().loadUserFromStorage();
      },
    }),
    {
      name: "auth-store", // nombre para devtools
    }
  )
);

// Inicializar el store al cargarse
useAuthStore.getState().loadUserFromStorage();

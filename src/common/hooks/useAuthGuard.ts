/**
 * Hook para protección de rutas
 * Arquitectura ABCC - Common/Hooks Layer
 *
 * Proporciona funcionalidades para verificar autenticación y redirigir
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/auth/hooks/useAuth";

interface UseAuthGuardOptions {
  requiresAuth?: boolean;
  requiresGuest?: boolean;
  redirectTo?: string;
  onUnauthorized?: () => void;
}

export const useAuthGuard = (options: UseAuthGuardOptions = {}) => {
  const {
    requiresAuth = false,
    requiresGuest = false,
    redirectTo,
    onUnauthorized,
  } = options;

  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Esperar a que termine la carga inicial
    if (isLoading) return;

    // Si requiere autenticación y no está autenticado
    if (requiresAuth && !isAuthenticated) {
      if (onUnauthorized) {
        onUnauthorized();
      } else if (redirectTo) {
        navigate(redirectTo);
      } else {
        navigate("/login"); // Ruta por defecto
      }
      return;
    }

    // Si requiere ser guest y está autenticado
    if (requiresGuest && isAuthenticated) {
      if (redirectTo) {
        navigate(redirectTo);
      } else {
        navigate("/"); // Ruta por defecto
      }
      return;
    }
  }, [
    isAuthenticated,
    isLoading,
    requiresAuth,
    requiresGuest,
    redirectTo,
    navigate,
    onUnauthorized,
  ]);

  return {
    isAuthenticated,
    isLoading,
    canAccess: isLoading
      ? null
      : requiresAuth
      ? isAuthenticated
      : requiresGuest
      ? !isAuthenticated
      : true,
  };
};

export default useAuthGuard;

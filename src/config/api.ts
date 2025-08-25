// Configuración de la API
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'https://localhost:5001',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      ME: '/auth/me'
    },
    ROOMS: '/api/rooms',
    WEBSOCKET: '/gamehub'
  }
};

export default API_CONFIG;

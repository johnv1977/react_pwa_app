# DnuGame - React PWA Client

Cliente Progressive Web App (PWA) para DnuGame, desarrollado con React y TypeScript.

## 🚀 Características

- ⚡ React 19 con TypeScript
- 📱 Progressive Web App (PWA)
- 🔒 Autenticación JWT
- 🎮 Juego multijugador en tiempo real
- 📡 WebSocket para comunicación en tiempo real
- 🎨 Interfaz responsive

## 🛠️ Tecnologías

- **React 19** - Framework principal
- **TypeScript** - Tipado estático
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **SignalR** - WebSocket para tiempo real

## 📁 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── pages/         # Páginas principales
├── services/      # Servicios de API
├── context/       # Context API para estado global
├── hooks/         # Custom hooks
├── types/         # Tipos TypeScript
├── utils/         # Utilidades
└── config/        # Configuración de la app
```

## 🚀 Instalación y Uso

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   # Editar .env con la configuración del backend
   ```

3. **Iniciar en desarrollo:**
   ```bash
   npm start
   ```

4. **Construir para producción:**
   ```bash
   npm run build
   ```

## 🔧 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm run eject` - Eyecta la configuración de Create React App

## 🔗 Conexión con Backend

La aplicación se conecta al backend .NET ubicado en `../DnuGame.Api/`. 

Asegúrate de que el backend esté ejecutándose antes de iniciar esta aplicación.

## 📱 PWA

Esta aplicación está configurada como PWA, lo que significa que:

- Se puede instalar en dispositivos móviles
- Funciona offline (funcionalidad básica)
- Recibe notificaciones push
- Tiene un manifiesto web configurado

## 🎮 Funcionalidades del Juego

- Crear y unirse a salas de juego
- Jugar Piedra, Papel o Tijera en tiempo real
- Chat en las salas
- Historial de partidas
- Sistema de puntuación

## 🔒 Autenticación

El sistema utiliza JWT tokens para la autenticación:

- Login/Registro de usuarios
- Persistencia de sesión
- Protección de rutas
- Logout automático en caso de token expirado

## 🌐 API Endpoints

La aplicación consume los siguientes endpoints del backend:

- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario
- `GET /auth/me` - Obtener usuario actual
- `GET /api/rooms` - Listar salas
- `POST /api/rooms` - Crear sala
- `WebSocket /gamehub` - Comunicación en tiempo real

## 🔄 Estado de Desarrollo

Este proyecto está en desarrollo activo. Funcionalidades pendientes:

- [ ] Página de login/registro
- [ ] Lista de salas
- [ ] Componente de juego
- [ ] Chat en tiempo real
- [ ] Notificaciones push
- [ ] Modo offline

## 📄 Licencia

Este proyecto es parte del ecosistema DnuGame.

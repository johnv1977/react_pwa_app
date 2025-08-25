# Instrucciones de Arquitectura ABCC para GitHub Copilot

## Resumen de la Arquitectura

Este proyecto sigue la arquitectura **ABCC** (App, Base, Common, Config), diseñada específicamente para optimizar la colaboración humano-IA y crear código predecible y escalable.

## Estructura de Carpetas Principal

```
src/
├── app/          # Funcionalidades y lógica de negocio organizadas por módulos
├── base/         # Herramientas genéricas 100% reutilizables en otros proyectos
├── common/       # Componentes y utilidades compartidos dentro de este proyecto
└── config/       # Configuración, constantes e inicialización
```

## Reglas Fundamentales para Copilot

### 🎯 Ubicación de Archivos - SIEMPRE pregunta antes de crear archivos

**ANTES** de generar cualquier código, DEBES determinar la carpeta correcta según estas reglas:

1. **¿Es funcionalidad de usuario?** → `app/[modulo]/`
2. **¿Es código 100% reutilizable en otros proyectos?** → `base/`
3. **¿Es compartido dentro de este proyecto?** → `common/`
4. **¿Es configuración o constantes?** → `config/`

### 📁 Carpeta `app/` - Lógica de Negocio

- **Organización**: Por módulos de funcionalidad (ej: `auth`, `profile`, `products`, `dashboard`)
- **Contiene**: Páginas, vistas, controladores específicos del módulo
- **Subcarpetas típicas**: `components/`, `pages/`, `hooks/`, `services/`, `utils/`, `context/`, `types/`
- **Prohibido**: Importar entre módulos hermanos (ej: `app/auth` NO puede importar de `app/profile`)

### 🔧 Carpeta `base/` - Herramientas Fundamentales

- **Propósito**: Código agnóstico al proyecto, completamente reutilizable
- **Contiene**: Patrones de diseño, utilidades de logging, clientes HTTP base, manejo de errores
- **Prohibido**: Dependencias de otras carpetas del proyecto, elementos de UI, lógica de negocio
- **Ejemplo**: `Result<T>` class, `Logger`, `HttpClient`, patrones Command/Observer

### 🔄 Carpeta `common/` - Elementos Compartidos

- **Propósito**: Componentes y utilidades usados por múltiples módulos en `app/`
- **Regla de Oro**: Desacoplado de modelos de datos específicos
- **Recibe**: Primitivos (string, number, boolean, callbacks)
- **Contiene**: Componentes UI genéricos, hooks reutilizables, utilidades de formato
- **Puede depender de**: `base/`
- **Prohibido**: Depender de `app/` o `config/`

### ⚙️ Carpeta `config/` - Configuración Central

- **Propósito**: Variables de entorno, constantes, inicialización de servicios
- **Contiene**: Temas, rutas de navegación, configuración de APIs, inicializadores
- **Se ejecuta**: Una vez al inicio de la aplicación
- **Subcarpetas**: `constants/`, `environment/`, `navigation/`, `theme/`, `initializers/`, `stores/`
- **IMPORTANTE**: `config/stores/` contiene SOLO la configuración de Pinia, NO los stores de lógica de negocio

## Reglas Específicas para Stores (Pinia)

### 🏪 Ubicación de Stores
**REGLA FUNDAMENTAL**: Los stores SIEMPRE van en `app/[modulo]/stores/[modulo]Store.ts`

```
✅ CORRECTO:
app/
├── auth/stores/authStore.ts
├── usuario/stores/usuarioStore.ts
├── productos/stores/productosStore.ts
└── dashboard/stores/dashboardStore.ts

❌ INCORRECTO:
config/stores/authStore.ts
common/stores/userStore.ts
base/stores/productStore.ts
```

### 📋 Convenciones para Stores
- **Archivo**: `[modulo]Store.ts` (ej: `authStore.ts`, `usuarioStore.ts`)
- **Export**: `use[Modulo]Store` (ej: `useAuthStore`, `useUsuarioStore`)
- **defineStore ID**: `'[modulo]'` (ej: `'auth'`, `'usuario'`)
- **Ubicación**: `app/[modulo]/stores/[modulo]Store.ts`

### 🔧 config/stores/ - Solo Configuración
- **Contiene**: `index.ts` con configuración de Pinia únicamente
- **Propósito**: Inicialización, plugins, utilidades de Pinia
- **NO contiene**: Stores de lógica de negocio, estado de aplicación

## Convenciones de Nomenclatura

### Archivos y Carpetas
- **Carpetas**: `kebab-case` (ej: `user-profile`, `product-catalog`)
- **Archivos de componentes**: `PascalCase.vue` (ej: `UserAvatar.vue`)
- **Archivos de utilidades**: `camelCase.ts` (ej: `formatDate.ts`)
- **Archivos de configuración**: `snake_case.ts` (ej: `api_constants.ts`)

### Componentes Vue
- **Componentes**: `PascalCase` (ej: `UserProfile`, `ProductCard`)
- **Props**: `camelCase` (ej: `imageUrl`, `onTap`)
- **Eventos**: `kebab-case` (ej: `@user-updated`, `@item-selected`)

## Patrones de Implementación

### Para Componentes en `common/`
```typescript
// ✅ CORRECTO - Desacoplado
interface AvatarProps {
  imageUrl: string
  size: 'small' | 'medium' | 'large'
  onTap?: () => void
}

// ❌ INCORRECTO - Acoplado a modelo de datos
interface UserAvatarProps {
  user: User
}
```

### Para Servicios en `app/[modulo]/services/`
```typescript
// ✅ CORRECTO - Específico del módulo
export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResult>
}
```

### Para Utilidades en `base/`
```typescript
// ✅ CORRECTO - Completamente genérico
export class Result<T, E = Error> {
  static success<T>(data: T): Result<T>
  static error<E>(error: E): Result<never, E>
}
```

## Flujo de Trabajo para Copilot

### 1. Análisis Inicial
Antes de generar código, SIEMPRE evalúa:
- ¿Qué funcionalidad implementa?
- ¿Dónde debería ubicarse según ABCC?
- ¿Qué dependencias necesita?
- ¿Sigue las convenciones de nomenclatura?

### 2. Generación de Código
- Crea la estructura de carpetas si no existe
- Sigue las convenciones de nomenclatura
- Implementa las interfaces y tipos necesarios
- Asegúrate de que las dependencias sean correctas

### 3. Validación
- Verifica que el archivo esté en la carpeta correcta
- Confirma que no viole las reglas de dependencias
- Revisa que use las convenciones apropiadas

## Ejemplos de Ubicación Correcta

| Tipo de Archivo | Ubicación | Ejemplo |
|----------------|-----------|---------|
| Página de login | `app/auth/pages/` | `LoginPage.vue` |
| Botón genérico | `common/components/` | `Button.vue` |
| Cliente HTTP base | `base/http/` | `HttpClient.ts` |
| Constantes de API | `config/constants/` | `api_constants.ts` |
| Hook de autenticación | `app/auth/hooks/` | `useAuth.ts` |
| **Store de autenticación** | `app/auth/stores/` | `authStore.ts` |
| **Store de usuarios** | `app/usuario/stores/` | `usuarioStore.ts` |
| **Store de productos** | `app/productos/stores/` | `productosStore.ts` |
| **Configuración de Pinia** | `config/stores/` | `index.ts` |
| Utilidad de formato | `common/utils/` | `formatDate.ts` |
| Patrón de resultado | `base/patterns/` | `Result.ts` |
| Configuración de tema | `config/theme/` | `app_theme.ts` |

## Comandos y Prompts Sugeridos

- "Crea un componente de botón reutilizable siguiendo ABCC"
- "Implementa un servicio de autenticación en el módulo auth"
- "Crea un store de productos en app/productos/stores/"
- "Genera un store de usuarios siguiendo las convenciones ABCC"
- "Genera una utilidad genérica para manejo de errores"
- "Configura las constantes de API según la arquitectura ABCC"

### Prompts específicos para Stores:
- "Crea un store de [modulo] en app/[modulo]/stores/[modulo]Store.ts"
- "Implementa useAuthStore en la ubicación correcta siguiendo ABCC"
- "Genera un store de productos con las convenciones apropiadas"

¡Recuerda siempre confirmar la ubicación antes de generar código!

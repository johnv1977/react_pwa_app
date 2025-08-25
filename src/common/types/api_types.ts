/**
 * Tipos base generados desde swagger.json
 * Estos tipos corresponden a las respuestas y estructuras generales de la API
 */

/**
 * Estructura de respuesta para errores de la API
 * Retornada en status codes 400, 401, 403, 404, 409
 */
export interface ErrorResponse {
  type: string | null
  title: string | null
  detail: string | null
  status: number
}

/**
 * Interface genérica para respuestas paginadas
 * @template T El tipo de los elementos en la paginación
 */
export interface PaginatedResult<T> {
  items: T[] | null
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

/**
 * Parámetros para filtros de paginación
 */
export interface PaginationParams {
  page?: number
  pageSize?: number
}

/**
 * Filtros específicos para salas (custom para cliente)
 */
export interface RoomFilters extends PaginationParams {
  isOpen?: boolean
  search?: string // Para búsqueda por nombre en cliente
}

/**
 * Respuesta para operaciones exitosas sin contenido
 */
export interface VoidResponse {
  success: boolean
  message?: string
}

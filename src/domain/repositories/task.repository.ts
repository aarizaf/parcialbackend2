import { TaskEntity } from '../entities/task.entity';

/**
 * TaskRepository - Interface (contrato) del repositorio de tareas
 * 
 * IMPORTANTE: Esto es una INTERFACE, no una implementación
 * Define QUÉ operaciones podemos hacer, no CÓMO se hacen
 * 
 * La implementación concreta estará en infrastructure/repositories
 * Esto permite que el dominio no dependa de detalles técnicos (Prisma, MongoDB, etc.)
 */

export interface TaskFilters {
  categoryId?: string;
  completed?: boolean;
  search?: string;
}

export interface TaskRepository {
  /**
   * Crea una nueva tarea en el repositorio
   */
  create(task: TaskEntity): Promise<TaskEntity>;

  /**
   * Busca una tarea por su ID
   * Retorna null si no existe
   */
  findById(id: string): Promise<TaskEntity | null>;

  /**
   * Lista todas las tareas con filtros opcionales
   */
  findAll(filters?: TaskFilters): Promise<TaskEntity[]>;

  /**
   * Actualiza una tarea existente
   */
  update(task: TaskEntity): Promise<TaskEntity>;

  /**
   * Elimina una tarea por su ID
   */
  delete(id: string): Promise<void>;

  /**
   * Verifica si existe una tarea con el mismo título en una categoría
   * Útil para evitar duplicados
   */
  existsByTitleAndCategory(title: string, categoryId: string): Promise<boolean>;
}

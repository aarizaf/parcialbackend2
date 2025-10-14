import { Injectable, Inject } from '@nestjs/common';
import { TaskRepository, TaskFilters } from '../../domain/repositories/task.repository';
import { TaskEntity } from '../../domain/entities/task.entity';
import { ListTasksDto } from '../dtos/list-tasks.dto';

/**
 * ListTasksUseCase - Caso de uso para listar tareas con filtros
 * 
 * Flujo:
 * 1. Recibe filtros opcionales (categoryId, completed, search)
 * 2. Consulta el repositorio con esos filtros
 * 3. Retorna la lista de tareas
 * 
 * Este caso de uso es simple pero importante porque:
 * - Centraliza la lógica de filtrado
 * - Permite agregar lógica adicional en el futuro (ej: paginación, ordenamiento)
 */
@Injectable()
export class ListTasksUseCase {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(dto: ListTasksDto): Promise<TaskEntity[]> {
    // Construir los filtros
    const filters: TaskFilters = {
      categoryId: dto.categoryId,
      completed: dto.completed,
      search: dto.search,
    };

    // Consultar las tareas
    return await this.taskRepository.findAll(filters);
  }
}

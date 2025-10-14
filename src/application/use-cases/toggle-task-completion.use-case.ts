import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { TaskEntity } from '../../domain/entities/task.entity';

/**
 * ToggleTaskCompletionUseCase - Caso de uso para alternar el estado de una tarea
 * 
 * Flujo:
 * 1. Busca la tarea por ID
 * 2. Si no existe, lanza excepción
 * 3. Invoca el método toggle() de la entidad (lógica de negocio)
 * 4. Persiste el cambio
 * 
 * IMPORTANTE: La lógica de "alternar" está en la ENTIDAD, no aquí
 * Este caso de uso solo ORQUESTA el flujo
 */
@Injectable()
export class ToggleTaskCompletionUseCase {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(taskId: string): Promise<TaskEntity> {
    // 1. Buscar la tarea
    const task = await this.taskRepository.findById(taskId);

    // 2. Validar que exista
    if (!task) {
      throw new NotFoundException(`La tarea con ID ${taskId} no fue encontrada`);
    }

    // 3. Alternar el estado (lógica en la entidad)
    task.toggle();

    // 4. Persistir el cambio
    return await this.taskRepository.update(task);
  }
}

import { Injectable, Inject, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { TaskEntity } from '../../domain/entities/task.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';

/**
 * CreateTaskUseCase - Caso de uso para crear una tarea
 * 
 * Flujo:
 * 1. Valida los datos de entrada
 * 2. Verifica que la categoría exista
 * 3. Verifica que no haya una tarea duplicada (mismo título en la misma categoría)
 * 4. Crea la tarea
 * 
 * @Inject() - Inyecta las implementaciones de los repositorios usando tokens
 */
@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly taskRepository: TaskRepository,
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(dto: CreateTaskDto): Promise<TaskEntity> {
    // 1. Validar que el título no esté vacío (validación adicional)
    if (!dto.title || dto.title.trim().length === 0) {
      throw new BadRequestException('El título no puede estar vacío');
    }

    // 2. Verificar que la categoría exista
    const category = await this.categoryRepository.findById(dto.categoryId);
    if (!category) {
      throw new NotFoundException(`La categoría con ID ${dto.categoryId} no existe`);
    }

    // 3. Verificar duplicados (opcional pero recomendado)
    const exists = await this.taskRepository.existsByTitleAndCategory(
      dto.title.trim(),
      dto.categoryId,
    );
    if (exists) {
      throw new ConflictException(
        `Ya existe una tarea con el título "${dto.title}" en esta categoría`,
      );
    }

    // 4. Crear la tarea usando el método estático de la entidad
    const task = TaskEntity.create(dto.title, dto.categoryId);

    // 5. Persistir la tarea
    return await this.taskRepository.create(task);
  }
}

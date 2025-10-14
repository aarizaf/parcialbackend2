import { Injectable } from '@nestjs/common';
import { TaskRepository, TaskFilters } from '../../domain/repositories/task.repository';
import { TaskEntity } from '../../domain/entities/task.entity';
import { PrismaService } from '../persistence/prisma.service';

/**
 * PrismaTaskRepository - Implementación concreta del repositorio de tareas usando Prisma
 * 
 * Esta clase:
 * - IMPLEMENTA la interface TaskRepository del dominio
 * - Usa Prisma para comunicarse con PostgreSQL
 * - Convierte entre modelos de Prisma y entidades de dominio
 * 
 * IMPORTANTE: Esta es la ÚNICA clase que conoce Prisma
 * El resto de la aplicación usa la interface TaskRepository
 */
@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(task: TaskEntity): Promise<TaskEntity> {
    const created = await this.prisma.task.create({
      data: {
        id: task.id,
        title: task.title,
        completed: task.completed,
        categoryId: task.categoryId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
    });

    return this.toDomain(created);
  }

  async findById(id: string): Promise<TaskEntity | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    return task ? this.toDomain(task) : null;
  }

  async findAll(filters?: TaskFilters): Promise<TaskEntity[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        // Filtra por categoryId si se proporciona
        ...(filters?.categoryId && { categoryId: filters.categoryId }),
        // Filtra por completed si se proporciona
        ...(filters?.completed !== undefined && { completed: filters.completed }),
        // Búsqueda en el título si se proporciona (case-insensitive)
        ...(filters?.search && {
          title: {
            contains: filters.search,
            mode: 'insensitive',
          },
        }),
      },
      // Incluye información de la categoría para mostrarla en el listado
      include: {
        category: true,
      },
      // Ordena por fecha de creación descendente (más recientes primero)
      orderBy: {
        createdAt: 'desc',
      },
    });

    return tasks.map((task) => this.toDomain(task));
  }

  async update(task: TaskEntity): Promise<TaskEntity> {
    const updated = await this.prisma.task.update({
      where: { id: task.id },
      data: {
        title: task.title,
        completed: task.completed,
        updatedAt: task.updatedAt,
      },
    });

    return this.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }

  async existsByTitleAndCategory(title: string, categoryId: string): Promise<boolean> {
    const count = await this.prisma.task.count({
      where: {
        title: {
          equals: title,
          mode: 'insensitive', // Case-insensitive
        },
        categoryId,
      },
    });

    return count > 0;
  }

  /**
   * Método privado: convierte un modelo de Prisma a una entidad de dominio
   * Esta conversión es importante para mantener la separación de capas
   */
  private toDomain(prismaTask: any): TaskEntity {
    return new TaskEntity(
      prismaTask.id,
      prismaTask.title,
      prismaTask.completed,
      prismaTask.categoryId,
      prismaTask.createdAt,
      prismaTask.updatedAt,
    );
  }
}

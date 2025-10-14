import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { PrismaService } from '../persistence/prisma.service';

/**
 * PrismaCategoryRepository - Implementación del repositorio de categorías con Prisma
 * 
 * Implementa la interface CategoryRepository usando Prisma como ORM
 */
@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(category: CategoryEntity): Promise<CategoryEntity> {
    const created = await this.prisma.category.create({
      data: {
        id: category.id,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
    });

    return this.toDomain(created);
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    return category ? this.toDomain(category) : null;
  }

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.prisma.category.findMany({
      // Incluye el conteo de tareas por categoría (útil para estadísticas)
      include: {
        _count: {
          select: { tasks: true },
        },
      },
      orderBy: {
        name: 'asc', // Ordena alfabéticamente
      },
    });

    return categories.map((cat) => this.toDomain(cat));
  }

  async update(category: CategoryEntity): Promise<CategoryEntity> {
    const updated = await this.prisma.category.update({
      where: { id: category.id },
      data: {
        name: category.name,
        updatedAt: category.updatedAt,
      },
    });

    return this.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id },
    });
  }

  async findByName(name: string): Promise<CategoryEntity | null> {
    const category = await this.prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive', // Case-insensitive para evitar duplicados como "Trabajo" y "trabajo"
        },
      },
    });

    return category ? this.toDomain(category) : null;
  }

  async existsByName(name: string): Promise<boolean> {
    const count = await this.prisma.category.count({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    return count > 0;
  }

  /**
   * Convierte un modelo de Prisma a una entidad de dominio
   */
  private toDomain(prismaCategory: any): CategoryEntity {
    return new CategoryEntity(
      prismaCategory.id,
      prismaCategory.name,
      prismaCategory.createdAt,
      prismaCategory.updatedAt,
    );
  }
}

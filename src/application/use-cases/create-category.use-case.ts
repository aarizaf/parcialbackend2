import { Injectable, Inject, ConflictException, BadRequestException } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { CreateCategoryDto } from '../dtos/create-category.dto';

/**
 * CreateCategoryUseCase - Caso de uso para crear una categoría
 * 
 * Flujo:
 * 1. Valida que el nombre no esté vacío
 * 2. Verifica que no exista una categoría con el mismo nombre (case-insensitive)
 * 3. Crea la categoría
 * 4. Persiste la categoría
 */
@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(dto: CreateCategoryDto): Promise<CategoryEntity> {
    // 1. Validar que el nombre no esté vacío
    if (!dto.name || dto.name.trim().length === 0) {
      throw new BadRequestException('El nombre de la categoría no puede estar vacío');
    }

    // 2. Verificar unicidad (case-insensitive)
    // "Trabajo" y "trabajo" se consideran duplicados
    const exists = await this.categoryRepository.existsByName(dto.name);
    if (exists) {
      throw new ConflictException(
        `Ya existe una categoría con el nombre "${dto.name}"`,
      );
    }

    // 3. Crear la categoría usando el método estático de la entidad
    const category = CategoryEntity.create(dto.name);

    // 4. Persistir la categoría
    return await this.categoryRepository.create(category);
  }
}

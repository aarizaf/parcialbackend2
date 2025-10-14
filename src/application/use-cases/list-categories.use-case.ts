import { Injectable, Inject } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CategoryEntity } from '../../domain/entities/category.entity';

/**
 * ListCategoriesUseCase - Caso de uso para listar todas las categorías
 * 
 * Simple caso de uso que retorna todas las categorías
 */
@Injectable()
export class ListCategoriesUseCase {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.findAll();
  }
}

import { Module } from '@nestjs/common';
import { CategoriesController } from '../controllers/categories.controller';
import { CreateCategoryUseCase } from '../../application/use-cases/create-category.use-case';
import { ListCategoriesUseCase } from '../../application/use-cases/list-categories.use-case';
import { PrismaCategoryRepository } from '../../infrastructure/repositories/prisma-category.repository';
import { DatabaseModule } from './database.module';

/**
 * CategoriesModule - Módulo de categorías
 * 
 * Configura:
 * - Controlador de categorías
 * - Casos de uso de categorías
 * - Repositorio de categorías (usando TOKEN)
 */
@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController],
  providers: [
    // Casos de uso
    CreateCategoryUseCase,
    ListCategoriesUseCase,
    
    // Repositorio con TOKEN
    {
      provide: 'CATEGORY_REPOSITORY',
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: [
    CreateCategoryUseCase,
    ListCategoriesUseCase,
    'CATEGORY_REPOSITORY', // Exportamos el token para que TasksModule lo use
  ],
})
export class CategoriesModule {}

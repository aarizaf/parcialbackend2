import { CategoryEntity } from '../entities/category.entity';

/**
 * CategoryRepository - Interface del repositorio de categorías
 * 
 * Define el contrato para operaciones con categorías
 * La implementación concreta usa Prisma en infrastructure/repositories
 */
export interface CategoryRepository {
  /**
   * Crea una nueva categoría
   */
  create(category: CategoryEntity): Promise<CategoryEntity>;

  /**
   * Busca una categoría por su ID
   */
  findById(id: string): Promise<CategoryEntity | null>;

  /**
   * Lista todas las categorías
   */
  findAll(): Promise<CategoryEntity[]>;

  /**
   * Actualiza una categoría existente
   */
  update(category: CategoryEntity): Promise<CategoryEntity>;

  /**
   * Elimina una categoría por su ID
   */
  delete(id: string): Promise<void>;

  /**
   * Busca una categoría por su nombre (case-insensitive)
   * Útil para verificar duplicados
   */
  findByName(name: string): Promise<CategoryEntity | null>;

  /**
   * Verifica si existe una categoría con ese nombre
   */
  existsByName(name: string): Promise<boolean>;
}

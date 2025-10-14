import { AuthorEntity } from '../entities/author.entity';

/**
 * IAuthorRepository - Interfaz del repositorio de autores
 * 
 * Define el contrato que debe cumplir cualquier implementación del repositorio.
 * Esta es una ABSTRACCIÓN que permite la inversión de dependencias.
 * Las capas superiores dependen de esta interfaz, no de la implementación concreta.
 */
export interface IAuthorRepository {
  /**
   * Crea un nuevo autor en el sistema
   */
  create(author: AuthorEntity): Promise<AuthorEntity>;

  /**
   * Busca un autor por su ID
   * @returns AuthorEntity si existe, null si no existe
   */
  findById(id: string): Promise<AuthorEntity | null>;

  /**
   * Busca un autor por su nombre exacto
   * @returns AuthorEntity si existe, null si no existe
   */
  findByName(name: string): Promise<AuthorEntity | null>;

  /**
   * Obtiene todos los autores
   */
  findAll(): Promise<AuthorEntity[]>;

  /**
   * Actualiza los datos de un autor
   */
  update(id: string, author: Partial<AuthorEntity>): Promise<AuthorEntity>;

  /**
   * Elimina un autor por su ID
   * @returns true si se eliminó, false si no existía
   */
  delete(id: string): Promise<boolean>;

  /**
   * Verifica si existe un autor con el nombre dado (case-insensitive)
   */
  existsByName(name: string): Promise<boolean>;
}

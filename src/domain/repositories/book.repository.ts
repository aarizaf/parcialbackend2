import { BookEntity } from '../entities/book.entity';

/**
 * IBookRepository - Interfaz del repositorio de libros
 * 
 * Define el contrato que debe cumplir cualquier implementación del repositorio.
 * Esta es una ABSTRACCIÓN que permite la inversión de dependencias.
 */
export interface IBookRepository {
  /**
   * Crea un nuevo libro en el sistema
   */
  create(book: BookEntity): Promise<BookEntity>;

  /**
   * Busca un libro por su ID
   * @returns BookEntity si existe, null si no existe
   */
  findById(id: string): Promise<BookEntity | null>;

  /**
   * Busca un libro por su ID incluyendo los datos del autor
   */
  findByIdWithAuthor(id: string): Promise<{ book: BookEntity; author: any } | null>;

  /**
   * Obtiene todos los libros
   */
  findAll(): Promise<BookEntity[]>;

  /**
   * Obtiene todos los libros de un autor específico
   */
  findByAuthorId(authorId: string): Promise<BookEntity[]>;

  /**
   * Actualiza los datos de un libro
   */
  update(id: string, book: Partial<BookEntity>): Promise<BookEntity>;

  /**
   * Elimina un libro por su ID
   * @returns true si se eliminó, false si no existía
   */
  delete(id: string): Promise<boolean>;

  /**
   * Verifica si existe un libro con el título y autor dado
   */
  existsByTitleAndAuthor(title: string, authorId: string): Promise<boolean>;
}

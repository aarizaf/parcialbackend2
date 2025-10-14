/**
 * BookEntity - Entidad de dominio para Libro
 * 
 * Representa un libro en el sistema con sus propiedades y lógica de negocio.
 * Esta es una entidad pura de dominio sin dependencias de frameworks.
 */
export class BookEntity {
  constructor(
    public readonly id: string,
    public title: string,
    public year: number,
    public readonly authorId: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {
    this.validate();
  }

  /**
   * Valida las reglas de negocio del libro
   */
  private validate(): void {
    if (!this.title || this.title.trim().length === 0) {
      throw new Error('El título del libro es requerido');
    }

    if (this.year < 1000 || this.year > new Date().getFullYear() + 1) {
      throw new Error('El año de publicación debe ser válido');
    }

    if (!this.authorId || this.authorId.trim().length === 0) {
      throw new Error('El libro debe tener un autor asociado');
    }
  }

  /**
   * Actualiza el título del libro
   */
  updateTitle(newTitle: string): void {
    if (!newTitle || newTitle.trim().length === 0) {
      throw new Error('El título del libro no puede estar vacío');
    }
    this.title = newTitle.trim();
    this.updatedAt = new Date();
  }

  /**
   * Actualiza el año de publicación
   */
  updateYear(newYear: number): void {
    if (newYear < 1000 || newYear > new Date().getFullYear() + 1) {
      throw new Error('El año de publicación debe ser válido');
    }
    this.year = newYear;
    this.updatedAt = new Date();
  }

  /**
   * Obtiene el título normalizado
   */
  getNormalizedTitle(): string {
    return this.title.trim().toLowerCase();
  }

  /**
   * Factory method para crear un nuevo libro
   */
  static create(title: string, year: number, authorId: string): BookEntity {
    const now = new Date();
    // UUID será generado por la base de datos
    return new BookEntity('', title.trim(), year, authorId, now, now);
  }
}

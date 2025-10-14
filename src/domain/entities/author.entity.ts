/**
 * AuthorEntity - Entidad de dominio para Autor
 * 
 * Representa un autor en el sistema con sus propiedades y lógica de negocio.
 * Esta es una entidad pura de dominio sin dependencias de frameworks.
 */
export class AuthorEntity {
  constructor(
    public readonly id: string,
    public name: string,
    public birthYear: number,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {
    this.validate();
  }


  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('El nombre del autor es requerido');
    }

    if (this.birthYear < 1000 || this.birthYear > new Date().getFullYear()) {
      throw new Error('El año de nacimiento debe ser válido');
    }
  }

  /**
   * Actualiza el nombre del autor
   */
  updateName(newName: string): void {
    if (!newName || newName.trim().length === 0) {
      throw new Error('El nombre del autor no puede estar vacío');
    }
    this.name = newName.trim();
    this.updatedAt = new Date();
  }

  /**
   * Actualiza el año de nacimiento
   */
  updateBirthYear(newBirthYear: number): void {
    if (newBirthYear < 1000 || newBirthYear > new Date().getFullYear()) {
      throw new Error('El año de nacimiento debe ser válido');
    }
    this.birthYear = newBirthYear;
    this.updatedAt = new Date();
  }

  
  getNormalizedName(): string {
    return this.name.trim().toLowerCase();
  }

  /**
   * Factory method para crear un nuevo autor
   */
  static create(name: string, birthYear: number): AuthorEntity {
    const now = new Date();
    // UUID será generado por la base de datos
    return new AuthorEntity('', name.trim(), birthYear, now, now);
  }
}

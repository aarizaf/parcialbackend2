/**
 * CategoryEntity - Entidad de dominio que representa una categoría
 * 
 * Entidad pura del dominio, independiente de frameworks
 */
export class CategoryEntity {
  constructor(
    public readonly id: string,
    public name: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  /**
   * Método de negocio: actualiza el nombre de la categoría
   * Incluye validación de negocio
   */
  updateName(newName: string): void {
    if (!newName || newName.trim().length === 0) {
      throw new Error('El nombre de la categoría no puede estar vacío');
    }
    this.name = newName.trim();
    this.updatedAt = new Date();
  }

  /**
   * Método estático para crear una nueva categoría
   */
  static create(name: string): CategoryEntity {
    if (!name || name.trim().length === 0) {
      throw new Error('El nombre de la categoría es requerido');
    }
    
    return new CategoryEntity(
      crypto.randomUUID(),
      name.trim(),
      new Date(),
      new Date(),
    );
  }

  /**
   * Normaliza el nombre para comparaciones (útil para verificar duplicados)
   */
  getNormalizedName(): string {
    return this.name.toLowerCase().trim();
  }
}

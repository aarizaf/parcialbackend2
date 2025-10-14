/**
 * TaskEntity - Entidad de dominio que representa una tarea
 * 
 * Esta es una entidad PURA del dominio, no depende de ningún framework
 * ni de detalles de infraestructura (base de datos, HTTP, etc.)
 */
export class TaskEntity {
  constructor(
    public readonly id: string,
    public title: string,
    public completed: boolean,
    public categoryId: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  /**
   * Método de negocio: alterna el estado de completado
   * Esta lógica está en la entidad porque es una regla de negocio
   */
  toggle(): void {
    this.completed = !this.completed;
    this.updatedAt = new Date();
  }

  /**
   * Método de negocio: actualiza el título de la tarea
   */
  updateTitle(newTitle: string): void {
    if (!newTitle || newTitle.trim().length === 0) {
      throw new Error('El título no puede estar vacío');
    }
    this.title = newTitle.trim();
    this.updatedAt = new Date();
  }

  /**
   * Método estático para crear una nueva tarea
   * Establece valores por defecto apropiados
   */
  static create(title: string, categoryId: string): TaskEntity {
    return new TaskEntity(
      crypto.randomUUID(), // Genera un ID único
      title.trim(),
      false, // Nueva tarea siempre empieza incompleta
      categoryId,
      new Date(),
      new Date(),
    );
  }
}

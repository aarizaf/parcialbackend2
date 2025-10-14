import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para la respuesta de una tarea
 * 
 * Incluye información de la categoría (nombre) para evitar llamadas adicionales
 */
export class TaskResponseDto {
  @ApiProperty({
    description: 'ID único de la tarea',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Título de la tarea',
    example: 'Completar el ejercicio de NestJS',
  })
  title: string;

  @ApiProperty({
    description: 'Estado de completado',
    example: false,
  })
  completed: boolean;

  @ApiProperty({
    description: 'ID de la categoría',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  categoryId: string;

  @ApiProperty({
    description: 'Nombre de la categoría (opcional, se incluye en listados)',
    example: 'Trabajo',
    required: false,
  })
  categoryName?: string;

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2025-10-13T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2025-10-13T12:00:00.000Z',
  })
  updatedAt: Date;
}

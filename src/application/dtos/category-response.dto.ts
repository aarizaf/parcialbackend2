import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para la respuesta de una categoría
 */
export class CategoryResponseDto {
  @ApiProperty({
    description: 'ID único de la categoría',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Trabajo',
  })
  name: string;

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

  @ApiProperty({
    description: 'Cantidad de tareas en esta categoría',
    example: 5,
    required: false,
  })
  taskCount?: number;
}

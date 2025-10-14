import { IsString, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

/**
 * DTO para filtrar tareas en el listado
 * 
 * Todos los campos son opcionales (@IsOptional())
 */
export class ListTasksDto {
  @ApiProperty({
    description: 'Filtrar por ID de categoría',
    required: false,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID('4', { message: 'El categoryId debe ser un UUID válido' })
  categoryId?: string;

  @ApiProperty({
    description: 'Filtrar por estado de completado',
    required: false,
    example: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'completed debe ser un booleano' })
  @Transform(({ value }) => {
    // Convierte string 'true'/'false' a booleano
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  completed?: boolean;

  @ApiProperty({
    description: 'Buscar en el título de la tarea',
    required: false,
    example: 'ejercicio',
  })
  @IsOptional()
  @IsString({ message: 'search debe ser un texto' })
  search?: string;
}

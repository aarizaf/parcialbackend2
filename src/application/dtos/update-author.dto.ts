import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para actualizar un autor existente
 */
export class UpdateAuthorDto {
  @ApiProperty({
    description: 'Nombre del autor',
    example: 'Gabriel García Márquez',
    required: false,
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Año de nacimiento del autor',
    example: 1927,
    required: false,
  })
  @IsInt({ message: 'El año de nacimiento debe ser un número entero' })
  @Min(1000, { message: 'El año de nacimiento debe ser mayor o igual a 1000' })
  @Max(new Date().getFullYear(), { message: 'El año de nacimiento no puede ser futuro' })
  @IsOptional()
  birthYear?: number;
}

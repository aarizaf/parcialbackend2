import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para crear una nueva categoría
 */
export class CreateCategoryDto {
  @ApiProperty({
    description: 'Nombre de la categoría (debe ser único)',
    example: 'Trabajo',
    minLength: 1,
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;
}

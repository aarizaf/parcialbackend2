import { IsString, IsNotEmpty, IsInt, Min, Max, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para crear un nuevo libro
 */
export class CreateBookDto {
  @ApiProperty({
    description: 'Título del libro',
    example: 'Cien años de soledad',
    minLength: 1,
  })
  @IsString({ message: 'El título debe ser un texto' })
  @IsNotEmpty({ message: 'El título es requerido' })
  title: string;

  @ApiProperty({
    description: 'Año de publicación del libro',
    example: 1967,
    minimum: 1000,
  })
  @IsInt({ message: 'El año debe ser un número entero' })
  @Min(1000, { message: 'El año debe ser mayor o igual a 1000' })
  @Max(new Date().getFullYear() + 1, { message: 'El año no puede ser muy futuro' })
  year: number;

  @ApiProperty({
    description: 'ID del autor del libro',
    example: 'dd560bf6-542d-4905-aea3-05b89f78f552',
    format: 'uuid',
  })
  @IsUUID('all', { message: 'El authorId debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El authorId es requerido' })
  authorId: string;
}

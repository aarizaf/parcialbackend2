import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateBookDto {
  @ApiProperty({
    description: 'Título del libro',
    example: 'Texto de ejemplo',
    required: false,
  })
  @IsString({ message: 'El título debe ser un texto' })
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Año de publicación del libro',
    example: 1967,
    required: false,
  })
  @IsInt({ message: 'El año debe ser un número entero' })
  @Min(1000, { message: 'El año debe ser mayor o igual a 1000' })
  @Max(new Date().getFullYear() + 1, { message: 'El año no puede ser muy futuro' })
  @IsOptional()
  year?: number;
}

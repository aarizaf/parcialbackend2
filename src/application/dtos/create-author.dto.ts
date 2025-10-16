import { IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateAuthorDto {
  @ApiProperty({
    description: 'Nombre del autor',
    example: 'Andres Pérez',
    minLength: 1,
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @ApiProperty({
    description: 'Año de nacimiento del autor',
    example: 1927,
    minimum: 1000,
    maximum: new Date().getFullYear(),
  })
  @IsInt({ message: 'El año de nacimiento debe ser un número entero' })
  @Min(1000, { message: 'El año de nacimiento debe ser mayor o igual a 1000' })
  @Max(new Date().getFullYear(), { message: 'El año de nacimiento no puede ser futuro' })
  birthYear: number;
}

import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para crear una nueva tarea
 * 
 * Los decoradores @Is...() son de class-validator y validan automáticamente
 * Los decoradores @ApiProperty() son de Swagger y documentan la API
 */
export class CreateTaskDto {
  @ApiProperty({
    description: 'Título de la tarea',
    example: 'Completar el ejercicio de NestJS',
    minLength: 1,
  })
  @IsString({ message: 'El título debe ser un texto' })
  @IsNotEmpty({ message: 'El título es requerido' })
  title: string;

  @ApiProperty({
    description: 'ID de la categoría a la que pertenece la tarea',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsUUID('all', { message: 'El categoryId debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El categoryId es requerido' })
  categoryId: string;
}

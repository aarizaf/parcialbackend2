import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO de respuesta para un libro
 */
export class BookResponseDto {
  @ApiProperty({ example: 'd0bb738e-ee1c-456c-83b9-129346b88270' })
  id: string;

  @ApiProperty({ example: 'Cien años de soledad' })
  title: string;

  @ApiProperty({ example: 1967 })
  year: number;

  @ApiProperty({ example: 'dd560bf6-542d-4905-aea3-05b89f78f552' })
  authorId: string;

  @ApiProperty({ example: '2025-10-14T01:04:28.454Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-10-14T01:04:28.454Z' })
  updatedAt: Date;
}

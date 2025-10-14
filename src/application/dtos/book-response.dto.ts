import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO de respuesta para un libro
 */
export class BookResponseDto {
  @ApiProperty({ example: '1043662497' })
  id: string;

  @ApiProperty({ example: 'Cien años de soledad' })
  title: string;

  @ApiProperty({ example: 1967 })
  year: number;

  @ApiProperty({ example: '1043662497' })
  authorId: string;

  @ApiProperty({ example: '2025-10-14T01:04:28.454Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-10-14T01:04:28.454Z' })
  updatedAt: Date;
}

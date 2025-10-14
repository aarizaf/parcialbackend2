import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO de respuesta para un autor
 */
export class AuthorResponseDto {
  @ApiProperty({ example: 'dd560bf6-542d-4905-aea3-05b89f78f552' })
  id: string;

  @ApiProperty({ example: 'Gabriel García Márquez' })
  name: string;

  @ApiProperty({ example: 1927 })
  birthYear: number;

  @ApiProperty({ example: '2025-10-14T01:04:12.817Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-10-14T01:04:12.817Z' })
  updatedAt: Date;
}

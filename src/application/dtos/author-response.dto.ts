import { ApiProperty } from '@nestjs/swagger';


export class AuthorResponseDto {
  @ApiProperty({ example: '1234567' })
  id: string;

  @ApiProperty({ example: 'Andres Pérez' })
  name: string;

  @ApiProperty({ example: 2004 })
  birthYear: number;

  @ApiProperty({ example: '2025-10-16' })
  createdAt: Date;

  @ApiProperty({ example: '2025-10-16' })
  updatedAt: Date;
}

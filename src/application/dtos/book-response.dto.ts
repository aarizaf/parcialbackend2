import { ApiProperty } from '@nestjs/swagger';


export class BookResponseDto {
  @ApiProperty({ example: '1043662497' })
  id: string;

  @ApiProperty({ example: 'Texto de ejemplo' })
  title: string;

  @ApiProperty({ example: 2025 })
  year: number;

  @ApiProperty({ example: '1043662497' })
  authorId: string;

  @ApiProperty({ example: '2025-10-16' })
  createdAt: Date;

  @ApiProperty({ example: '2025-10-16' })
  updatedAt: Date;
}

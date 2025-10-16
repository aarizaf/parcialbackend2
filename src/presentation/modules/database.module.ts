import { Module } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/persistence/prisma.service';


 
@Module({
  providers: [PrismaService],
  exports: [PrismaService], 
})
export class DatabaseModule {}

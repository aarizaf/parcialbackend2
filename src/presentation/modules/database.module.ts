import { Module } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/persistence/prisma.service';

/**
 * DatabaseModule - Módulo que proporciona acceso a la base de datos
 * 
 * Exporta PrismaService para que otros módulos puedan usarlo
 */
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exporta para que otros módulos lo usen
})
export class DatabaseModule {}

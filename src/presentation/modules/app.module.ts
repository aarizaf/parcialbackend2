import { Module } from '@nestjs/common';
import { AuthorsModule } from './authors.module';
import { BooksModule } from './books.module';
import { DatabaseModule } from './database.module';
import { HealthController } from '../controllers/health.controller';

/**
 * AppModule - Módulo raíz de la aplicación LibraryApp
 * 
 * Importa todos los módulos de la aplicación
 * Este es el punto de entrada de NestJS
 */
@Module({
  imports: [
    DatabaseModule,
    AuthorsModule,
    BooksModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TasksModule } from './tasks.module';
import { CategoriesModule } from './categories.module';
import { DatabaseModule } from './database.module';

/**
 * AppModule - Módulo raíz de la aplicación
 * 
 * Importa todos los módulos de la aplicación
 * Este es el punto de entrada de NestJS
 */
@Module({
  imports: [
    DatabaseModule,
    CategoriesModule,
    TasksModule,
  ],
})
export class AppModule {}

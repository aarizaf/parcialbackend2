import { Module } from '@nestjs/common';
import { TasksController } from '../controllers/tasks.controller';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { ListTasksUseCase } from '../../application/use-cases/list-tasks.use-case';
import { ToggleTaskCompletionUseCase } from '../../application/use-cases/toggle-task-completion.use-case';
import { PrismaTaskRepository } from '../../infrastructure/repositories/prisma-task.repository';
import { PrismaCategoryRepository } from '../../infrastructure/repositories/prisma-category.repository';
import { DatabaseModule } from './database.module';
import { CategoriesModule } from './categories.module';

/**
 * TasksModule - Módulo de tareas
 * 
 * Configura:
 * - Controlador de tareas
 * - Casos de uso de tareas
 * - Repositorio de tareas (usando TOKENS)
 * 
 * IMPORTANTE: Usa el token 'TASK_REPOSITORY' para inyección de dependencias
 * Esto permite que los casos de uso no dependan de la implementación concreta
 */
@Module({
  imports: [
    DatabaseModule, // Para usar PrismaService
    CategoriesModule, // Para usar CATEGORY_REPOSITORY
  ],
  controllers: [TasksController],
  providers: [
    // Casos de uso
    CreateTaskUseCase,
    ListTasksUseCase,
    ToggleTaskCompletionUseCase,
    
    // Repositorio con TOKEN (Clean Architecture)
    // El token 'TASK_REPOSITORY' se usa en @Inject() en los casos de uso
    {
      provide: 'TASK_REPOSITORY', // TOKEN
      useClass: PrismaTaskRepository, // Implementación concreta
    },
  ],
  exports: [
    CreateTaskUseCase,
    ListTasksUseCase,
    ToggleTaskCompletionUseCase,
  ],
})
export class TasksModule {}

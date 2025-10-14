import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { ListTasksUseCase } from '../../application/use-cases/list-tasks.use-case';
import { ToggleTaskCompletionUseCase } from '../../application/use-cases/toggle-task-completion.use-case';
import { CreateTaskDto } from '../../application/dtos/create-task.dto';
import { ListTasksDto } from '../../application/dtos/list-tasks.dto';
import { TaskResponseDto } from '../../application/dtos/task-response.dto';

/**
 * TasksController - Controlador REST para tareas
 * 
 * Responsabilidades:
 * - Exponer endpoints HTTP
 * - Validar datos de entrada (usando DTOs y ValidationPipe)
 * - Llamar a los casos de uso
 * - Retornar respuestas HTTP apropiadas
 * 
 * Decoradores:
 * @Controller() - Define el prefijo de ruta (/tasks)
 * @ApiTags() - Agrupa endpoints en Swagger
 */
@ApiTags('Tasks') // Agrupa en Swagger bajo "Tasks"
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly listTasksUseCase: ListTasksUseCase,
    private readonly toggleTaskUseCase: ToggleTaskCompletionUseCase,
  ) {}

  /**
   * POST /tasks - Crear una nueva tarea
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: 201,
    description: 'Tarea creada exitosamente',
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @ApiResponse({ status: 409, description: 'Tarea duplicada' })
  async create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    const task = await this.createTaskUseCase.execute(dto);
    
    // Convertir entidad a DTO de respuesta
    return {
      id: task.id,
      title: task.title,
      completed: task.completed,
      categoryId: task.categoryId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  /**
   * GET /tasks - Listar tareas con filtros opcionales
   */
  @Get()
  @ApiOperation({ summary: 'Listar tareas con filtros opcionales' })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    description: 'Filtrar por ID de categoría',
  })
  @ApiQuery({
    name: 'completed',
    required: false,
    description: 'Filtrar por estado de completado',
    type: Boolean,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Buscar en el título',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tareas',
    type: [TaskResponseDto],
  })
  async list(
    @Query(new ValidationPipe({ transform: true })) dto: ListTasksDto,
  ): Promise<TaskResponseDto[]> {
    const tasks = await this.listTasksUseCase.execute(dto);
    
    // Convertir entidades a DTOs
    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      completed: task.completed,
      categoryId: task.categoryId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }));
  }

  /**
   * PATCH /tasks/:id/toggle - Alternar estado de completado
   */
  @Patch(':id/toggle')
  @ApiOperation({ summary: 'Alternar el estado de completado de una tarea' })
  @ApiParam({
    name: 'id',
    description: 'ID de la tarea',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Tarea actualizada',
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  async toggle(@Param('id') id: string): Promise<TaskResponseDto> {
    const task = await this.toggleTaskUseCase.execute(id);
    
    return {
      id: task.id,
      title: task.title,
      completed: task.completed,
      categoryId: task.categoryId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { CreateCategoryUseCase } from '../../application/use-cases/create-category.use-case';
import { ListCategoriesUseCase } from '../../application/use-cases/list-categories.use-case';
import { CreateCategoryDto } from '../../application/dtos/create-category.dto';
import { CategoryResponseDto } from '../../application/dtos/category-response.dto';

/**
 * CategoriesController - Controlador REST para categorías
 * 
 * Expone endpoints para gestionar categorías
 */
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
  ) {}

  /**
   * POST /categories - Crear una nueva categoría
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'Categoría creada exitosamente',
    type: CategoryResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 409, description: 'Categoría duplicada' })
  async create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.createCategoryUseCase.execute(dto);
    
    return {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  /**
   * GET /categories - Listar todas las categorías
   */
  @Get()
  @ApiOperation({ summary: 'Listar todas las categorías' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorías',
    type: [CategoryResponseDto],
  })
  async list(): Promise<CategoryResponseDto[]> {
    const categories = await this.listCategoriesUseCase.execute();
    
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }));
  }
}

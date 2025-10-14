import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateAuthorDto } from '../../application/dtos/create-author.dto';
import { UpdateAuthorDto } from '../../application/dtos/update-author.dto';
import { AuthorResponseDto } from '../../application/dtos/author-response.dto';
import { CreateAuthorUseCase } from '../../application/use-cases/authors/create-author.use-case';
import { GetAuthorUseCase } from '../../application/use-cases/authors/get-author.use-case';
import { ListAuthorsUseCase } from '../../application/use-cases/authors/list-authors.use-case';
import { UpdateAuthorUseCase } from '../../application/use-cases/authors/update-author.use-case';
import { DeleteAuthorUseCase } from '../../application/use-cases/authors/delete-author.use-case';
import { GetAuthorBooksUseCase } from '../../application/use-cases/authors/get-author-books.use-case';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly createAuthorUseCase: CreateAuthorUseCase,
    private readonly getAuthorUseCase: GetAuthorUseCase,
    private readonly listAuthorsUseCase: ListAuthorsUseCase,
    private readonly updateAuthorUseCase: UpdateAuthorUseCase,
    private readonly deleteAuthorUseCase: DeleteAuthorUseCase,
    private readonly getAuthorBooksUseCase: GetAuthorBooksUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo autor' })
  @ApiResponse({ status: 201, description: 'Autor creado exitosamente', type: AuthorResponseDto })
  @ApiResponse({ status: 409, description: 'Ya existe un autor con ese nombre' })
  async create(@Body() createAuthorDto: CreateAuthorDto): Promise<AuthorResponseDto> {
    return await this.createAuthorUseCase.execute(createAuthorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los autores' })
  @ApiResponse({ status: 200, description: 'Lista de autores', type: [AuthorResponseDto] })
  async findAll(): Promise<AuthorResponseDto[]> {
    return await this.listAuthorsUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un autor por ID' })
  @ApiParam({ name: 'id', description: 'ID del autor' })
  @ApiResponse({ status: 200, description: 'Autor encontrado', type: AuthorResponseDto })
  @ApiResponse({ status: 404, description: 'Autor no encontrado' })
  async findOne(@Param('id') id: string): Promise<AuthorResponseDto> {
    return await this.getAuthorUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un autor' })
  @ApiParam({ name: 'id', description: 'ID del autor' })
  @ApiResponse({ status: 200, description: 'Autor actualizado', type: AuthorResponseDto })
  @ApiResponse({ status: 404, description: 'Autor no encontrado' })
  @ApiResponse({ status: 409, description: 'Ya existe un autor con ese nombre' })
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorResponseDto> {
    return await this.updateAuthorUseCase.execute(id, updateAuthorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un autor' })
  @ApiParam({ name: 'id', description: 'ID del autor' })
  @ApiResponse({ status: 204, description: 'Autor eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Autor no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.deleteAuthorUseCase.execute(id);
  }

  @Get(':id/books')
  @ApiOperation({ summary: 'Obtener los libros de un autor' })
  @ApiParam({ name: 'id', description: 'ID del autor' })
  @ApiResponse({ status: 200, description: 'Lista de libros del autor' })
  @ApiResponse({ status: 404, description: 'Autor no encontrado' })
  async getBooks(@Param('id') id: string) {
    return await this.getAuthorBooksUseCase.execute(id);
  }
}

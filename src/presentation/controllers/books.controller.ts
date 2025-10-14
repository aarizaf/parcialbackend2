import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateBookDto } from '../../application/dtos/create-book.dto';
import { UpdateBookDto } from '../../application/dtos/update-book.dto';
import { BookResponseDto } from '../../application/dtos/book-response.dto';
import { CreateBookUseCase } from '../../application/use-cases/books/create-book.use-case';
import { GetBookUseCase } from '../../application/use-cases/books/get-book.use-case';
import { ListBooksUseCase } from '../../application/use-cases/books/list-books.use-case';
import { UpdateBookUseCase } from '../../application/use-cases/books/update-book.use-case';
import { DeleteBookUseCase } from '../../application/use-cases/books/delete-book.use-case';
import { GetBookAuthorUseCase } from '../../application/use-cases/books/get-book-author.use-case';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly getBookUseCase: GetBookUseCase,
    private readonly listBooksUseCase: ListBooksUseCase,
    private readonly updateBookUseCase: UpdateBookUseCase,
    private readonly deleteBookUseCase: DeleteBookUseCase,
    private readonly getBookAuthorUseCase: GetBookAuthorUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo libro' })
  @ApiResponse({ status: 201, description: 'Libro creado exitosamente', type: BookResponseDto })
  @ApiResponse({ status: 404, description: 'Autor no encontrado' })
  @ApiResponse({ status: 409, description: 'El autor ya tiene un libro con ese título' })
  async create(@Body() createBookDto: CreateBookDto): Promise<BookResponseDto> {
    return await this.createBookUseCase.execute(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los libros' })
  @ApiResponse({ status: 200, description: 'Lista de libros', type: [BookResponseDto] })
  async findAll(): Promise<BookResponseDto[]> {
    return await this.listBooksUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un libro por ID' })
  @ApiParam({ name: 'id', description: 'ID del libro' })
  @ApiResponse({ status: 200, description: 'Libro encontrado', type: BookResponseDto })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  async findOne(@Param('id') id: string): Promise<BookResponseDto> {
    return await this.getBookUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un libro' })
  @ApiParam({ name: 'id', description: 'ID del libro' })
  @ApiResponse({ status: 200, description: 'Libro actualizado', type: BookResponseDto })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  @ApiResponse({ status: 409, description: 'El autor ya tiene un libro con ese título' })
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookResponseDto> {
    return await this.updateBookUseCase.execute(id, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un libro' })
  @ApiParam({ name: 'id', description: 'ID del libro' })
  @ApiResponse({ status: 204, description: 'Libro eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.deleteBookUseCase.execute(id);
  }

  @Get(':id/author')
  @ApiOperation({ summary: 'Obtener el autor de un libro' })
  @ApiParam({ name: 'id', description: 'ID del libro' })
  @ApiResponse({ status: 200, description: 'Autor del libro' })
  @ApiResponse({ status: 404, description: 'Libro o autor no encontrado' })
  async getAuthor(@Param('id') id: string) {
    return await this.getBookAuthorUseCase.execute(id);
  }
}

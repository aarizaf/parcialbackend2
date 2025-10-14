import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import { IBookRepository } from '../../../domain/repositories/book.repository';
import { IAuthorRepository } from '../../../domain/repositories/author.repository';
import { BookEntity } from '../../../domain/entities/book.entity';
import { CreateBookDto } from '../../dtos/create-book.dto';

@Injectable()
export class CreateBookUseCase {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private readonly bookRepository: IBookRepository,
    @Inject('AUTHOR_REPOSITORY')
    private readonly authorRepository: IAuthorRepository,
  ) {}

  async execute(dto: CreateBookDto): Promise<BookEntity> {
    // Validar que el autor existe usando la abstracción
    const author = await this.authorRepository.findById(dto.authorId);
    if (!author) {
      throw new NotFoundException(`No se encontró un autor con el ID "${dto.authorId}"`);
    }

    // Validar que no exista un libro con el mismo título del mismo autor
    const exists = await this.bookRepository.existsByTitleAndAuthor(dto.title, dto.authorId);
    if (exists) {
      throw new ConflictException(`El autor ya tiene un libro con el título "${dto.title}"`);
    }

    // Crear la entidad de dominio
    const book = BookEntity.create(dto.title, dto.year, dto.authorId);

    // Persistir en el repositorio
    return await this.bookRepository.create(book);
  }
}

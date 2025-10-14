import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { IBookRepository } from '../../../domain/repositories/book.repository';
import { BookEntity } from '../../../domain/entities/book.entity';
import { UpdateBookDto } from '../../dtos/update-book.dto';

@Injectable()
export class UpdateBookUseCase {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private readonly bookRepository: IBookRepository,
  ) {}

  async execute(id: string, dto: UpdateBookDto): Promise<BookEntity> {
    // Verificar que el libro existe
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new NotFoundException(`No se encontró un libro con el ID "${id}"`);
    }

    // Si se está actualizando el título, verificar que no esté duplicado
    if (dto.title && dto.title !== book.title) {
      const exists = await this.bookRepository.existsByTitleAndAuthor(dto.title, book.authorId);
      if (exists) {
        throw new ConflictException(`El autor ya tiene un libro con el título "${dto.title}"`);
      }
    }

    // Actualizar los campos
    if (dto.title) {
      book.updateTitle(dto.title);
    }
    if (dto.year) {
      book.updateYear(dto.year);
    }

    // Persistir cambios
    return await this.bookRepository.update(id, book);
  }
}

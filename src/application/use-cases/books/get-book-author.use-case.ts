import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IBookRepository } from '../../../domain/repositories/book.repository';
import { IAuthorRepository } from '../../../domain/repositories/author.repository';

@Injectable()
export class GetBookAuthorUseCase {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private readonly bookRepository: IBookRepository,
    @Inject('AUTHOR_REPOSITORY')
    private readonly authorRepository: IAuthorRepository,
  ) {}

  async execute(bookId: string) {
    // Buscar el libro con su autor
    const result = await this.bookRepository.findByIdWithAuthor(bookId);
    
    if (!result) {
      throw new NotFoundException(`No se encontró un libro con el ID "${bookId}"`);
    }

    const { book, author } = result;

    // Verificar que el autor existe usando la abstracción
    if (!author) {
      throw new NotFoundException(`No se encontró el autor del libro`);
    }

    return {
      bookId: book.id,
      author: {
        id: author.id,
        name: author.name,
        birthYear: author.birthYear,
      },
    };
  }
}

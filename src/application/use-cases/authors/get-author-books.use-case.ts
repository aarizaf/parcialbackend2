import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IAuthorRepository } from '../../../domain/repositories/author.repository';
import { IBookRepository } from '../../../domain/repositories/book.repository';

@Injectable()
export class GetAuthorBooksUseCase {
  constructor(
    @Inject('AUTHOR_REPOSITORY')
    private readonly authorRepository: IAuthorRepository,
    @Inject('BOOK_REPOSITORY')
    private readonly bookRepository: IBookRepository,
  ) {}

  async execute(authorId: string) {
    const author = await this.authorRepository.findById(authorId);
    if (!author) {
      throw new NotFoundException(`No se encontró un autor con el ID "${authorId}"`);
    }

    const books = await this.bookRepository.findByAuthorId(authorId);

    return {
      authorId,
      books: books.map(book => ({
        id: book.id,
        title: book.title,
        year: book.year,
      })),
    };
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { IBookRepository } from '../../../domain/repositories/book.repository';
import { BookEntity } from '../../../domain/entities/book.entity';

@Injectable()
export class ListBooksUseCase {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private readonly bookRepository: IBookRepository,
  ) {}

  async execute(): Promise<BookEntity[]> {
    return await this.bookRepository.findAll();
  }
}

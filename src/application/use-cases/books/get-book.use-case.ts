import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IBookRepository } from '../../../domain/repositories/book.repository';
import { BookEntity } from '../../../domain/entities/book.entity';

@Injectable()
export class GetBookUseCase {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private readonly bookRepository: IBookRepository,
  ) {}

  async execute(id: string): Promise<BookEntity> {
    const book = await this.bookRepository.findById(id);
    
    if (!book) {
      throw new NotFoundException(`No se encontró un libro con el ID "${id}"`);
    }

    return book;
  }
}

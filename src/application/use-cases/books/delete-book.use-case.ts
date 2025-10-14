import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IBookRepository } from '../../../domain/repositories/book.repository';

@Injectable()
export class DeleteBookUseCase {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private readonly bookRepository: IBookRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new NotFoundException(`No se encontró un libro con el ID "${id}"`);
    }

    const deleted = await this.bookRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`No se pudo eliminar el libro con ID "${id}"`);
    }
  }
}

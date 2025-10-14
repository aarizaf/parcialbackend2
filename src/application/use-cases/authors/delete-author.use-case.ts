import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IAuthorRepository } from '../../../domain/repositories/author.repository';

@Injectable()
export class DeleteAuthorUseCase {
  constructor(
    @Inject('AUTHOR_REPOSITORY')
    private readonly authorRepository: IAuthorRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const author = await this.authorRepository.findById(id);
    if (!author) {
      throw new NotFoundException(`No se encontró un autor con el ID "${id}"`);
    }

    const deleted = await this.authorRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`No se pudo eliminar el autor con ID "${id}"`);
    }
  }
}

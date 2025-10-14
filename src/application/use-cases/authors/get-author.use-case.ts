import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IAuthorRepository } from '../../../domain/repositories/author.repository';
import { AuthorEntity } from '../../../domain/entities/author.entity';

@Injectable()
export class GetAuthorUseCase {
  constructor(
    @Inject('AUTHOR_REPOSITORY')
    private readonly authorRepository: IAuthorRepository,
  ) {}

  async execute(id: string): Promise<AuthorEntity> {
    const author = await this.authorRepository.findById(id);
    
    if (!author) {
      throw new NotFoundException(`No se encontró un autor con el ID "${id}"`);
    }

    return author;
  }
}

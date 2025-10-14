import { Injectable, Inject } from '@nestjs/common';
import { IAuthorRepository } from '../../../domain/repositories/author.repository';
import { AuthorEntity } from '../../../domain/entities/author.entity';

@Injectable()
export class ListAuthorsUseCase {
  constructor(
    @Inject('AUTHOR_REPOSITORY')
    private readonly authorRepository: IAuthorRepository,
  ) {}

  async execute(): Promise<AuthorEntity[]> {
    return await this.authorRepository.findAll();
  }
}

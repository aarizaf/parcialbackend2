import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { IAuthorRepository } from '../../../domain/repositories/author.repository';
import { AuthorEntity } from '../../../domain/entities/author.entity';
import { CreateAuthorDto } from '../../dtos/create-author.dto';

@Injectable()
export class CreateAuthorUseCase {
  constructor(
    @Inject('AUTHOR_REPOSITORY')
    private readonly authorRepository: IAuthorRepository,
  ) {}

  async execute(dto: CreateAuthorDto): Promise<AuthorEntity> {
    // Validar que no exista un autor con el mismo nombre
    const exists = await this.authorRepository.existsByName(dto.name);
    if (exists) {
      throw new ConflictException(`Ya existe un autor con el nombre "${dto.name}"`);
    }

    // Crear la entidad de dominio
    const author = AuthorEntity.create(dto.name, dto.birthYear);

    // Persistir en el repositorio
    return await this.authorRepository.create(author);
  }
}

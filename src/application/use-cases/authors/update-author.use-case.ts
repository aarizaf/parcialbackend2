import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { IAuthorRepository } from '../../../domain/repositories/author.repository';
import { AuthorEntity } from '../../../domain/entities/author.entity';
import { UpdateAuthorDto } from '../../dtos/update-author.dto';

@Injectable()
export class UpdateAuthorUseCase {
  constructor(
    @Inject('AUTHOR_REPOSITORY')
    private readonly authorRepository: IAuthorRepository,
  ) {}

  async execute(id: string, dto: UpdateAuthorDto): Promise<AuthorEntity> {
    // Verificar que el autor existe
    const author = await this.authorRepository.findById(id);
    if (!author) {
      throw new NotFoundException(`No se encontró un autor con el ID "${id}"`);
    }

    // Si se está actualizando el nombre, verificar que no esté duplicado
    if (dto.name && dto.name !== author.name) {
      const exists = await this.authorRepository.existsByName(dto.name);
      if (exists) {
        throw new ConflictException(`Ya existe un autor con el nombre "${dto.name}"`);
      }
    }

    // Actualizar los campos
    if (dto.name) {
      author.updateName(dto.name);
    }
    if (dto.birthYear) {
      author.updateBirthYear(dto.birthYear);
    }

    // Persistir cambios
    return await this.authorRepository.update(id, author);
  }
}

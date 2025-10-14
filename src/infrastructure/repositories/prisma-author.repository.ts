import { Injectable } from '@nestjs/common';
import { IAuthorRepository } from '../../domain/repositories/author.repository';
import { AuthorEntity } from '../../domain/entities/author.entity';
import { PrismaService } from '../persistence/prisma.service';

@Injectable()
export class PrismaAuthorRepository implements IAuthorRepository {
  constructor(private prisma: PrismaService) {}

  async create(author: AuthorEntity): Promise<AuthorEntity> {
    const created = await this.prisma.author.create({
      data: {
        name: author.name,
        birthYear: author.birthYear,
      },
    });
    return this.toDomain(created);
  }

  async findById(id: string): Promise<AuthorEntity | null> {
    const author = await this.prisma.author.findUnique({ where: { id } });
    return author ? this.toDomain(author) : null;
  }

  async findByName(name: string): Promise<AuthorEntity | null> {
    const author = await this.prisma.author.findUnique({ where: { name } });
    return author ? this.toDomain(author) : null;
  }

  async findAll(): Promise<AuthorEntity[]> {
    const authors = await this.prisma.author.findMany({ 
      orderBy: { createdAt: 'desc' } 
    });
    return authors.map(a => this.toDomain(a));
  }

  async update(id: string, data: Partial<AuthorEntity>): Promise<AuthorEntity> {
    const updated = await this.prisma.author.update({
      where: { id },
      data: {
        name: data.name,
        birthYear: data.birthYear,
      },
    });
    return this.toDomain(updated);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.author.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async existsByName(name: string): Promise<boolean> {
    const author = await this.prisma.author.findFirst({
      where: { 
        name: { 
          equals: name, 
          mode: 'insensitive' 
        } 
      },
    });
    return !!author;
  }

  private toDomain(prismaAuthor: any): AuthorEntity {
    return new AuthorEntity(
      prismaAuthor.id,
      prismaAuthor.name,
      prismaAuthor.birthYear,
      prismaAuthor.createdAt,
      prismaAuthor.updatedAt,
    );
  }
}

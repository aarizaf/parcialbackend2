import { Injectable } from '@nestjs/common';
import { IBookRepository } from '../../domain/repositories/book.repository';
import { BookEntity } from '../../domain/entities/book.entity';
import { PrismaService } from '../persistence/prisma.service';

@Injectable()
export class PrismaBookRepository implements IBookRepository {
  constructor(private prisma: PrismaService) {}

  async create(book: BookEntity): Promise<BookEntity> {
    const created = await this.prisma.book.create({
      data: {
        title: book.title,
        year: book.year,
        authorId: book.authorId,
      },
    });
    return this.toDomain(created);
  }

  async findById(id: string): Promise<BookEntity | null> {
    const book = await this.prisma.book.findUnique({ where: { id } });
    return book ? this.toDomain(book) : null;
  }

  async findByIdWithAuthor(id: string): Promise<{ book: BookEntity; author: any } | null> {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!book) return null;
    
    return {
      book: this.toDomain(book),
      author: book.author,
    };
  }

  async findAll(): Promise<BookEntity[]> {
    const books = await this.prisma.book.findMany({ 
      orderBy: { createdAt: 'desc' } 
    });
    return books.map(b => this.toDomain(b));
  }

  async findByAuthorId(authorId: string): Promise<BookEntity[]> {
    const books = await this.prisma.book.findMany({
      where: { authorId },
      orderBy: { createdAt: 'desc' },
    });
    return books.map(b => this.toDomain(b));
  }

  async update(id: string, data: Partial<BookEntity>): Promise<BookEntity> {
    const updated = await this.prisma.book.update({
      where: { id },
      data: {
        title: data.title,
        year: data.year,
      },
    });
    return this.toDomain(updated);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.book.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async existsByTitleAndAuthor(title: string, authorId: string): Promise<boolean> {
    const book = await this.prisma.book.findFirst({
      where: {
        title: { equals: title, mode: 'insensitive' },
        authorId,
      },
    });
    return !!book;
  }

  private toDomain(prismaBook: any): BookEntity {
    return new BookEntity(
      prismaBook.id,
      prismaBook.title,
      prismaBook.year,
      prismaBook.authorId,
      prismaBook.createdAt,
      prismaBook.updatedAt,
    );
  }
}

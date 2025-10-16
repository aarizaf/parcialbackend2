import { Module } from '@nestjs/common';
import { BooksController } from '../controllers/books.controller';
import { CreateBookUseCase } from '../../application/use-cases/books/create-book.use-case';
import { GetBookUseCase } from '../../application/use-cases/books/get-book.use-case';
import { ListBooksUseCase } from '../../application/use-cases/books/list-books.use-case';
import { UpdateBookUseCase } from '../../application/use-cases/books/update-book.use-case';
import { DeleteBookUseCase } from '../../application/use-cases/books/delete-book.use-case';
import { GetBookAuthorUseCase } from '../../application/use-cases/books/get-book-author.use-case';
import { PrismaBookRepository } from '../../infrastructure/repositories/prisma-book.repository';
import { PrismaAuthorRepository } from '../../infrastructure/repositories/prisma-author.repository';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [
    
    CreateBookUseCase,
    GetBookUseCase,
    ListBooksUseCase,
    UpdateBookUseCase,
    DeleteBookUseCase,
    GetBookAuthorUseCase,
   
    {
      provide: 'BOOK_REPOSITORY',
      useClass: PrismaBookRepository,
    },
    {
      provide: 'AUTHOR_REPOSITORY',
      useClass: PrismaAuthorRepository,
    },
  ],
})
export class BooksModule {}

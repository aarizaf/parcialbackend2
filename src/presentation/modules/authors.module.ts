import { Module } from '@nestjs/common';
import { AuthorsController } from '../controllers/authors.controller';
import { CreateAuthorUseCase } from '../../application/use-cases/authors/create-author.use-case';
import { GetAuthorUseCase } from '../../application/use-cases/authors/get-author.use-case';
import { ListAuthorsUseCase } from '../../application/use-cases/authors/list-authors.use-case';
import { UpdateAuthorUseCase } from '../../application/use-cases/authors/update-author.use-case';
import { DeleteAuthorUseCase } from '../../application/use-cases/authors/delete-author.use-case';
import { GetAuthorBooksUseCase } from '../../application/use-cases/authors/get-author-books.use-case';
import { PrismaAuthorRepository } from '../../infrastructure/repositories/prisma-author.repository';
import { PrismaBookRepository } from '../../infrastructure/repositories/prisma-book.repository';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthorsController],
  providers: [
    // Use Cases
    CreateAuthorUseCase,
    GetAuthorUseCase,
    ListAuthorsUseCase,
    UpdateAuthorUseCase,
    DeleteAuthorUseCase,
    GetAuthorBooksUseCase,
    // Repositories con tokens
    {
      provide: 'AUTHOR_REPOSITORY',
      useClass: PrismaAuthorRepository,
    },
    {
      provide: 'BOOK_REPOSITORY',
      useClass: PrismaBookRepository,
    },
  ],
  exports: ['AUTHOR_REPOSITORY'], // Exportar para uso en otros módulos
})
export class AuthorsModule {}

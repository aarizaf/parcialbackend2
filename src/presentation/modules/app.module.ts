import { Module } from '@nestjs/common';
import { AuthorsModule } from './authors.module';
import { BooksModule } from './books.module';
import { DatabaseModule } from './database.module';
import { HealthController } from '../controllers/health.controller';


@Module({
  imports: [
    DatabaseModule,
    AuthorsModule,
    BooksModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}

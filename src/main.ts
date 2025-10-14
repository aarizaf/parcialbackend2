import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './presentation/modules/app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.enableCors();

 
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true, 
    }),
  );

  // Configurar Swagger 
  const config = new DocumentBuilder()
    .setTitle('LibraryApp API')
    .setDescription(
      'API REST para gestión de libros y autores con Clean Architecture',
    )
    .setVersion('1.0')
    .addTag('Health', 'Health check')
    .addTag('Authors', 'Endpoints para gestión de autores')
    .addTag('Books', 'Endpoints para gestión de libros')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
 
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'LibraryApp API Docs',
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  
  const port = process.env.PORT || 3000;

  
  await app.listen(port);

  console.log(`
  🚀 Aplicación iniciada exitosamente!
  📝 Servidor corriendo en: http://localhost:${port}
  📚 Documentación Swagger: http://localhost:${port}/api
  🗄️  Base de datos: PostgreSQL
  `);
}

bootstrap();

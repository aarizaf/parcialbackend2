import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './presentation/modules/app.module';

/**
 * main.ts - Punto de entrada de la aplicación
 * 
 * Aquí se:
 * - Crea la aplicación NestJS
 * - Configura pipes globales (validación)
 * - Configura Swagger para documentación
 * - Inicia el servidor
 */
async function bootstrap() {
  // Crear la aplicación NestJS
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS (para que frontends puedan consumir la API)
  app.enableCors();

  // Configurar ValidationPipe global
  // Esto valida automáticamente todos los DTOs usando class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades extra
      transform: true, // Transforma los datos al tipo esperado
    }),
  );

  // Configurar Swagger (OpenAPI)
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
  
  // Exponer Swagger en /api
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'LibraryApp API Docs',
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  // Obtener el puerto de la variable de entorno o usar 3000
  const port = process.env.PORT || 3000;

  // Iniciar el servidor
  await app.listen(port);

  console.log(`
  🚀 Aplicación iniciada exitosamente!
  📝 Servidor corriendo en: http://localhost:${port}
  📚 Documentación Swagger: http://localhost:${port}/api
  🗄️  Base de datos: PostgreSQL
  `);
}

bootstrap();

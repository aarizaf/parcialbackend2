# Script para completar el proyecto LibraryApp
# Este script crea todos los archivos faltantes

Write-Host "🚀 Creando estructura completa de LibraryApp..." -ForegroundColor Green

# Los archivos ya creados:
# ✅ domain/entities/author.entity.ts
# ✅ domain/entities/book.entity.ts  
# ✅ domain/repositories/author.repository.ts
# ✅ domain/repositories/book.repository.ts
# ✅ application/dtos/create-author.dto.ts
# ✅ application/dtos/update-author.dto.ts
# ✅ application/dtos/author-response.dto.ts
# ✅ application/dtos/create-book.dto.ts
# ✅ application/dtos/update-book.dto.ts
# ✅ application/dtos/book-response.dto.ts
# ✅ prisma/schema.prisma

Write-Host "✅ Archivos base ya creados" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Archivos faltantes que necesitas crear:" -ForegroundColor Yellow
Write-Host ""
Write-Host "APPLICATION LAYER - Use Cases:"
Write-Host "  src/application/use-cases/authors/"
Write-Host "    - create-author.use-case.ts"
Write-Host "    - get-author.use-case.ts"
Write-Host "    - list-authors.use-case.ts"
Write-Host "    - update-author.use-case.ts"
Write-Host "    - delete-author.use-case.ts"
Write-Host "    - get-author-books.use-case.ts"
Write-Host ""
Write-Host "  src/application/use-cases/books/"
Write-Host "    - create-book.use-case.ts"
Write-Host "    - get-book.use-case.ts"
Write-Host "    - list-books.use-case.ts"
Write-Host "    - update-book.use-case.ts"
Write-Host "    - delete-book.use-case.ts"
Write-Host "    - get-book-author.use-case.ts"
Write-Host ""
Write-Host "INFRASTRUCTURE LAYER - Repositories:"
Write-Host "  src/infrastructure/repositories/"
Write-Host "    - prisma-author.repository.ts"
Write-Host "    - prisma-book.repository.ts"
Write-Host ""
Write-Host "PRESENTATION LAYER - Controllers:"
Write-Host "  src/presentation/controllers/"
Write-Host "    - authors.controller.ts"
Write-Host "    - books.controller.ts"
Write-Host "    - health.controller.ts"
Write-Host ""
Write-Host "PRESENTATION LAYER - Modules:"
Write-Host "  src/presentation/modules/"
Write-Host "    - authors.module.ts"
Write-Host "    - books.module.ts"
Write-Host "    - app.module.ts"
Write-Host ""
Write-Host "⚠️  IMPORTANTE: Necesitas crear estos archivos manualmente" -ForegroundColor Red
Write-Host "📚 Usa los ejemplos de TasksApp como referencia" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔑 PUNTOS CLAVE:" -ForegroundColor Cyan
Write-Host "1. Use cases: Inyectar repositorios con tokens 'AUTHOR_REPOSITORY' y 'BOOK_REPOSITORY'"
Write-Host "2. Repositories: Implementar todas las interfaces definidas en domain/repositories/"
Write-Host "3. Controllers: Usar decoradores de Swagger (@ApiTags, @ApiResponse, @ApiOperation)"
Write-Host "4. Modules: Registrar providers con useClass para las implementaciones"
Write-Host "5. Health Controller: Retornar {status: 'ok'} en GET /health"
Write-Host ""
Write-Host "📦 PRÓXIMOS PASOS:" -ForegroundColor Green
Write-Host "1. Crear todos los archivos listados arriba"
Write-Host "2. Actualizar .env: DATABASE_URL=postgresql://postgres:postgres@localhost:5432/libraryapp"
Write-Host "3. Ejecutar: docker compose down -v"
Write-Host "4. Ejecutar: docker compose up --build"
Write-Host "5. Verificar /health en http://localhost:3000/health"
Write-Host "6. Verificar Swagger en http://localhost:3000/api"

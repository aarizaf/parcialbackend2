# TasksApp - Clean Architecture con NestJS

API REST para gestión de tareas y categorías implementada con **Clean Architecture** en NestJS, dockerizada con Docker Compose y documentada con Swagger.

## 🏗️ Arquitectura

Este proyecto sigue los principios de **Clean Architecture** con la siguiente estructura de capas:

```
src/
├── domain/              # Capa de Dominio (reglas de negocio puras)
│   ├── entities/        # Entidades de negocio (Task, Category)
│   └── repositories/    # Interfaces de repositorios (contratos)
│
├── application/         # Capa de Aplicación (casos de uso)
│   ├── use-cases/       # Casos de uso (lógica de aplicación)
│   └── dtos/            # DTOs para transferencia de datos
│
├── infrastructure/      # Capa de Infraestructura (detalles técnicos)
│   ├── persistence/     # Configuración de Prisma
│   └── repositories/    # Implementaciones concretas con Prisma
│
└── presentation/        # Capa de Presentación (interfaz HTTP)
    ├── controllers/     # Controladores REST
    └── modules/         # Módulos de NestJS
```

## �️ Stack Tecnológico

- **NestJS 11** - Framework backend progresivo para Node.js
- **TypeScript 5** - Superset tipado de JavaScript
- **Prisma 6** - ORM moderno para Node.js y TypeScript
- **PostgreSQL 15** - Base de datos relacional
- **Swagger/OpenAPI** - Documentación interactiva de API
- **Docker & Docker Compose** - Contenedorización y orquestación
- **class-validator** - Validación de DTOs basada en decoradores

## �🚀 Ejecución con Docker

### Prerrequisitos
- Docker
- Docker Compose

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repo-url>
   cd parcialbackend2
   ```

2. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   > No es necesario modificar el `.env` para desarrollo local

3. **Construir y levantar los servicios**
   ```bash
   docker compose up --build
   ```

4. **Acceder a la aplicación**
   - API: http://localhost:3000
   - Swagger UI: http://localhost:3000/api
   - Base de datos: localhost:5432

5. **Detener los servicios**
   ```bash
   docker compose down
   ```

6. **Detener y limpiar volúmenes** (resetear BD)
   ```bash
   docker compose down -v
   ```

## 📚 Endpoints

### Categories

#### Crear Categoría
```http
POST /categories
Content-Type: application/json

{
  "name": "Python"
}
```

#### Listar Categorías
```http
GET /categories
```

### Tasks

#### Crear Tarea
```http
POST /tasks
Content-Type: application/json

{
  "title": "Completar ejercicio de NestJS",
  "categoryId": "uuid-de-categoria"
}
```

#### Listar Tareas
```http
GET /tasks?categoryId=uuid&completed=true&search=ejercicio
```

Query Params (opcionales):
- `categoryId`: Filtrar por categoría
- `completed`: Filtrar por estado (true/false)
- `search`: Buscar en título

#### Alternar Estado de Tarea
```http
PATCH /tasks/:id/toggle
```

## 🧪 Ejemplo de Uso

1. **Crear una categoría**
   ```bash
   curl -X POST http://localhost:3000/categories \
     -H "Content-Type: application/json" \
     -d '{"name": "Estudio"}'
   ```
   
   Response:
   ```json
   {
     "id": "dd560bf6-542d-4905-aea3-05b89f78f552",
     "name": "Estudio",
     "createdAt": "2025-10-14T01:04:12.817Z",
     "updatedAt": "2025-10-14T01:04:12.817Z"
   }
   ```

2. **Crear una tarea** (usar el `id` de la categoría)
   ```bash
   curl -X POST http://localhost:3000/tasks \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Estudiar Clean Architecture",
       "categoryId": "dd560bf6-542d-4905-aea3-05b89f78f552"
     }'
   ```

3. **Listar tareas**
   ```bash
   curl http://localhost:3000/tasks
   ```

4. **Marcar como completada**
   ```bash
   curl -X PATCH http://localhost:3000/tasks/<task-id>/toggle
   ```

## 🗄️ Base de Datos

### Modelos

**Category**
- `id`: UUID (PK)
- `name`: String (unique)
- `createdAt`: DateTime
- `updatedAt`: DateTime

**Task**
- `id`: UUID (PK)
- `title`: String
- `completed`: Boolean (default: false)
- `categoryId`: UUID (FK → Category)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Restricciones
- Nombre de categoría único (case-insensitive)
- Título de tarea único por categoría
- Eliminación en cascada de tareas al eliminar categoría

## 📖 Documentación Swagger

Accede a la documentación interactiva en: **http://localhost:3000/api**

Desde Swagger puedes:
- Ver todos los endpoints disponibles
- Probar las peticiones directamente
- Ver los esquemas de request/response
- Conocer las validaciones de cada campo

## 🏛️ Principios de Clean Architecture

### Separación de Responsabilidades
- **Domain**: Lógica de negocio pura, sin dependencias externas
- **Application**: Orquestación de casos de uso
- **Infrastructure**: Implementaciones técnicas (BD, APIs)
- **Presentation**: Interfaz con el mundo exterior (HTTP)

### Inversión de Dependencias
- Las capas internas no conocen las externas
- Los repositorios son interfaces en `domain`
- Las implementaciones concretas están en `infrastructure`
- Inyección de dependencias con tokens de NestJS

### Entidades de Dominio
- Métodos de negocio (`toggle()`, `updateName()`)
- Validaciones de dominio
- Sin dependencias de frameworks

## 🔧 Desarrollo Local (sin Docker)

### Prerrequisitos
- Node.js 18+ o 20+
- PostgreSQL 15
- npm o yarn

### Pasos

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Configurar base de datos**
   ```bash
   # Crear base de datos 'tasksapp' en PostgreSQL
   createdb tasksapp
   ```

3. **Ejecutar migraciones**
   ```bash
   npx prisma migrate deploy
   ```

4. **Generar Prisma Client**
   ```bash
   npx prisma generate
   ```

5. **Iniciar en desarrollo**
   ```bash
   npm run start:dev
   ```

6. **Compilar para producción**
   ```bash
   npm run build
   npm run start:prod
   ```

## 📝 Scripts Disponibles

```bash
npm run start:dev    # Desarrollo con hot-reload
npm run build        # Compilar TypeScript a JavaScript
npm run start:prod   # Ejecutar build de producción
npm run lint         # Ejecutar ESLint
```

## 🐛 Troubleshooting

### Error: "El categoryId debe ser un UUID válido"
- **Causa**: Estás usando un UUID de ejemplo en lugar de uno real
- **Solución**: Primero crea una categoría con `POST /categories`, copia el `id` del response, y úsalo en `categoryId` al crear la tarea

### Error: "Ya existe una tarea con este título en esta categoría"
- **Causa**: Constraint de unicidad en la BD
- **Solución**: Usa un título diferente o elige otra categoría

### Los contenedores no inician
```bash
# Limpiar todo y reconstruir
docker compose down -v
docker compose up --build
```

## 📄 Licencia

Este proyecto fue creado con fines educativos.

## 👨‍💻 Autor

Proyecto de práctica para parcial - Clean Architecture con NestJS


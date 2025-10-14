# Dockerfile - Construye la imagen de nuestra aplicación

# Etapa 1: Build (construcción)
FROM node:20-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias (incluyendo devDependencies para build)
RUN npm install

# Copiar archivos de código fuente
COPY . .

# Generar Prisma Client
RUN npx prisma generate

# Compilar TypeScript a JavaScript
RUN npm run build

# Etapa 2: Production (producción)
FROM node:20-alpine

WORKDIR /app

# Copiar package.json para instalar solo dependencias de producción
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --omit=dev

# Copiar el código compilado desde la etapa de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main.js"]

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService - Servicio que gestiona la conexión a la base de datos
 * 
 * Este servicio:
 * - Crea una instancia del cliente de Prisma
 * - Se conecta cuando el módulo se inicializa
 * - Se desconecta cuando el módulo se destruye
 * 
 * @Injectable() - Decorador de NestJS que permite inyectar este servicio
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /**
   * Se ejecuta cuando el módulo NestJS se inicializa
   * Conecta a la base de datos
   */
  async onModuleInit() {
    await this.$connect();
    console.log('✅ Conectado a la base de datos PostgreSQL');
  }

  /**
   * Se ejecuta cuando la aplicación se cierra
   * Desconecta de la base de datos de forma limpia
   */
  async onModuleDestroy() {
    await this.$disconnect();
    console.log('👋 Desconectado de la base de datos');
  }
}

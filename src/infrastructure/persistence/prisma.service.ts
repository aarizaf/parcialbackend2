import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Conectado a la base de datos PostgreSQL');
  }


  async onModuleDestroy() {
    await this.$disconnect();
    console.log('👋 Desconectado de la base de datos');
  }
}

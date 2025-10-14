import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Verificar estado de la aplicación' })
  @ApiResponse({ status: 200, description: 'Aplicación funcionando correctamente' })
  check() {
    return { status: 'ok' };
  }
}

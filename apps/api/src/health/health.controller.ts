import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Check the health of the API' })
  @ApiResponse({
    description: 'API is running...',
    example: {
      status: 'ok',
      database: 'connected',
    },
  })
  getHealth() {
    return this.healthService.checkHealth();
  }
}

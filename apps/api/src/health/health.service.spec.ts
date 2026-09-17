import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals';
import { HealthService } from './health.service';
import { PrismaService } from '../prisma/prisma.service';

describe('HealthService', () => {
  let healthService: HealthService;
  let queryRaw: jest.Mock;

  beforeEach(async () => {
    queryRaw = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: PrismaService,
          useValue: {
            $queryRaw: queryRaw,
          },
        },
      ],
    }).compile();

    healthService = module.get(HealthService);
  });

  it('returns ok and connected when Prisma query succeeds', async () => {
    queryRaw.mockResolvedValue([{ '?column?': 1 }]);

    await expect(healthService.checkHealth()).resolves.toEqual({
      status: 'ok',
      database: 'connected',
    });
  });

  it('returns error and disconnected when Prisma throws', async () => {
    queryRaw.mockRejectedValue(new Error('connection refused'));

    await expect(healthService.checkHealth()).resolves.toEqual({
      status: 'error',
      database: 'disconnected',
    });
  });
});

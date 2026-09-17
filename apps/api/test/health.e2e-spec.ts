import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { jest } from '@jest/globals';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

describe('Health (e2e)', () => {
  let app: INestApplication<App>;
  const queryRaw = jest.fn();

  beforeAll(async () => {
    if (!process.env.DATABASE_URL) {
      process.env.DATABASE_URL =
        'postgresql://zentra:zentra@localhost:5433/zentra';
    }
    process.env.NODE_ENV = 'test';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        $queryRaw: queryRaw,
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    queryRaw.mockReset();
    queryRaw.mockResolvedValue([{ '?column?': 1 }]);
  });

  it('GET /health returns JSON with status and database', async () => {
    const response = await request(app.getHttpServer())
      .get('/health')
      .expect(200);

    expect(response.body).toEqual({
      status: 'ok',
      database: 'connected',
    });
  });

  it('GET /health returns disconnected JSON when Prisma fails', async () => {
    queryRaw.mockReset();
    queryRaw.mockRejectedValue(new Error('database is down'));

    const response = await request(app.getHttpServer())
      .get('/health')
      .expect(200);

    expect(response.body).toEqual({
      status: 'error',
      database: 'disconnected',
    });
  });

  it('GET / is not Hello World', async () => {
    const response = await request(app.getHttpServer()).get('/');

    expect(response.status).toBe(404);
    expect(response.text).not.toContain('Hello World!');
  });
});

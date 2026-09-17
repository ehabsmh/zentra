# Zentra architecture (today)

This file describes the system **as it exists after Level 1**. It is not a future design.

## What exists today

- One NestJS API in `apps/api`
- One PostgreSQL database started with Docker Compose
- Prisma as the ORM (schema, migrations, generated client)
- Swagger as the API UI
- Env validation at startup (fail-fast)
- No login, no product tables beyond a temporary `placeholder` model
- No Next.js frontend (`apps/web` is a placeholder)

## Repository shape

This is an **npm workspaces** monorepo: one git repo, apps under `apps/`.

```text
zentra/
├── apps/
│   ├── api/          # NestJS backend (the product surface today)
│   └── web/          # placeholder until a later level
├── docker/
│   └── docker-compose.yml   # local PostgreSQL
└── docs/
```

Root `package.json` holds workspace config and developer scripts (`dev:api`, `docker:up`, `db:migrate`, `test:api`).

## Backend structure

NestJS is organized as **module → controller → service**.

| Piece | Role |
|---|---|
| `main.ts` | Starts the HTTP process: CORS, Swagger, listen on `PORT` |
| `AppModule` | Root module. Lists features. Does not listen on a port |
| `HealthModule` | Public health endpoint |
| `PrismaModule` | Global Prisma client (connect / disconnect) |
| `ConfigModule` | Loads `.env` and validates with Zod |

### Request flow for `GET /health`

```text
HTTP GET /health
  → HealthController.getHealth()
  → HealthService.checkHealth()
  → PrismaService.$queryRaw`SELECT 1`
  → JSON { status, database }
```

- If the query works: `{ "status": "ok", "database": "connected" }`
- If Prisma throws: `{ "status": "error", "database": "disconnected" }`
- The process does **not** crash when the database is down

NestJS creates `PrismaService` and injects it into `HealthService`. Feature code does not write `new PrismaService()`.

### Prisma lifecycle

```text
schema.prisma  →  migration SQL  →  generated Prisma Client  →  PrismaService
```

- `PrismaService` extends the generated client
- `onModuleInit` calls `$connect`
- `onModuleDestroy` calls `$disconnect`
- The schema has a temporary `placeholder` model so Prisma can migrate an otherwise empty database
- `User` / `Project` / `Task` models are **not** in Level 1

### Env contract

Validated in `apps/api/src/config/env.validation.ts`:

| Variable | Required | Default |
|---|---|---|
| `DATABASE_URL` | Yes | none — missing/empty/invalid URL fails startup |
| `PORT` | No | `3001` |
| `NODE_ENV` | No | `development` |

`apps/api/.env` is local and gitignored. `apps/api/.env.example` is the committed template.

## Local infrastructure

`docker/docker-compose.yml` runs PostgreSQL 16.

- Container port: `5432`
- Host port: `5433` (avoids clashing with a local Postgres on `5432`)
- API `DATABASE_URL` must use host `localhost` and port `5433`

## Locked URLs

```text
GET /health  → health JSON (not under /api, so probes stay simple)
GET /api     → Swagger UI
GET /        → not a product route
```

There is no global `/api` prefix on business routes in Level 1.

CORS is already enabled for `http://localhost:3000` so a future frontend can call the API. That origin is unused today.

## Tests

- Unit: `HealthService` with a mocked `PrismaService` (no Docker)
- HTTP: `GET /health` through the NestJS HTTP layer (Prisma mocked so the route and JSON are protected without a live DB)

NestJS 12 packages are ESM. The API Jest config uses ESM (`useESM` + `--experimental-vm-modules`) so tests can import `@nestjs/testing`. In this npm workspaces repo, Jest lives in the root `node_modules`, so the API test scripts point there.

## What is intentionally missing

- Authentication and `User`
- Projects and tasks
- Next.js / React UI
- Redis / queues
- Production deploy

Level 2 adds identity and authentication on this same NestJS + Prisma foundation.

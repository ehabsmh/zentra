# Zentra setup

This is the Backend-only setup for Level 1. Follow the steps in order. Do not skip.

There is no Next.js app yet. `apps/web` is a placeholder. Swagger is the UI.

## What you need first

- Node.js 22+ (or current LTS)
- npm (comes with Node)
- Docker Desktop (for PostgreSQL)
- Git

## First-time setup (clone → Swagger)

### 1. Clone and install

From any folder:

```bash
git clone https://github.com/ehabsmh/zentra.git
cd zentra
npm install
```

`npm install` at the **repo root** installs all workspace apps (`apps/api`, `apps/web`).

### 2. Create the API env file

Copy the template, then fill real local values:

**PowerShell (Windows):**

```powershell
Copy-Item apps/api/.env.example apps/api/.env
```

**macOS / Linux:**

```bash
cp apps/api/.env.example apps/api/.env
```

Edit `apps/api/.env`:

- `DATABASE_URL` is **required**. There is no default. The API will not start without it.
- `PORT` can stay `3001` (this is also the default if you omit it).
- `NODE_ENV` can stay `development`.

Build `DATABASE_URL` from the local Postgres service in `docker/docker-compose.yml`:

```text
postgresql://USER:PASSWORD@localhost:5433/zentra
```

Use the `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` values from that Compose file. Host port is `5433` (container port is `5432`).

Do **not** commit `apps/api/.env`. Real passwords stay on your machine. `.env.example` is the committed template with fake placeholders.

### 3. Start PostgreSQL

From the repo root:

```bash
npm run docker:up
```

This runs `docker compose -f docker/docker-compose.yml up -d`. Check that `postgres` is up:

```bash
docker compose -f docker/docker-compose.yml ps
```

### 4. Apply Prisma migrations

From the repo root:

```bash
npm run db:migrate
```

This applies SQL in `apps/api/prisma/migrations` and generates the Prisma Client into `apps/api/src/generated/prisma`.

If the generated client is missing later, from `apps/api` run:

```bash
npx prisma generate
```

### 5. Start the API

From the repo root:

```bash
npm run dev:api
```

The NestJS API listens on port `3001`.

### 6. Open Swagger and health

- Swagger UI: [http://localhost:3001/api](http://localhost:3001/api)
- Health: [http://localhost:3001/health](http://localhost:3001/health)

Healthy JSON looks like:

```json
{ "status": "ok", "database": "connected" }
```

`GET /` is not a product route. You should **not** see `"Hello World!"`.

## Daily commands (repo root)

| Command | What it does |
|---|---|
| `npm run docker:up` | Start local PostgreSQL |
| `npm run docker:down` | Stop local PostgreSQL |
| `npm run db:migrate` | Apply Prisma migrations + generate client |
| `npm run dev:api` | Start the API in watch mode |
| `npm run test:api` | Run API unit tests and HTTP tests |

You can also run tests from `apps/api`:

```bash
npm test
npm run test:e2e
```

Unit tests mock Prisma, so they do not need Docker. HTTP tests also mock Prisma, so they do not need a live database either. You still need a valid env story for the real API process (`DATABASE_URL` in `apps/api/.env`).

## Locked URLs (Level 1)

```text
GET /health  → health JSON
GET /api     → Swagger UI
GET /        → not a product route (404)
```

There is no global `/api` prefix on business routes. Health stays at `/health` so later production probes stay simple.

## Stop everything

- Stop the API with `Ctrl+C` in the terminal that runs `npm run dev:api`
- Stop Postgres: `npm run docker:down`

## Troubleshooting

**API fails at startup mentioning environment variables**

- `apps/api/.env` is missing, or `DATABASE_URL` is empty / not a URL
- Copy `.env.example` again and fill `DATABASE_URL`

**`GET /health` returns `"database": "disconnected"`**

- Postgres is not running → `npm run docker:up`
- `DATABASE_URL` host/port/user/password does not match Compose (host port is `5433`)
- Migrations were not applied → `npm run db:migrate`

**Port 3001 already in use**

- Another API process is still running. Stop it, or change `PORT` in `apps/api/.env`

**Prisma Client import errors**

- Run `npm run db:migrate` or `npx prisma generate` from `apps/api`

**`apps/web`**

- Leave it. Next.js is not part of Level 1.

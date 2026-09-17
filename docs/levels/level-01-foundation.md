# Level 1 — Backend Foundation

**Status:** In progress (partially already in the repo)  
**Previous level:** —  
**Next level:** [Level 2 — Identity & Authentication](./level-02-authentication.md) (not created yet)

---

## Level Goal

Build a professional NestJS API that you **understand**, with PostgreSQL, Prisma, API docs, tests, and a repeatable Backend workflow.

After this level, you will have a real Backend skeleton — not product features, and **not a frontend**.

The API itself is the product for a long time. We will use Swagger and HTTP tests, not a Next.js UI.

---

## Why This Level Exists

Every real Backend starts with structure and tooling, not features.

Before authentication, projects, or tasks, we need:

- A clear NestJS application structure
- A database we can connect to
- A repeatable way to start the API locally
- Conventions so later modules stay organized
- A test runner we can grow from

This level teaches you **how a professional NestJS + Prisma API is set up**, not just how to return `"Hello World"`.

> **Why this matters**
>
> Bad Backend structure becomes painful after 3–4 features. Good structure from day one makes Auth, Projects, and Tasks easier.

> **What this level is not**
>
> This is not a full-stack setup level. Frontend starts at **Level 10**, after a substantial Backend journey.

---

## How We Work On Every Task

We do **not** jump from a Task title into code.

```text
1. Study Outline     → what to learn, and why this Task needs it
2. Theory            → only if this Task has real ideas worth explaining
3. Understand        → discuss, ask questions, check understanding
4. Implementation    → only after the design is clear
5. Testing           → prove the important behavior
6. Review            → architecture, code, and what you learned
7. Continue          → next Task
```

**Stop gate:** after the study outline (and theory if it exists), we pause. You should be able to explain the Task in your own words before we write production code.

---

## Current Repo Status

Some Level 1 work already exists. We will **not** rebuild it from zero. We will understand it, then finish what is missing.

| Piece | Status |
|---|---|
| npm workspaces (`apps/api`, `apps/web` placeholder) | Done |
| NestJS API | Done |
| `HealthModule` + database check | Done |
| `PrismaService` / `PrismaModule` | Done |
| Docker Compose PostgreSQL | Done |
| Swagger at `/api` | Done |
| CORS for `http://localhost:3000` | Done (for the future frontend) |
| Env validation (`@nestjs/config`) | Missing |
| API conventions (prefix, starter leftovers) | Partial |
| Health unit + HTTP tests | Missing (only NestJS "Hello World" tests) |
| Root scripts + `docs/SETUP.md` | Missing |
| Next.js app | **Out of scope** — `apps/web` stays a placeholder until Level 10 |

---

## What We Build

| Item | Description |
|---|---|
| NestJS mental model | Understand modules, controllers, services, DI using the existing health flow |
| Environment config | `.env` / `.env.example` and fail-fast validation |
| API conventions | Stable URLs, JSON, Swagger as the Backend "UI" |
| Prisma lifecycle | Confirm connect/disconnect, generated client, placeholder model |
| Tests | Jest unit test + HTTP test for health |
| Developer workflow | Root scripts and Backend-only setup docs |

We do **not** build login, projects, Redis, or Next.js in this level.

---

## What You Learn

### NestJS

- What a **module** is and why NestJS uses them
- **Controllers** — handle HTTP requests
- **Providers / Services** — business logic
- **Dependency Injection** — how NestJS wires components together
- How the request flows: `Request → Controller → Service → Prisma → Response`

### Prisma

- What an ORM is and why we use Prisma
- `schema.prisma` — define models
- Migrations — version-controlled database changes
- Prisma Client — type-safe database queries
- How this project uses the Prisma 7 **driver adapter** (`@prisma/adapter-pg`)

### Docker

- What Docker Compose does
- Why we run PostgreSQL in a container
- How `docker compose up` gives everyone the same database

### General

- Monorepo vs separate repos (and why we chose a monorepo)
- Environment variables and why secrets never go in code
- REST API basics and OpenAPI/Swagger documentation
- Why a health check should include the database
- Why we start Backend tests early

---

## Technologies Involved

| Technology | Role in This Level |
|---|---|
| Node.js | Runtime for the API |
| TypeScript | Type safety |
| NestJS | Backend API framework |
| PostgreSQL | Relational database |
| Prisma | ORM and migrations |
| Docker Compose | Local database container |
| Swagger / OpenAPI | API documentation |
| Jest | Backend tests |

**Not in this level:** Next.js, React, Tailwind, shadcn/ui, TanStack Query, Redis.

---

## Important Concepts

### 1. Backend-First Monolith

We build **one NestJS API** and **one PostgreSQL database**. A Next.js app will exist later, in the same repo, but we do not start it now.

> **Why we chose this**
>
> Microservices add complexity we do not need. A monolith is easier to develop, test, and understand. Building Backend first means we learn NestJS + Prisma deeply before UI work splits our attention.

> **Why not the simpler alternative?**
>
> Mixing everything in one folder would work for a tiny script, but becomes messy fast. `apps/api` stays the Backend. `apps/web` waits until Level 10.

### 2. Dependency Injection (DI)

NestJS creates and injects dependencies for you. A controller receives a service through its constructor — you do not manually create the service.

```typescript
// The controller asks for HealthService — NestJS provides it
constructor(private readonly healthService: HealthService) {}
```

> **Why this matters**
>
> DI makes code testable (you can swap real services with mocks) and keeps modules loosely coupled. Auth, Projects, and Tasks will use the same pattern.

### 3. Environment Configuration

Database URLs, ports, and secrets live in `.env` files, not in source code.

- `.env` — local secrets (never committed)
- `.env.example` — template showing required variables (committed)

The app should **fail at startup** if required config is missing, not on the first request.

### 4. Database Migrations

Schema changes are tracked as migration files. This means:

- Every developer gets the same database structure
- Production deployments apply changes safely
- You can inspect history instead of changing the DB by hand

The first real product model (`User`) comes in Level 2. Level 1 only needs a working Prisma connection.

### 5. API Documentation with Swagger

Swagger generates interactive API docs from your code. During the Backend phase, **Swagger is the product surface**. When we add endpoints later, they should appear in the docs.

---

## Architecture Decisions

| Decision | Choice | Reason |
|---|---|---|
| Repo structure | Monorepo with `apps/` | One repo, clear separation, easy to share types later |
| Backend framework | NestJS | Structured modules, DI, good for learning Backend architecture |
| Database | PostgreSQL | Relational, powerful, great with Prisma |
| ORM | Prisma | Type-safe client, migration workflow |
| Local DB | Docker Compose | Same setup on every machine |
| API docs | Swagger via `@nestjs/swagger` | Auto-generated, interactive, standard |
| API port | `3001` | Leaves `3000` free for the future web app |
| DB port | host `5433` → container `5432` | Avoids clashing with a local PostgreSQL on `5432` |
| Frontend | Delayed until Level 10 | Backend-first learning path |
| Redis | Delayed until Level 7 | Add it when queues/cache have a real reason |

### Target Folder Structure (After Level 1)

```text
zentra/
├── apps/
│   ├── api/                    # NestJS backend
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── health/
│   │   │   │   ├── health.module.ts
│   │   │   │   ├── health.controller.ts
│   │   │   │   └── health.service.ts
│   │   │   └── prisma/
│   │   │       ├── prisma.module.ts
│   │   │       └── prisma.service.ts
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── test/
│   │   ├── .env.example
│   │   └── package.json
│   │
│   └── web/                    # Placeholder only until Level 10
│
├── docker/
│   ├── docker-compose.yml
│   └── .env.example
│
├── docs/
│   ├── ROADMAP.md
│   ├── SETUP.md
│   ├── ARCHITECTURE.md
│   └── levels/
│       └── level-01-foundation.md
├── package.json                # Workspace + Backend scripts
└── README.md
```

---

## Ordered Tasks

Complete these tasks in order. Each task builds on the previous one.

Existing code is **not** the same as understanding. Task 1 exists so we do not skip the foundation because files are already there.

---

### Task 1 — Understand The Existing NestJS API

**Goal:** Map the current app and explain how `GET /health` works.

**Why this task exists:** The API already runs. The skill is understanding how NestJS wires it, so later modules (Auth, Projects, Tasks) follow the same pattern on purpose.

**What we build:** No new feature. A clear mental model of the current request flow.

---

#### Study Before Implementation

Study these ideas **because we will use this exact structure** for every later Backend feature:

- NestJS **application structure**: `main.ts` boots the app; `AppModule` is the root.
- **Module / Controller / Provider** — what each one is for inside `HealthModule`.
- **Dependency Injection** — why `HealthService` receives `PrismaService` instead of creating it with `new`.
- The full request path: `GET /health` → controller → service → Prisma → JSON.
- Why `PrismaModule` is `@Global()`, and what `OnModuleInit` / `OnModuleDestroy` are for.
- Why CORS is already enabled for `http://localhost:3000` even though we have no frontend yet.

**Read:**

- [NestJS Modules](https://docs.nestjs.com/modules)
- [NestJS Providers](https://docs.nestjs.com/providers)
- [NestJS Controllers](https://docs.nestjs.com/controllers)
- [Prisma + NestJS recipe](https://docs.nestjs.com/recipes/prisma)

**Practice:** On paper, draw `GET /health` through the existing files. Name each class.

**Questions you should answer before we continue:**

1. What is the difference between a module, a controller, and a service?
2. Who creates `PrismaService` — you or NestJS?
3. Why does health check the database, not only return `"ok"`?
4. What does `main.ts` do that `AppModule` does not?

---

#### Theory

**NestJS is opinionated on purpose.** It wants you to split:

- **Controller** — HTTP in/out
- **Service** — business rules / work
- **Module** — which pieces belong together
- **DI** — NestJS constructs classes and passes dependencies in

This matters for Zentra because Auth, Projects, and Tasks will each become a module. If the health flow is unclear, later features will feel like copy-paste.

A **module** is a boundary. `HealthModule` owns health. Later, `AuthModule` will own login. `AppModule` only imports those boundaries.

---

**Steps:**

1. Read `apps/api/src/main.ts` — bootstrap, CORS, Swagger, port.
2. Read `apps/api/src/app.module.ts` — what is imported.
3. Read `health/` — controller, service, module.
4. Read `prisma/` — why `PrismaService` extends the client, how it connects.
5. Hit `GET /health` and match the JSON to `HealthService.checkHealth()`.
6. Write the request map in the "What I Learned" notes (or discuss it in chat).

**Learn:**

- NestJS module system
- Controller → Service pattern
- How `main.ts` bootstraps the application
- How Prisma is injected, not imported ad hoc in every file

**Done when:**

- You can explain `GET /health` without guessing
- You can say what we should **not** rewrite yet

**How we verify:**

- You explain the path in your own words
- We agree the existing health/Prisma/Swagger setup is the base, not a throwaway

---

### Task 2 — Environment Configuration And Fail-Fast Validation

**Goal:** The API starts only with valid env, and fails with a clear message when required config is missing.

**Why this task exists:** `PrismaService` already throws if `DATABASE_URL` is missing. The whole app should fail in **one clear place**, and we need a committed template for required variables.

**What we build:** env loading + validation for `DATABASE_URL`, `PORT`, and `NODE_ENV`. `.env.example` for the API.

---

#### Study Before Implementation

Study these ideas **because JWT secrets, Redis URLs, and mail config will join the same system later**:

- What **environment variables** are, and why secrets never go in git.
- Difference between `.env` (local, gitignored) and `.env.example` (template, committed).
- Why apps should **fail at startup** instead of failing on the first request.
- How `@nestjs/config` loads env, and how Joi or Zod can validate it.
- Where this project already reads `.env` (`main.ts` `loadLocalEnv()`, `PrismaService`, `prisma.config.ts`) — we want one consistent approach, not three different ones.

**Read:**

- [NestJS Configuration](https://docs.nestjs.com/techniques/configuration)

**Questions you should answer before we continue:**

1. Why is fail-fast better than a random Prisma error later?
2. What belongs in `.env.example`, and what must never be committed?
3. Should the API start if `PORT` is missing? What default is acceptable?

---

#### Theory

**Configuration is part of the application contract.** If the database URL is missing, the process is not "almost working" — it is misconfigured.

Fail-fast means:

- the process exits (or refuses to listen)
- the error names the missing variable
- you do not discover the problem only when `/health` is called

This is the same idea we will later use for `JWT_SECRET`: never boot an auth API with a missing or weak secret.

---

**Steps:**

1. Add `apps/api/.env.example` with `DATABASE_URL`, `PORT`, `NODE_ENV` (no real secrets).
2. Confirm `.env` is gitignored and `.env.example` is not.
3. Add NestJS config + validation (Joi or Zod — we will pick one and stay consistent).
4. Fail clearly when `DATABASE_URL` is missing or empty.
5. Keep Docker DB settings documented (`docker/.env.example` and compose).

**Learn:**

- Why apps should fail fast on missing config
- `@nestjs/config`
- Difference between runtime env and Docker env

**Done when:**

- Missing `DATABASE_URL` causes a clear startup error
- `.env.example` exists for the API
- Valid `.env` still starts the API and health reports the database

**How we verify:**

- Start with a missing var → clear failure
- Start with valid `.env` → API + `GET /health` work

---

### Task 3 — API Conventions And Swagger As The Product Surface

**Goal:** Stable HTTP conventions: URLs, JSON, Swagger, and no unused NestJS starter endpoints as the "real API".

**Why this task exists:** For many levels, Swagger **is** the UI. Conventions now prevent Auth and Projects from each inventing a different response style.

**What we build:** agreed URL layout, documented health endpoint, cleanup of starter leftovers if we decide they should not be the public API.

---

#### Study Before Implementation

Study these ideas **because every later endpoint will follow this contract**:

- REST basics: resources, HTTP verbs, status codes (`200`, `400`, `401`, `404`).
- Why a **global prefix** (for example `/api`) can help — and the conflict we already have: Swagger is mounted at `/api` today, while health is at `/health`.
- Where **health** should live so later production probes stay simple (`/health` is a common choice, even if business routes live under `/api`).
- What OpenAPI/Swagger is for, and how NestJS decorators document endpoints.
- Why `GET /` returning `"Hello World!"` is starter code, not a Zentra resource.

**Read:**

- [NestJS OpenAPI](https://docs.nestjs.com/openapi/introduction)

**Questions you should answer before we continue:**

1. Why document the API now, before a frontend exists?
2. What should `GET /health` return if PostgreSQL is down?
3. Should Swagger stay at `/api`, move to `/docs`, or should business routes get a prefix? Why?

---

#### Theory

A **REST API** is a contract: URLs, methods, and status codes mean something.

**OpenAPI** is a description of that contract. Swagger UI is a live explorer generated from it.

We do not need a fancy response wrapper in Level 1. We do need:

- predictable paths
- documented endpoints
- JSON for health
- no accidental public starter routes if they confuse the real API

Health is special: production systems ping it to decide if the process is alive. That is why it should stay simple and reliable.

---

**Steps:**

1. Decide URL layout (health vs docs vs future resource routes) and write it down.
2. Apply the decision in `main.ts` / controllers.
3. Make sure health is documented in Swagger.
4. Remove or stop treating `AppController` "Hello World" as a product endpoint, if we agree it is leftover.

**Learn:**

- REST naming and status codes at a basic level
- How Swagger decorators document endpoints
- Why API docs matter while the Backend is the product

**Done when:**

- Swagger UI loads
- Health is documented
- URLs match the written convention
- Starter leftovers are not the public face of Zentra

**How we verify:**

- Open Swagger in the browser
- Call health from Swagger and from HTTP
- `GET /` behavior matches the decision (removed, redirected, or clearly not a resource)

---

### Task 4 — Prisma Client Lifecycle In NestJS

**Goal:** Confirm Prisma connect/disconnect and the generated client are correct. Understand the placeholder model. Do not add product tables yet.

**Why this task exists:** Zentra uses Prisma 7-style **driver adapter** (`@prisma/adapter-pg`). That is easy to copy and hard to understand. Level 2 will add `User` on top of this setup.

**What we build:** a confirmed Prisma lifecycle, not a new domain model.

---

#### Study Before Implementation

Study these ideas **because every later table will migrate through this pipeline**:

- What an **ORM** does, and what Prisma still does not hide (indexes, transactions, SQL).
- The pipeline: `schema.prisma` → **migration** → **Prisma Client**.
- Why this project generates the client into `src/generated/prisma`.
- What `PrismaPg` is doing: Prisma talks to PostgreSQL through the `pg` driver.
- Why `placeholder` exists, and that **User** in Level 2 will be the first real model.
- Why `PrismaService` is a NestJS provider with `onModuleInit` / `onModuleDestroy`.

**Read:**

- [Prisma schema](https://www.prisma.io/docs/orm/prisma-schema)
- [Prisma migrations](https://www.prisma.io/docs/orm/prisma-migrate)
- [Prisma + NestJS recipe](https://docs.nestjs.com/recipes/prisma)

**Questions you should answer before we continue:**

1. What problem does a migration solve that “change the DB by hand” does not?
2. Why is `PrismaService` a NestJS provider, not a random imported singleton in every file?
3. What happens if we forget `$disconnect` when the process shuts down?
4. Why is a placeholder model here instead of an empty schema?

---

#### Theory

An **ORM** (Object-Relational Mapper) lets you work with tables using objects and TypeScript types. Prisma is the ORM.

A **migration** is a recorded SQL change. It is how the team (and production) apply the same schema.

Prisma Client is generated code. That is why the project has `src/generated/prisma` — TypeScript must know the models.

The **adapter** is Prisma’s way of using a standard Node PostgreSQL driver (`pg`) instead of a bundled engine connection. You do not need every Prisma 7 internal detail yet. You do need to know: **no `DATABASE_URL` means no client**.

We keep `placeholder` until Level 2. Removing it now without a real model can make migrations awkward. Replacing it with `User` is the right moment.

---

**Steps:**

1. Read `schema.prisma`, `prisma.config.ts`, and the init migration.
2. Confirm `PrismaService` connect/disconnect and adapter setup.
3. Confirm health still uses `$queryRaw` / `SELECT 1` (or equivalent).
4. Only change code if we find a real lifecycle bug (double connect, missing env, broken disconnect).
5. Note in docs: first real model is `User` in Level 2.

**Learn:**

- Prisma schema and migrations
- NestJS lifecycle hooks for infrastructure
- Why health includes database status

**Done when:**

- You can explain schema → migrate → client → `PrismaService`
- Health still reports `database: "connected"`
- We are not inventing `User` / `Project` tables yet

**How we verify:**

- Restart the API; health shows connected
- You can explain the adapter setup in simple words
- `placeholder` is understood as temporary

---

### Task 5 — Backend Test Runner And Health Tests

**Goal:** Prove the test infrastructure works with tests that actually protect health — not only `"Hello World"`.

**Why this task exists:** Jest already exists, but the current tests cover the starter controller. We want a habit of testing **our** code before Auth.

**What we build:** a unit test for `HealthService` (mock Prisma) and an HTTP test for `GET /health`.

---

#### Study Before Implementation

Study these ideas **because Auth tests in Level 2 will grow from this setup**:

- **Unit test:** one class, dependencies mocked.
- **HTTP / e2e-style test:** real NestJS HTTP layer, closer to a real request.
- How the NestJS testing module replaces `PrismaService` with a mock.
- Why we mock Prisma in a health **unit** test, but will use a real test database later for Auth.
- Where tests live (`*.spec.ts` vs `test/*.e2e-spec.ts`).

**Read:**

- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)

**Questions you should answer before we continue:**

1. Why mock Prisma in a unit test, but not in a later auth integration test?
2. What is the smallest test that still protects the health endpoint?
3. Should a disconnected database make the HTTP test fail, return `status: "error"`, or both?

---

#### Theory

Tests are a safety net, not a score.

For Level 1:

- A **unit test** proves `HealthService` maps “Prisma works” → `{ status: "ok", database: "connected" }` and “Prisma throws” → error/disconnected.
- An **HTTP test** proves the route exists and returns JSON.

We do **not** need coverage percentages, frontend tests, or a huge suite. We need the runner + one meaningful example.

Later, Auth will need a real database. Health can still use a mock for the unit test because the rule is simple.

---

**Steps:**

1. Review existing Jest config and the starter `AppController` tests.
2. Add `HealthService` unit tests with a mocked `PrismaService`.
3. Add an HTTP test for `GET /health`.
4. Decide what to do with `"Hello World"` tests after Task 3 cleanup.
5. Run the API test command and confirm it passes.

**Learn:**

- Where tests live in a NestJS app
- Basic Jest + `@nestjs/testing`
- Why we start testing early

**Done when:**

- API tests pass
- Health has unit coverage for connected + disconnected
- HTTP test covers `GET /health`

**How we verify:**

- Test command is green
- Breaking the health return shape would fail a test

---

### Task 6 — Backend Developer Workflow And Level Wrap-Up

**Goal:** One-command Backend workflows and docs so a developer can go from clone → running API without guessing.

**Why this task exists:** Daily work should be boring and repeatable. We also close Level 1 with architecture notes — Backend only.

**What we build:** root scripts, `docs/SETUP.md`, initial `docs/ARCHITECTURE.md`, README updates.

---

#### Study Before Implementation

Study these ideas **because this repo is a monorepo, and scripts belong at the right level**:

- What `npm workspaces` already does in the root `package.json`.
- Which commands a Backend developer runs every day (install, docker, migrate, start API, test).
- Why we do **not** add `dev:web` as a real workflow until Level 10.
- What belongs in `README.md` (short) vs `SETUP.md` (steps) vs `ARCHITECTURE.md` (how the system is shaped).

**Questions you should answer before we continue:**

1. What is the exact happy-path startup order?
2. Which secrets must the setup guide mention without putting real passwords in git?

There is no extra Theory section here. This task is practical.

---

**Steps:**

1. Add root scripts, for example:
   - `dev:api` — NestJS watch mode
   - `docker:up` / `docker:down`
   - `db:migrate` — Prisma migrate
   - `test:api` — API tests
2. Write `docs/SETUP.md`:
   - clone → `npm install` → copy env files → `docker compose up` → migrate → start API → open Swagger
3. Write `docs/ARCHITECTURE.md` with the current picture:
   - one NestJS API
   - PostgreSQL in Docker
   - Prisma
   - no frontend yet
4. Update root `README.md` (stack, current level, link to setup/roadmap).
5. Run the full Backend check:
   - Docker PostgreSQL up
   - API starts
   - `GET /health` reports database connected
   - Swagger loads
   - tests pass
6. Fill in "What I Learned" below.

**Learn:**

- Developer experience (DX) matters
- How monorepo scripts simplify daily work
- How to document a Backend so future-you can start it cold

**Done when:**

- `SETUP.md` gets a new developer from clone to a running API
- Architecture notes match the repo
- You can explain the project structure to someone else
- Frontend was **not** scaffolded

**How we verify:**

- Follow `SETUP.md` as if you were new
- No undocumented manual steps
- Level 1 expected result checklist is true

---

## Expected Result

After Level 1, the Backend looks like this:

```text
✅ NestJS API running on :3001
✅ PostgreSQL in Docker
✅ Prisma connected with first migration
✅ GET /health → { status: "ok", database: "connected" } (or equivalent)
✅ Swagger docs accessible
✅ Env validation fails fast when required vars are missing
✅ Health unit + HTTP tests pass
✅ SETUP.md for Backend developers
✅ apps/web still a placeholder (no Next.js app)
```

**The product does not have features yet.** It has a professional Backend foundation ready for Level 2 (Identity & Authentication).

---

## What I Learned

> Fill this section after you complete Level 1.

### Concepts I understand now:

- [ ] NestJS modules, controllers, services, and DI
- [ ] How `GET /health` flows through this codebase
- [ ] How Prisma schema, migrations, and the generated client work
- [ ] Why this project uses a Prisma driver adapter
- [ ] Docker Compose for local PostgreSQL
- [ ] Environment variable management and fail-fast config
- [ ] Swagger/OpenAPI documentation
- [ ] Why we test health with a mock in unit tests

### Things that were harder than expected:

_(Write your notes here)_

### Questions I still have:

_(Write your notes here)_

---

## Interview Knowledge

Questions you should be able to answer after this level:

1. **What is Dependency Injection and why does NestJS use it?**
2. **What is the difference between a NestJS module, controller, and service?**
3. **What does an ORM do? Why use Prisma instead of raw SQL for most queries?**
4. **What is a database migration and why is it important?**
5. **What is Docker Compose and why do we use it for local PostgreSQL?**
6. **What is CORS and why is it already enabled if there is no frontend yet?**
7. **What is the difference between `.env` and `.env.example`?**
8. **What is a monorepo and what are its advantages here?**
9. **What is Swagger/OpenAPI used for?**
10. **How does a health check endpoint help in production?**
11. **Why should the API fail at startup when `DATABASE_URL` is missing?**
12. **Why mock Prisma in a health unit test, but use a real database later for auth tests?**

---

## Official Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [NestJS Modules](https://docs.nestjs.com/modules)
- [NestJS Providers & DI](https://docs.nestjs.com/providers)
- [NestJS Configuration](https://docs.nestjs.com/techniques/configuration)
- [NestJS OpenAPI](https://docs.nestjs.com/openapi/introduction)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
- [Prisma schema](https://www.prisma.io/docs/orm/prisma-schema)
- [Prisma migrations](https://www.prisma.io/docs/orm/prisma-migrate)
- [Prisma with NestJS](https://docs.nestjs.com/recipes/prisma)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Next Level Preview

**Level 2 — Identity & Authentication**

We will add the first real model (`User`), registration, login, JWT access tokens, refresh tokens, password hashing, guards, DTOs, and consistent errors.

Still no frontend.

But first — finish Level 1 completely. A Backend you understand is more useful than a Backend you only copied.

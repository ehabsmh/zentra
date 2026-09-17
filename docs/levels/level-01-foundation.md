# Level 1 — Backend Foundation

**Status:** Complete  
**Already done:** Task 1, Task 2, Task 3, Task 4, Task 5, Task 6  
**Previous level:** —  
**Next level:** [Level 2 — Identity & Authentication](./level-02-authentication.md) (not created yet)

This level is finished. Do not restart it. The NestJS API, health check, Prisma, Docker Postgres, Swagger, env validation, health tests, and setup docs are in the repo.

---

## Where You Are

| Task | What it is | Status |
|---|---|---|
| 1 | Understand `GET /health` | **Done** |
| 2 | Env validation + `.env.example` | **Done** |
| 3 | API conventions + remove Hello World | **Done** |
| 4 | Confirm Prisma connect/disconnect | **Done** (no bug found; no schema change) |
| 5 | Health tests | **Done** |
| 6 | Root scripts + `SETUP.md` | **Done** |

Level 1 is finished. Next is Level 2 (Auth). Still no frontend.

---

## Level Goal

A NestJS API you understand, with PostgreSQL, Prisma, Swagger, tests, and a simple way to start it.

No login. No projects. No Next.js. Swagger is the UI for now.

---

## Why This Level Exists

A real Backend starts with structure, not features.

If the health flow, env, and Prisma setup are clear, Auth in Level 2 is just a new module — same pattern.

---

## How Each Task Works

Every task uses the same shape. Nothing extra.

```text
1. Study Outline + Read     → learn only what this task needs
2. AI Prompt (Outline)      → paste it into a new chat, learn item by item
3. Answer the questions     → prove the outline is understood
4. Theory + AI Prompt       → one extra idea, new chat, same teaching style
5. Steps                    → do the work
6. How we verify            → you test it yourself, item by item
```

The Study Outline is the lesson. There is no separate "Learn" list.

Each task has two ready **AI Prompts**. Copy the whole block into a **new chat** (this AI or another). The prompt already contains the task facts, so the teacher should not invent extra work.

Theory is **one** idea (like "what is the event loop?" or "what is the virtual DOM?"). It is not a second course. Skip extra articles once the idea is clear.

---

## Current Repo Status

| Piece | Status |
|---|---|
| npm workspaces (`apps/api`, `apps/web` placeholder) | Done |
| NestJS API on port `3001` | Done |
| `HealthModule` + database check | Done |
| `PrismaService` / `PrismaModule` | Done |
| Docker Compose PostgreSQL (host port `5433`) | Done |
| Swagger UI at `/api` | Done |
| CORS for `http://localhost:3000` | Done (for the future frontend) |
| Env validation (`@nestjs/config` + Zod) | **Done (Task 2)** |
| `apps/api/.env.example` | **Done (Task 2)** |
| Remove NestJS Hello World leftover | **Done (Task 3)** |
| Health unit + HTTP tests | **Done (Task 5)** |
| Root scripts + `docs/SETUP.md` | **Done (Task 6)** |
| Next.js app | **Out of scope** until Level 10 |

---

## What We Build In This Level

| Item | Notes |
|---|---|
| NestJS mental model | Module → Controller → Service → Prisma |
| Env config | Fail-fast on bad/missing env |
| API conventions | Stable URLs, JSON, Swagger |
| Prisma lifecycle | Connect/disconnect confirmed, no `User` table yet |
| Tests | Health unit test + HTTP test |
| Workflow | Root scripts + Backend setup doc |

---

## Technologies

| Technology | Role |
|---|---|
| Node.js + TypeScript | Runtime and types |
| NestJS | API framework |
| PostgreSQL | Database |
| Prisma | ORM + migrations |
| Docker Compose | Local Postgres |
| Swagger | API docs (our UI) |
| Jest | Tests |
| Zod | Env validation (already chosen in Task 2) |

**Not in this level:** Next.js, React, Redis, Auth.

---

## Architecture Decisions

| Decision | Choice | Why |
|---|---|---|
| Repo | Monorepo with `apps/` | One repo, Backend and future web stay separate |
| Backend | NestJS | Modules + DI, good for learning structure |
| Database | PostgreSQL + Prisma | Relational, typed client, migrations |
| Local DB | Docker Compose | Same database on every machine |
| API docs | Swagger at `/api` | Interactive docs while there is no frontend |
| API port | `3001` | Leaves `3000` free for later |
| DB port | host `5433` → container `5432` | Avoids a local Postgres on `5432` |
| Frontend | Level 10 | Backend-first |
| Redis | Later | No queue/cache need yet |

### Locked URLs for Level 1

```text
GET /health  → health JSON
GET /api     → Swagger UI
GET /        → not a product route (remove Hello World in Task 3)
```

Health stays at `/health` so later production probes stay simple. We do **not** add a global `/api` prefix in Level 1.

### Target Folder Structure

```text
zentra/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── config/env.validation.ts
│   │   │   ├── health/
│   │   │   └── prisma/
│   │   ├── prisma/
│   │   ├── test/
│   │   ├── .env.example
│   │   └── package.json
│   └── web/                 # placeholder until Level 10
├── docker/
│   └── docker-compose.yml
├── docs/
│   ├── ROADMAP.md
│   ├── SETUP.md             # Task 6
│   ├── ARCHITECTURE.md      # Task 6
│   └── levels/level-01-foundation.md
├── package.json
└── README.md
```

---

## Ordered Tasks

Do them in order. All six tasks are done.

---

### Task 1 — Understand The Existing NestJS API

**Status:** Done  
**Goal:** Explain how `GET /health` works in this repo.  
**What we built:** No new feature. A mental model of the request flow.

You already mapped this in chat. Keep it as the base. Do not rewrite health, Prisma, or Swagger.

---

#### Study Outline

Study these, in order, with an AI or any source. This is enough for this task.

1. What a NestJS **module**, **controller**, and **service** each do
2. How **Dependency Injection** works (constructor injection — NestJS creates the class, you do not write `new`)
3. The request path: `GET /health` → controller → service → Prisma → JSON

**Read:**

- [NestJS Modules](https://docs.nestjs.com/modules)
- [NestJS Providers](https://docs.nestjs.com/providers)
- [NestJS Controllers](https://docs.nestjs.com/controllers)
- [Prisma + NestJS recipe](https://docs.nestjs.com/recipes/prisma)

**Questions you should answer before we continue:**

1. What is the difference between a module, a controller, and a service?
2. Who creates `PrismaService` — you or NestJS?
3. Why does health check the database, not only return `"ok"`?
4. What does `main.ts` do that `AppModule` does not?

**AI Prompt (Study Outline):** copy everything inside the box into a new chat.

```text
You are a senior engineer teaching a junior full-stack developer.

Student: Ehab.
Stack he already knows: JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB.
English: B1–B2. Use simple English. If you use a technical word, explain it in one short sentence first.

This is a TEACHING chat. Do not write or edit project code unless the student asks.

Project (keep this small, do not expand it):
- Name: Zentra
- Level 1, Task 1 — understand the existing NestJS API
- Backend only. No frontend, no Auth, no Redis in this task
- The API already exists. The student must understand it, not rebuild it

Task goal:
The student must clearly understand how GET /health works in this repo, so they can later copy the same pattern (module → controller → service).

Facts about THIS repo (use these, do not invent a different structure):
- apps/api/src/main.ts starts the NestJS process: CORS, Swagger, listen on a port
- apps/api/src/app.module.ts is the root module. It imports HealthModule and PrismaModule
- HealthController handles GET /health and calls HealthService
- HealthService injects PrismaService and checks the database with a simple query (SELECT 1)
- Success JSON: { "status": "ok", "database": "connected" }
- Failure JSON: { "status": "error", "database": "disconnected" }
- PrismaModule is @Global() and exports PrismaService
- NestJS creates PrismaService. HealthService does not write new PrismaService()

Your job:
Teach the Study Outline below, ONE item at a time, in order.

Rules:
- Only explain what the student needs for the current outline item
- Short and clear. No history, no extra topics, no future features
- Do not dump docs, options, or advanced cases
- Do not teach implementation steps unless the student asks
- Do not skip items. Do not merge items
- For each item use this structure:
  1. What it is
  2. Why it exists (the problem it solves)
  3. How it works (one small example or tiny diagram if useful)
  4. What I must remember
- After each item, ask 1 short check question. Wait for the answer before the next item
- If the student says "next", continue. If they say "again", explain the same item simpler
- After the LAST outline item, do NOT give the answers. Ask the student to answer these in their own words:
  1. What is the difference between a module, a controller, and a service?
  2. Who creates PrismaService — you or NestJS?
  3. Why does health check the database, not only return "ok"?
  4. What does main.ts do that AppModule does not?
- If an answer is weak or wrong, correct it gently in simple English, then continue

Study Outline to teach:
1. What a NestJS module, controller, and service each do
2. How Dependency Injection works (constructor injection — NestJS creates the class, you do not write new)
3. The request path: GET /health → controller → service → Prisma → JSON

Start with item 1 now.
```

---

#### Theory

One idea only. Any article, video, or AI is fine. Stop when the idea is clear.

- **Dependency Injection:** why a framework creates your objects and passes them in, instead of you writing `new`

**AI Prompt (Theory):** copy everything inside the box into a new chat.

```text
You are a senior engineer teaching a junior full-stack developer.

Student: Ehab.
Stack he already knows: JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB.
English: B1–B2. Use simple English. If you use a technical word, explain it in one short sentence first.

This is a TEACHING chat about ONE theory. Do not write project code unless the student asks.

Project context (do not expand):
- Zentra Level 1, Task 1
- NestJS API. The student just learned: controller → service, and NestJS injects PrismaService into HealthService
- No Auth, no frontend, no extra NestJS features

Theory to teach (this is the whole lesson):
Dependency Injection — why a framework creates your objects and passes them in, instead of you writing new.

Your job:
Teach this ONE theory in small pieces, ONE piece at a time, in this order:

1. The problem: if every class does new OtherClass(), the code is hard to change and hard to test
2. The idea: another part of the system creates the object and gives it to you (that is Dependency Injection)
3. How NestJS does the idea: you list the dependency in the constructor, NestJS creates it and passes it in
4. What to remember for Zentra: HealthService asks for PrismaService; NestJS provides the same shared instance

Rules:
- Stay inside this theory. Do not teach modules vs controllers vs services again unless needed for one sentence
- Do not teach other NestJS topics (guards, pipes, middleware, custom providers)
- Short and clear. No history, no advanced DI containers
- For each piece use:
  1. What it is
  2. Why it exists (the problem it solves)
  3. How it works (one small example or tiny diagram if useful)
  4. What I must remember
- After each piece, ask 1 short check question. Wait for the answer
- If the student says "next", continue. If they say "again", explain the same piece simpler
- After the last piece, ask the student to explain Dependency Injection in 4–5 sentences, using HealthService and PrismaService
- Do not give that final explanation for them first

Start with piece 1 now.
```

---

**Steps (already done):**

1. Read `apps/api/src/main.ts`
2. Read `apps/api/src/app.module.ts`
3. Read `health/` (controller, service, module)
4. Read `prisma/` (`PrismaService`, `PrismaModule`)
5. Call `GET /health` and match the JSON to `HealthService.checkHealth()`

**How we verify:**

You can re-run this any time. You already passed it.

- [x] Docker Postgres is up
- [x] API starts from `apps/api` with `npm run start:dev`
- [x] `GET http://localhost:3001/health` returns JSON like `{ "status": "ok", "database": "connected" }`
- [x] You can name the path in order: `main.ts` → `AppModule` → `HealthController` → `HealthService` → `PrismaService` → JSON
- [x] You can say: NestJS creates `PrismaService`; you inject it; you do not write `new PrismaService()` in the health service
- [x] You can say: `main.ts` starts the HTTP process (CORS, Swagger, port); `AppModule` only lists which features exist

---

### Task 2 — Environment Configuration And Fail-Fast Validation

**Status:** Done  
**Goal:** The API starts only with valid env. It fails with a clear message if required config is missing.  
**What we built:** `@nestjs/config` + Zod in `apps/api/src/config/env.validation.ts`, plus `apps/api/.env.example`.

`PORT` and `NODE_ENV` have defaults. `DATABASE_URL` does not. That was the locked design.

---

#### Study Outline

Study these, in order, with an AI or any source. This is enough for this task.

1. What **environment variables** are, and why secrets never go in git
2. `.env` (local, gitignored) vs `.env.example` (template, committed)
3. **Fail-fast:** stop at startup if required config is missing, do not wait for the first request
4. How `@nestjs/config` + a validate function work in NestJS

**Read:**

- [NestJS Configuration](https://docs.nestjs.com/techniques/configuration)

**Questions you should answer before we continue:**

1. Why is fail-fast better than a random Prisma error later?
2. What belongs in `.env.example`, and what must never be committed?
3. Should the API start if `PORT` is missing? What default is acceptable?

**AI Prompt (Study Outline):** copy everything inside the box into a new chat.

```text
You are a senior engineer teaching a junior full-stack developer.

Student: Ehab.
Stack he already knows: JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB.
English: B1–B2. Use simple English. If you use a technical word, explain it in one short sentence first.

This is a TEACHING chat. Do not write or edit project code unless the student asks.

Project (keep this small, do not expand it):
- Name: Zentra
- Level 1, Task 2 — environment configuration and fail-fast validation
- Backend only. NestJS API + PostgreSQL + Prisma
- No frontend, no Auth, no Redis

Task goal:
The student must understand why the API should start only with valid env, and fail with a clear message if required config is missing.

Locked design for THIS task (do not reopen debates):
- Required variables: DATABASE_URL, PORT, NODE_ENV
- DATABASE_URL has no default. If it is missing or empty, the app must fail at startup
- PORT may default to 3001
- NODE_ENV may default to "development"
- .env holds real local values and is gitignored
- .env.example is a template with fake/example values and IS committed
- NestJS loads env with @nestjs/config and validates with a function (this project uses Zod)
- Validation must use the config object Nest passes in, not a random early read of process.env

Facts about THIS repo:
- Prisma also needs DATABASE_URL, but config validation is the app contract: fail in one clear place at startup
- main.ts should read PORT from ConfigService after validation succeeds
- Docker Postgres settings are separate from the API .env (do not mix them in this lesson)

Your job:
Teach the Study Outline below, ONE item at a time, in order.

Rules:
- Only explain what the student needs for the current outline item
- Short and clear. No history, no extra topics, no future secrets like JWT_SECRET
- Do not dump docs, Joi vs Zod comparisons, or advanced ConfigModule options
- Do not teach implementation steps unless the student asks
- Do not skip items. Do not merge items
- For each item use:
  1. What it is
  2. Why it exists (the problem it solves)
  3. How it works (one small example or tiny diagram if useful)
  4. What I must remember
- After each item, ask 1 short check question. Wait for the answer before the next item
- If the student says "next", continue. If they say "again", explain the same item simpler
- After the LAST outline item, do NOT give the answers. Ask the student to answer these in their own words:
  1. Why is fail-fast better than a random Prisma error later?
  2. What belongs in .env.example, and what must never be committed?
  3. Should the API start if PORT is missing? What default is acceptable?
- If an answer is weak or wrong, correct it gently in simple English, then continue

Study Outline to teach:
1. What environment variables are, and why secrets never go in git
2. .env (local, gitignored) vs .env.example (template, committed)
3. Fail-fast: stop at startup if required config is missing, do not wait for the first request
4. How @nestjs/config + a validate function work in NestJS

Start with item 1 now.
```

---

#### Theory

One idea only. Any article, video, or AI is fine. Stop when the idea is clear.

- **Fail-fast configuration:** why a program should refuse to start when required settings are missing, instead of failing later in a random place

**AI Prompt (Theory):** copy everything inside the box into a new chat.

```text
You are a senior engineer teaching a junior full-stack developer.

Student: Ehab.
Stack he already knows: JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB.
English: B1–B2. Use simple English. If you use a technical word, explain it in one short sentence first.

This is a TEACHING chat about ONE theory. Do not write project code unless the student asks.

Project context (do not expand):
- Zentra Level 1, Task 2
- NestJS API needs DATABASE_URL to talk to PostgreSQL
- The student is learning why missing config should stop the process at startup

Theory to teach (this is the whole lesson):
Fail-fast configuration — why a program should refuse to start when required settings are missing, instead of failing later in a random place.

Your job:
Teach this ONE theory in small pieces, ONE piece at a time, in this order:

1. What configuration means (settings that change by machine, not by rewriting code)
2. The late-failure problem: the app looks "started", then a later error looks like a database/code bug
3. The fail-fast idea: check required settings at the beginning; if they are wrong, stop and name the problem
4. What to remember for Zentra: missing DATABASE_URL should fail at startup with a clear env error, not during GET /health

Rules:
- Stay inside this theory. Do not teach Zod syntax, Docker, or Prisma adapters
- Short and clear. No 12-factor essays or extra config libraries
- For each piece use:
  1. What it is
  2. Why it exists (the problem it solves)
  3. How it works (one small example or tiny diagram if useful)
  4. What I must remember
- After each piece, ask 1 short check question. Wait for the answer
- If the student says "next", continue. If they say "again", explain the same piece simpler
- After the last piece, ask the student to explain fail-fast configuration in 4–5 sentences, using DATABASE_URL and GET /health
- Do not give that final explanation for them first

Start with piece 1 now.
```

---

**Steps (already done):**

1. Added `apps/api/.env.example` with `DATABASE_URL`, `PORT`, `NODE_ENV`
2. Confirmed `.env` is gitignored and `.env.example` is not
3. Wired `ConfigModule.forRoot({ validate: validateEnv })` in `AppModule`
4. `validateEnv` parses the config Nest passes in, throws a clear error, returns parsed data
5. `main.ts` reads `PORT` from `ConfigService`

**How we verify:**

You can re-run this any time. You already passed it.

- [x] `apps/api/.env.example` exists and has `DATABASE_URL`, `PORT`, `NODE_ENV` (no real password)
- [x] `.env` is gitignored; `.env.example` is not
- [x] With a valid `apps/api/.env`, the API starts and `GET /health` still works
- [x] If `DATABASE_URL` is missing or empty, the process fails **before** it listens
- [x] The error text mentions the env problem (not a random Prisma query error)
- [x] If `PORT` is omitted, the API still starts on `3001` (Zod default)

---

### Task 3 — API Conventions And Swagger As The Product Surface

**Status:** Done  
**Goal:** One URL layout, Swagger as the UI, and no Hello World as the public API.  
**What we build:** Small cleanup. Swagger and health docs **already exist**.

Locked (do not reopen this debate):

- `GET /health` — health JSON
- `GET /api` — Swagger UI
- `GET /` — not a product route (remove Hello World)

---

#### Study Outline

Study these, in order, with an AI or any source. This is enough for this task.

1. REST basics: a URL + HTTP method is a contract (`GET /health` means "tell me if the API is ok")
2. Common status codes: `200`, `400`, `404`
3. What Swagger / OpenAPI is: docs generated from the API, so you can try endpoints in the browser

**Read:**

- [NestJS OpenAPI](https://docs.nestjs.com/openapi/introduction)

**Questions you should answer before we continue:**

1. Why document the API now, before a frontend exists?
2. What should `GET /health` return if PostgreSQL is down?
3. Why does health stay at `/health`, not inside Swagger's `/api` path?

**AI Prompt (Study Outline):** copy everything inside the box into a new chat.

```text
You are a senior engineer teaching a junior full-stack developer.

Student: Ehab.
Stack he already knows: JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB.
English: B1–B2. Use simple English. If you use a technical word, explain it in one short sentence first.

This is a TEACHING chat. Do not write or edit project code unless the student asks.

Project (keep this small, do not expand it):
- Name: Zentra
- Level 1, Task 3 — API conventions and Swagger as the product surface
- Backend only. There is no frontend yet. Swagger is the UI for now
- No Auth, no global /api prefix for business routes in this task

Task goal:
The student must understand a small, locked URL layout, why Swagger matters now, and why Hello World is not the public API.

Locked URLs (do not reopen this debate, do not offer alternatives):
- GET /health → health JSON
- GET /api → Swagger UI
- GET / → not a product route (Hello World must be removed)
- Health stays at /health so later production probes stay simple

Facts about THIS repo:
- Health already exists and is already documented in Swagger
- HealthService returns JSON. If the database works: { "status": "ok", "database": "connected" }
- If the database fails: { "status": "error", "database": "disconnected" } — the process should not crash
- NestJS starter still has GET / → "Hello World!" via AppController / AppService. That is leftover, not a Zentra resource
- This task is cleanup + understanding, not a new feature

Your job:
Teach the Study Outline below, ONE item at a time, in order.

Rules:
- Only explain what the student needs for the current outline item
- Short and clear. No history, no extra topics, no REST debates (no GraphQL, no versioning, no /api/v1)
- Do not dump OpenAPI decorator lists
- Do not teach implementation steps unless the student asks
- Do not skip items. Do not merge items
- For each item use:
  1. What it is
  2. Why it exists (the problem it solves)
  3. How it works (one small example or tiny diagram if useful)
  4. What I must remember
- After each item, ask 1 short check question. Wait for the answer before the next item
- If the student says "next", continue. If they say "again", explain the same item simpler
- After the LAST outline item, do NOT give the answers. Ask the student to answer these in their own words:
  1. Why document the API now, before a frontend exists?
  2. What should GET /health return if PostgreSQL is down?
  3. Why does health stay at /health, not inside Swagger's /api path?
- If an answer is weak or wrong, correct it gently in simple English, then continue

Study Outline to teach:
1. REST basics: a URL + HTTP method is a contract (GET /health means "tell me if the API is ok")
2. Common status codes: 200, 400, 404
3. What Swagger / OpenAPI is: docs generated from the API, so you can try endpoints in the browser

Start with item 1 now.
```

---

#### Theory

One idea only. Any article, video, or AI is fine. Stop when the idea is clear.

- **REST as a contract:** URLs, HTTP methods, and status codes mean something. Clients depend on that meaning.

**AI Prompt (Theory):** copy everything inside the box into a new chat.

```text
You are a senior engineer teaching a junior full-stack developer.

Student: Ehab.
Stack he already knows: JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB.
English: B1–B2. Use simple English. If you use a technical word, explain it in one short sentence first.

This is a TEACHING chat about ONE theory. Do not write project code unless the student asks.

Project context (do not expand):
- Zentra Level 1, Task 3
- Locked: GET /health is health JSON, GET /api is Swagger UI
- Later a frontend or other tools will call these URLs. They must mean the same thing every time

Theory to teach (this is the whole lesson):
REST as a contract — URLs, HTTP methods, and status codes mean something. Clients depend on that meaning.

Your job:
Teach this ONE theory in small pieces, ONE piece at a time, in this order:

1. What a contract means here: both sides agree what a request and response mean
2. URLs + HTTP methods as the contract (GET /health is a question, not a random string)
3. Status codes as part of the contract (200 vs 404 vs 400)
4. What happens if we change the contract without care: clients break, Swagger lies, debugging gets confusing

Rules:
- Stay inside this theory. Do not teach full REST resource design, pagination, or Auth status 401 except one short mention if needed for 400 vs 404
- Do not compare REST vs GraphQL
- Short and clear
- For each piece use:
  1. What it is
  2. Why it exists (the problem it solves)
  3. How it works (one small example or tiny diagram if useful)
  4. What I must remember
- After each piece, ask 1 short check question. Wait for the answer
- If the student says "next", continue. If they say "again", explain the same piece simpler
- After the last piece, ask the student to explain "REST as a contract" in 4–5 sentences, using GET /health
- Do not give that final explanation for them first

Start with piece 1 now.
```

---

**Steps:**

1. Keep `GET /health` and Swagger at `/api`. Do not add a global prefix in this task.
2. Confirm health is listed in Swagger (it already has `@ApiTags` / `@ApiOperation`).
3. Remove the NestJS starter `GET /` Hello World (`AppController` / `AppService` and their imports from `AppModule`).
4. Remove or update the starter tests that expect `"Hello World!"`, so `npm test` is not red after this task.

**How we verify:**

Do these yourself, in order. Check each line.

**A. App is up**

- [x] From the repo root: `docker compose -f docker/docker-compose.yml up -d`
- [x] From `apps/api`: `npm run start:dev`
- [x] The terminal shows the API is listening on port `3001`

**B. Swagger**

- [x] Open `http://localhost:3001/api` in the browser — Swagger UI loads
- [x] A **health** endpoint is visible in the list
- [x] From Swagger, execute `GET /health`
- [x] The response body is JSON with `status` and `database`

**C. HTTP**

- [x] `GET http://localhost:3001/health` returns the same JSON (browser, Thunder Client, or `curl`)
- [x] If the database is connected, you see `"status": "ok"` and `"database": "connected"`

**D. Hello World is gone**

- [x] `GET http://localhost:3001/` is **not** `"Hello World!"`
- [x] `AppController` and `AppService` are gone from `AppModule`
- [x] Starter tests that expected Hello World are gone or updated

**E. Health still behaves when the DB is down (optional but useful)**

- [x] Stop Postgres: `docker compose -f docker/docker-compose.yml stop postgres`
- [x] `GET /health` still returns JSON (for example `"status": "error"`, `"database": "disconnected"`)
- [x] The API process does not crash
- [x] Start Postgres again: `docker compose -f docker/docker-compose.yml start postgres`

---

### Task 4 — Prisma Client Lifecycle In NestJS

**Status:** Done (confirmed existing code; no rebuild)  
**Goal:** Confirm connect/disconnect and the generated client. Understand `placeholder`. Do not add `User` yet.  
**What we build:** Understanding + a fix only if you find a real bug.

---

#### Study Outline

Study these, in order, with an AI or any source. This is enough for this task.

1. What an **ORM** is (talk to the database with objects/types, not only raw SQL)
2. The Prisma pipeline: `schema.prisma` → **migration** → **Prisma Client**
3. NestJS lifecycle: `onModuleInit` / `onModuleDestroy` for connect and disconnect

**Read:**

- [Prisma schema](https://www.prisma.io/docs/orm/prisma-schema)
- [Prisma migrations](https://www.prisma.io/docs/orm/prisma-migrate)
- [Prisma + NestJS recipe](https://docs.nestjs.com/recipes/prisma)

**Questions you should answer before we continue:**

1. What problem does a migration solve that changing the DB by hand does not?
2. Why is `PrismaService` a NestJS provider, not `new PrismaClient()` in every file?
3. Why is there a `placeholder` model instead of an empty schema?

**AI Prompt (Study Outline):** copy everything inside the box into a new chat.

```text
You are a senior engineer teaching a junior full-stack developer.

Student: Ehab.
Stack he already knows: JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB.
English: B1–B2. Use simple English. If you use a technical word, explain it in one short sentence first.

This is a TEACHING chat. Do not write or edit project code unless the student asks. This task is mostly confirm-and-understand.

Project (keep this small, do not expand it):
- Name: Zentra
- Level 1, Task 4 — Prisma client lifecycle in NestJS
- Backend only. PostgreSQL in Docker. Prisma is already wired
- Do not add User, Project, or Task tables. That is a later level

Task goal:
The student must understand schema → migration → Prisma Client → PrismaService connect/disconnect, and why a placeholder model exists.

Facts about THIS repo (use these):
- apps/api/prisma/schema.prisma defines models. There is a temporary model named placeholder
- Migrations live in apps/api/prisma/migrations (SQL history)
- Prisma Client is generated into apps/api/src/generated/prisma
- PrismaService extends the generated PrismaClient
- PrismaService uses a driver adapter called PrismaPg to talk to PostgreSQL. Mention it in one sentence only. Do not teach Prisma 7 internals
- onModuleInit calls $connect. onModuleDestroy calls $disconnect
- PrismaModule is @Global() and exports PrismaService, so HealthService can inject it
- Health still checks the database with $queryRaw / SELECT 1
- Change code only if there is a real lifecycle bug. Do not rebuild Prisma

Your job:
Teach the Study Outline below, ONE item at a time, in order.

Rules:
- Only explain what the student needs for the current outline item
- Short and clear. No history of ORMs, no raw SQL deep dive, no extra Prisma features (relations, transactions, indexes) beyond what the outline needs
- Do not dump schema field types
- Do not teach implementation steps unless the student asks
- Do not skip items. Do not merge items
- For each item use:
  1. What it is
  2. Why it exists (the problem it solves)
  3. How it works (one small example or tiny diagram if useful)
  4. What I must remember
- After each item, ask 1 short check question. Wait for the answer before the next item
- If the student says "next", continue. If they say "again", explain the same item simpler
- After the LAST outline item, do NOT give the answers. Ask the student to answer these in their own words:
  1. What problem does a migration solve that changing the DB by hand does not?
  2. Why is PrismaService a NestJS provider, not new PrismaClient() in every file?
  3. Why is there a placeholder model instead of an empty schema?
- If an answer is weak or wrong, correct it gently in simple English, then continue

Study Outline to teach:
1. What an ORM is (talk to the database with objects/types, not only raw SQL)
2. The Prisma pipeline: schema.prisma → migration → Prisma Client
3. NestJS lifecycle: onModuleInit / onModuleDestroy for connect and disconnect

Start with item 1 now.
```

---

#### Theory

One idea only. Any article, video, or AI is fine. Stop when the idea is clear.

- **What an ORM is:** why we map tables to objects, and why we still keep SQL migrations as history

**AI Prompt (Theory):** copy everything inside the box into a new chat.

```text
You are a senior engineer teaching a junior full-stack developer.

Student: Ehab.
Stack he already knows: JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB.
English: B1–B2. Use simple English. If you use a technical word, explain it in one short sentence first.

This is a TEACHING chat about ONE theory. Do not write project code unless the student asks.

Project context (do not expand):
- Zentra Level 1, Task 4
- We use Prisma with PostgreSQL
- The student knows MongoDB. You may contrast documents vs tables in one short sentence if it helps, then return to Prisma/SQL
- No User model yet

Theory to teach (this is the whole lesson):
What an ORM is — why we map tables to objects, and why we still keep SQL migrations as history.

Your job:
Teach this ONE theory in small pieces, ONE piece at a time, in this order:

1. The database has tables and rows. App code likes objects and types
2. What an ORM does: it maps between those two worlds (Prisma is the ORM here)
3. Why we still need migrations: the real database must change in a recorded, repeatable way for every machine
4. What to remember for Zentra: schema describes models, migration changes the database, Prisma Client is generated code we use in NestJS

Rules:
- Stay inside this theory. Do not teach Prisma queries, relations, or the PrismaPg adapter beyond one sentence if the student asks
- Do not say "never write SQL". Health already uses a tiny raw query. That is fine
- Short and clear
- For each piece use:
  1. What it is
  2. Why it exists (the problem it solves)
  3. How it works (one small example or tiny diagram if useful)
  4. What I must remember
- After each piece, ask 1 short check question. Wait for the answer
- If the student says "next", continue. If they say "again", explain the same piece simpler
- After the last piece, ask the student to explain ORM + migrations in 4–5 sentences, using Prisma
- Do not give that final explanation for them first

Start with piece 1 now.
```

---

**Steps:**

1. Read `apps/api/prisma/schema.prisma`, `apps/api/prisma.config.ts`, and the init migration.
2. Read `PrismaService`: adapter (`PrismaPg`), `$connect`, `$disconnect`.
3. Confirm health still uses `$queryRaw` / `SELECT 1`.
4. Change code only if you find a real bug (double connect, missing env, broken disconnect).
5. Do **not** add `User` / `Project` tables. That is Level 2.

You will see `PrismaPg` in `PrismaService`. That is how this Prisma version talks to PostgreSQL. You do not need every Prisma 7 internal detail.

**How we verify:**

Do these yourself, in order. Check each line.

**A. Database + API**

- [x] Postgres is running (`docker compose -f docker/docker-compose.yml ps` — `postgres` is up)
- [x] API starts with a valid `DATABASE_URL`
- [x] `GET http://localhost:3001/health` returns `"database": "connected"`

**B. Restart**

- [x] Stop the API, start it again
- [x] `GET /health` still returns `"database": "connected"` (no leftover broken connection)

**C. You can explain it**

- [x] You can say, in your own words: schema → migration → generated client → `PrismaService`
- [x] You can say: `onModuleInit` connects, `onModuleDestroy` disconnects
- [x] You can say: `placeholder` is temporary, and `User` comes in Level 2
- [x] `src/generated/prisma` exists after Prisma generate (you do not invent models by hand there)

**D. No extra product tables**

- [x] `schema.prisma` still has no `User` / `Project` / `Task` models

---

### Task 5 — Backend Test Runner And Health Tests

**Status:** Done  
**Goal:** Tests that protect health, not only `"Hello World"`.  
**What we build:** one unit test for `HealthService` (mock Prisma) and one HTTP test for `GET /health`.

---

#### Study Outline

Study these, in order, with an AI or any source. This is enough for this task.

1. **Unit test:** test one class; replace Prisma with a fake (mock)
2. **HTTP test:** send a real request to the NestJS app and check the JSON
3. Where NestJS tests live: `*.spec.ts` next to code, and `test/*.e2e-spec.ts` for HTTP tests

**Read:**

- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)

**Questions you should answer before we continue:**

1. Why mock Prisma in a health unit test, but use a real database later for auth tests?
2. What is the smallest test that still protects `GET /health`?
3. If Prisma throws, what should the unit test expect from `checkHealth()`?

**AI Prompt (Study Outline):** copy everything inside the box into a new chat.

```text
You are a senior engineer teaching a junior full-stack developer.

Student: Ehab.
Stack he already knows: JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB.
English: B1–B2. Use simple English. If you use a technical word, explain it in one short sentence first.

This is a TEACHING chat. Do not write the tests unless the student asks. First they must understand what to test and why.

Project (keep this small, do not expand it):
- Name: Zentra
- Level 1, Task 5 — backend test runner and health tests
- NestJS API. Jest is already in the API app
- Current tests still cover NestJS "Hello World". That is the wrong target after Hello World is removed
- No frontend tests. No coverage percentage goals. No Auth tests in this task

Task goal:
The student must understand a unit test for HealthService (mock Prisma) and an HTTP test for GET /health, so they can write small tests that actually protect health.

Facts about THIS repo:
- HealthService.checkHealth():
  - if Prisma $queryRaw works → { status: "ok", database: "connected" }
  - if Prisma throws → { status: "error", database: "disconnected" }
- Unit test: mock PrismaService. Docker does not need to be up to prove this mapping
- HTTP test: send GET /health to the NestJS HTTP layer and check JSON
- In NestJS, unit specs are often *.spec.ts next to the code. HTTP/e2e tests are often test/*.e2e-spec.ts
- Later Auth tests should use a real test database because auth rules depend on real saved users. Do not teach Auth, only this contrast
- Smallest useful protection: the health JSON shape and the connected vs disconnected mapping, plus the route existing

Your job:
Teach the Study Outline below, ONE item at a time, in order.

Rules:
- Only explain what the student needs for the current outline item
- Short and clear. No testing pyramid essays, no mocks vs stubs vs spies, no coverage tools
- Do not dump Jest config
- Do not teach implementation steps unless the student asks
- Do not skip items. Do not merge items
- For each item use:
  1. What it is
  2. Why it exists (the problem it solves)
  3. How it works (one small example or tiny diagram if useful)
  4. What I must remember
- After each item, ask 1 short check question. Wait for the answer before the next item
- If the student says "next", continue. If they say "again", explain the same item simpler
- After the LAST outline item, do NOT give the answers. Ask the student to answer these in their own words:
  1. Why mock Prisma in a health unit test, but use a real database later for auth tests?
  2. What is the smallest test that still protects GET /health?
  3. If Prisma throws, what should the unit test expect from checkHealth()?
- If an answer is weak or wrong, correct it gently in simple English, then continue

Study Outline to teach:
1. Unit test: test one class; replace Prisma with a fake (mock)
2. HTTP test: send a real request to the NestJS app and check the JSON
3. Where NestJS tests live: *.spec.ts next to code, and test/*.e2e-spec.ts for HTTP tests

Start with item 1 now.
```

---

#### Theory

One idea only. Any article, video, or AI is fine. Stop when the idea is clear.

- **Unit test vs HTTP test:** a unit test checks one piece with fakes; an HTTP test checks the real URL and response

**AI Prompt (Theory):** copy everything inside the box into a new chat.

```text
You are a senior engineer teaching a junior full-stack developer.

Student: Ehab.
Stack he already knows: JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB.
English: B1–B2. Use simple English. If you use a technical word, explain it in one short sentence first.

This is a TEACHING chat about ONE theory. Do not write project code unless the student asks.

Project context (do not expand):
- Zentra Level 1, Task 5
- We will test HealthService and GET /health
- Prisma is the database tool. In a unit test we can fake it

Theory to teach (this is the whole lesson):
Unit test vs HTTP test — a unit test checks one piece with fakes; an HTTP test checks the real URL and response.

Your job:
Teach this ONE theory in small pieces, ONE piece at a time, in this order:

1. Why tests exist: they fail when we break important behavior
2. Unit test: one class, fake neighbors, fast, checks a rule
3. HTTP test: real request to a URL, checks the route and JSON the client would see
4. What to remember for Zentra: mock Prisma to test HealthService mapping; use an HTTP test to prove GET /health exists and returns JSON

Rules:
- Stay inside this theory. Do not teach e2e browser tests, Playwright, or TDD process
- Do not say one kind is always better. They answer different questions
- Short and clear
- For each piece use:
  1. What it is
  2. Why it exists (the problem it solves)
  3. How it works (one small example or tiny diagram if useful)
  4. What I must remember
- After each piece, ask 1 short check question. Wait for the answer
- If the student says "next", continue. If they say "again", explain the same piece simpler
- After the last piece, ask the student to explain unit test vs HTTP test in 4–5 sentences, using health
- Do not give that final explanation for them first

Start with piece 1 now.
```

---

**Steps:**

1. Look at the current Jest setup and any leftover starter tests.
2. Add `HealthService` unit tests with a mocked `PrismaService`:
   - Prisma works → `{ status: "ok", database: "connected" }`
   - Prisma throws → `{ status: "error", database: "disconnected" }`
3. Add an HTTP test for `GET /health` (JSON body, not `"Hello World!"`).
4. Run the API test command and make it pass.

**How we verify:**

Do these yourself, in order. Check each line.

**A. Tests run**

- [x] From `apps/api`: `npm test` exits with code 0 (green)
- [x] If the project has `npm run test:e2e`, that command is also green (or you folded HTTP tests into `npm test` on purpose)

**B. Unit test**

- [x] There is a spec file for `HealthService`
- [x] Prisma is mocked (the unit test does not need Docker to check the mapping)
- [x] One case: `$queryRaw` succeeds → `ok` / `connected`
- [x] One case: `$queryRaw` throws → `error` / `disconnected`

**C. HTTP test**

- [x] There is a test that `GET /health` returns JSON
- [x] The test checks `status` and `database` exist (and the happy-path values when the test DB is up)

**D. The tests actually protect you**

- [x] Temporarily rename `"connected"` to `"up"` in `HealthService`, run tests — at least one test fails
- [x] Change it back — tests pass again
- [x] There is no test whose only job is `"Hello World!"`

---

### Task 6 — Backend Developer Workflow And Level Wrap-Up

**Status:** Done  
**Goal:** Clone → running API without guessing. Then Level 1 is closed.  
**What we build:** root scripts, `docs/SETUP.md`, `docs/ARCHITECTURE.md`, README update.

---

#### Study Outline

Study these, in order, with an AI or any source. This is enough for this task.

1. What **npm workspaces** means in the root `package.json` (one install, apps inside `apps/`)
2. The happy-path commands: install → docker up → env files → migrate → start API → open Swagger
3. What belongs in `README.md` (short) vs `SETUP.md` (steps) vs `ARCHITECTURE.md` (how the system is shaped)

**Read:**

- [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)
- [Docker Compose overview](https://docs.docker.com/compose/)

**Questions you should answer before we continue:**

1. What is the exact happy-path startup order, from clone to Swagger?
2. Which secrets must the setup guide mention, without putting real passwords in git?

**AI Prompt (Study Outline):** copy everything inside the box into a new chat.

```text
You are a senior engineer teaching a junior full-stack developer.

Student: Ehab.
Stack he already knows: JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB.
English: B1–B2. Use simple English. If you use a technical word, explain it in one short sentence first.

This is a TEACHING chat. Do not write the docs or scripts unless the student asks. First they must understand the workflow.

Project (keep this small, do not expand it):
- Name: Zentra
- Level 1, Task 6 — backend developer workflow and level wrap-up
- This is an npm workspaces monorepo. Apps live under apps/ (api, and a web placeholder)
- Backend only for this level. Do not teach scaffolding Next.js. apps/web stays a placeholder until a much later level

Task goal:
The student must understand how a new developer goes from clone to a running API without guessing, and which file explains which thing.

Locked happy path for THIS repo (teach this order, do not invent extra tools):
1. Clone the repo
2. npm install at the repo root (workspaces)
3. Copy env templates to real .env files (API needs DATABASE_URL, PORT, NODE_ENV)
4. Start PostgreSQL with Docker Compose (docker/docker-compose.yml, host port 5433)
5. Run Prisma migrate for the API
6. Start the NestJS API (port 3001)
7. Open Swagger at http://localhost:3001/api and check GET /health

Docs split (keep this clean):
- README.md = short: what the project is, current level, link to setup
- docs/SETUP.md = exact commands, in order
- docs/ARCHITECTURE.md = how the system is shaped today (one NestJS API, Postgres in Docker, Prisma, no frontend yet)

Secrets:
- Real passwords and real DATABASE_URL stay in .env, never in git
- Setup can say: copy .env.example, fill DATABASE_URL, Postgres user/password live in local env / docker env
- Do not put a real production password in the guide

Root scripts we want the student to understand (names can match the level doc):
- docker:up / docker:down
- db:migrate
- dev:api
- test:api

Your job:
Teach the Study Outline below, ONE item at a time, in order.

Rules:
- Only explain what the student needs for the current outline item
- Short and clear. No CI/CD, no production deploy, no Kubernetes
- Do not dump npm workspaces advanced features
- Do not teach implementation steps unless the student asks
- Do not skip items. Do not merge items
- For each item use:
  1. What it is
  2. Why it exists (the problem it solves)
  3. How it works (one small example or tiny diagram if useful)
  4. What I must remember
- After each item, ask 1 short check question. Wait for the answer before the next item
- If the student says "next", continue. If they say "again", explain the same item simpler
- After the LAST outline item, do NOT give the answers. Ask the student to answer these in their own words:
  1. What is the exact happy-path startup order, from clone to Swagger?
  2. Which secrets must the setup guide mention, without putting real passwords in git?
- If an answer is weak or wrong, correct it gently in simple English, then continue

Study Outline to teach:
1. What npm workspaces means in the root package.json (one install, apps inside apps/)
2. The happy-path commands: install → docker up → env files → migrate → start API → open Swagger
3. What belongs in README.md (short) vs SETUP.md (steps) vs ARCHITECTURE.md (how the system is shaped)

Start with item 1 now.
```

---

#### Theory

One idea only. Any article, video, or AI is fine. Stop when the idea is clear.

- **Developer experience:** a project should start with documented commands. Guessing is not part of the setup.

**AI Prompt (Theory):** copy everything inside the box into a new chat.

```text
You are a senior engineer teaching a junior full-stack developer.

Student: Ehab.
Stack he already knows: JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB.
English: B1–B2. Use simple English. If you use a technical word, explain it in one short sentence first.

This is a TEACHING chat about ONE theory. Do not write project code unless the student asks.

Project context (do not expand):
- Zentra Level 1, Task 6
- The student will add root scripts and SETUP.md so a new developer can start the API
- This is still Backend only

Theory to teach (this is the whole lesson):
Developer experience — a project should start with documented commands. Guessing is not part of the setup.

Your job:
Teach this ONE theory in small pieces, ONE piece at a time, in this order:

1. What developer experience means here: how it feels to start and work in the project
2. The guessing problem: hidden steps live only in one person's head, so the next person gets stuck
3. The fix: named scripts + a setup doc that lists the real order
4. What to remember for Zentra: clone → install → env → docker → migrate → API → Swagger should be written down, not remembered

Rules:
- Stay inside this theory. Do not teach README style guides, documentation generators, or company DX teams
- Short and clear
- For each piece use:
  1. What it is
  2. Why it exists (the problem it solves)
  3. How it works (one small example or tiny diagram if useful)
  4. What I must remember
- After each piece, ask 1 short check question. Wait for the answer
- If the student says "next", continue. If they say "again", explain the same piece simpler
- After the last piece, ask the student to explain developer experience in 4–5 sentences, using SETUP.md and root scripts
- Do not give that final explanation for them first

Start with piece 1 now.
```

---

**Steps:**

1. Add root scripts, for example:
   - `dev:api` — NestJS watch mode
   - `docker:up` / `docker:down`
   - `db:migrate` — Prisma migrate
   - `test:api` — API tests
2. Write `docs/SETUP.md`: clone → `npm install` → copy env files → docker up → migrate → start API → open Swagger
3. Write `docs/ARCHITECTURE.md` for **today**:
   - one NestJS API
   - PostgreSQL in Docker
   - Prisma
   - no frontend yet
4. Update root `README.md` (current level, link to setup)
5. Fill **What I Learned** below
6. Do not scaffold Next.js

**How we verify:**

Do these yourself, in order. Check each line. Pretend you never saw this repo before.

**A. Docs exist**

- [x] `docs/SETUP.md` exists and has a full start path
- [x] `docs/ARCHITECTURE.md` exists and matches the repo (API + Postgres + Prisma, no Next.js app)
- [x] Root `README.md` points to the setup doc and says we are finishing / finished Level 1

**B. Scripts**

- [x] From the repo root, `npm run docker:up` starts Postgres
- [x] From the repo root, `npm run db:migrate` applies Prisma migrations (or the setup doc shows the exact command if it lives in `apps/api`)
- [x] From the repo root, `npm run dev:api` starts the API
- [x] From the repo root, `npm run test:api` runs the API tests and passes

**C. Follow SETUP.md cold**

- [x] A new terminal, following only `SETUP.md`, gets you to a running API
- [x] No extra hidden step (no "also remember to do X" that is missing from the doc)
- [x] `GET http://localhost:3001/health` → `"ok"` + `"connected"`
- [x] `http://localhost:3001/api` opens Swagger
- [x] `apps/web` is still a placeholder (no Next.js app)

**D. Level 1 expected result**

- [x] Every box in **Expected Result** below is true

---

## Expected Result

After Level 1:

```text
✅ NestJS API running on :3001
✅ PostgreSQL in Docker
✅ Prisma connected with first migration
✅ GET /health → { status: "ok", database: "connected" }
✅ Swagger docs at /api
✅ Env validation fails fast when DATABASE_URL is missing
✅ Hello World starter route removed
✅ Health unit + HTTP tests pass
✅ SETUP.md for Backend developers
✅ apps/web still a placeholder (no Next.js app)
```

No product features yet. That is correct. Level 2 adds `User` and auth.

---

## What I Learned

> Fill this after you finish Task 6. Check a box when it is true for you.

### Concepts I understand now:

- [x] NestJS modules, controllers, services, and DI
- [x] How `GET /health` flows through this codebase
- [x] Environment variables and fail-fast config
- [x] How Prisma schema, migrations, and the generated client work
- [x] Why `PrismaService` connects on init and disconnects on destroy
- [x] Docker Compose for local PostgreSQL
- [x] Swagger/OpenAPI as the Backend UI
- [x] Why we mock Prisma in a health unit test

### Things that were harder than expected:

- Prisma Client is generated into `src/generated/prisma` and gitignored, so a fresh clone needs `db:migrate` / `prisma generate` before the API or tests can import it.
- HTTP tests still load `AppModule` (env validation), so they need a dummy `DATABASE_URL` even when Prisma is mocked.

### Questions I still have:

- Level 2: how JWT access tokens, password hashing, and guards will sit next to this same module → controller → service pattern.

---

## Interview Knowledge

After this level you should be able to answer:

1. What is Dependency Injection and why does NestJS use it?
2. What is the difference between a NestJS module, a controller, and a service?
3. What does an ORM do? Why use Prisma instead of raw SQL for most queries?
4. What is a database migration and why is it important?
5. What is Docker Compose and why do we use it for local PostgreSQL?
6. What is CORS and why is it already enabled if there is no frontend yet?
7. What is the difference between `.env` and `.env.example`?
8. What is a monorepo and what are its advantages here?
9. What is Swagger/OpenAPI used for?
10. How does a health check help in production?
11. Why should the API fail at startup when `DATABASE_URL` is missing?
12. Why mock Prisma in a health unit test, but use a real database later for auth tests?

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
- [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)

---

## Next Level Preview

**Level 2 — Identity & Authentication**

First real model (`User`), register, login, JWT, password hashing, guards.

Still no frontend.

Finish Level 1 first. This level is complete — start Level 2 next.

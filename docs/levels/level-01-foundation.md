# Level 1 — Project Foundation & Development Environment

**Status:** Not started  
**Previous level:** —  
**Next level:** [Level 2 — Authentication](./level-02-authentication.md) (not created yet)

---

## Level Goal

Set up a clean, professional project structure and a working development environment where the API, frontend, and database all run together locally.

After this level, you will have a real full-stack skeleton — not features yet, but a solid base to build on.

---

## Why This Level Exists

Every real application starts with structure and tooling, not features.

Before we add authentication, projects, or tasks, we need:

- A place for backend code and frontend code
- A database we can connect to
- A repeatable way to start the whole stack
- Basic conventions so the project stays organized as it grows

This level teaches you **how professional full-stack projects are set up**, not just how to write a single endpoint.

> **Why this matters**
>
> Bad project structure becomes painful after 3–4 features. Good structure from day one makes every future level easier.

---

## What We Build

| Item | Description |
|---|---|
| Repository layout | `apps/api`, `apps/web`, `docker/`, `docs/` |
| NestJS API | Health check endpoint, Swagger docs |
| Next.js frontend | App Router, basic layout, home page |
| PostgreSQL + Prisma | Database connection, first migration (empty or minimal) |
| Docker Compose | PostgreSQL container for local dev |
| Environment config | `.env` files with validation |
| Root tooling | Scripts to run API, web, and DB together |
| Smoke test | One test to prove the test runner works |
| Documentation | Updated README and SETUP guide |

---

## What You Learn

### NestJS

- What a **module** is and why NestJS uses them
- **Controllers** — handle HTTP requests
- **Providers / Services** — business logic
- **Dependency Injection** — how NestJS wires components together
- How the request flows: `Request → Controller → Service → Response`

### Next.js

- App Router folder structure (`app/`, `layout.tsx`, `page.tsx`)
- Server vs client components (basic understanding)
- How the frontend will talk to the API later

### Prisma

- What an ORM is and why we use Prisma
- `schema.prisma` — define models
- Migrations — version-controlled database changes
- Prisma Client — type-safe database queries

### Docker

- What Docker Compose does
- Why we run PostgreSQL in a container
- How `docker-compose up` gives everyone the same database

### General

- Monorepo vs separate repos (and why we chose monorepo)
- Environment variables and why secrets never go in code
- REST API basics and OpenAPI/Swagger documentation

---

## Technologies Involved

| Technology | Role in This Level |
|---|---|
| Node.js | Runtime for API and tooling |
| TypeScript | Type safety across the stack |
| NestJS | Backend API framework |
| Next.js | Frontend framework |
| React | UI library |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | UI component library (basic setup) |
| PostgreSQL | Relational database |
| Prisma | ORM and migrations |
| Docker Compose | Local database container |
| Swagger / OpenAPI | API documentation |

---

## Important Concepts

### 1. Monolith First

We build one API application and one frontend application. They deploy separately but live in one repo.

> **Why we chose this**
>
> Microservices add complexity we do not need yet. A monolith is easier to develop, test, and understand.

> **Why not the simpler alternative?**
>
> A single folder with everything mixed together would work for a tiny script, but becomes messy fast. Separate `apps/api` and `apps/web` keeps concerns clear without over-engineering.

### 2. Dependency Injection (DI)

NestJS creates and injects dependencies for you. A controller receives a service through its constructor — you do not manually create the service.

```typescript
// The controller asks for HealthService — NestJS provides it
constructor(private readonly healthService: HealthService) {}
```

> **Why this matters**
>
> DI makes code testable (you can swap real services with mocks) and keeps components loosely coupled.

### 3. Environment Configuration

Database URLs, ports, and secrets live in `.env` files, not in source code.

- `.env` — local secrets (never committed)
- `.env.example` — template showing required variables (committed)

### 4. Database Migrations

Schema changes are tracked as migration files. This means:

- Every developer gets the same database structure
- Production deployments apply changes safely
- You can roll back if needed

### 5. API Documentation with Swagger

Swagger generates interactive API docs from your code. When we add endpoints later, they appear automatically in the docs.

---

## Architecture Decisions

| Decision | Choice | Reason |
|---|---|---|
| Repo structure | Monorepo with `apps/` | One repo, clear separation, easy to share types later |
| Backend framework | NestJS | Structured modules, DI, great for learning backend architecture |
| Frontend framework | Next.js (App Router) | Modern React, SSR capability, industry standard |
| Database | PostgreSQL | Relational, powerful, great with Prisma |
| ORM | Prisma | Type-safe, good migration workflow, excellent DX |
| Local DB | Docker Compose | Same setup on every machine, no manual PostgreSQL install |
| API docs | Swagger via `@nestjs/swagger` | Auto-generated, interactive, standard |
| Styling | Tailwind + shadcn/ui | Fast development, consistent design system |

### Target Folder Structure (After Level 1)

```
zentra/
├── apps/
│   ├── api/                    # NestJS backend
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   └── health/
│   │   │       ├── health.module.ts
│   │   │       ├── health.controller.ts
│   │   │       └── health.service.ts
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── test/
│   │   ├── .env.example
│   │   └── package.json
│   │
│   └── web/                    # Next.js frontend
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   └── globals.css
│       ├── components/
│       ├── .env.example
│       └── package.json
│
├── docker/
│   └── docker-compose.yml
│
├── docs/
├── package.json                # Root workspace scripts (optional)
└── README.md
```

---

## Ordered Tasks

Complete these tasks in order. Each task builds on the previous one.

---

### Task 1 — Repository Structure & Root Setup

**Goal:** Create the folder layout and root-level configuration.

**Steps:**
1. Create `apps/api/` and `apps/web/` directories
2. Create `docker/` directory
3. Decide on package manager (npm workspaces or separate `package.json` per app — we will use **npm workspaces**)
4. Create root `package.json` with workspace configuration
5. Add root `.gitignore` (node_modules, .env, dist, .next, etc.)
6. Update root `README.md` with project overview and pointer to `docs/`

**Learn:**
- Monorepo workspace concepts
- What belongs at root vs inside each app

**Done when:**
- Folder structure exists
- Root `package.json` defines workspaces
- `.gitignore` covers Node, env files, and build output

---

### Task 2 — Docker Compose for PostgreSQL

**Goal:** Run PostgreSQL locally with one command.

**Steps:**
1. Create `docker/docker-compose.yml` with PostgreSQL service
2. Configure: database name, user, password, port mapping (e.g., `5432:5432`)
3. Add a named volume for data persistence
4. Create `.env.example` at root or in `docker/` with DB connection variables
5. Test: `docker compose up -d` → database is reachable

**Learn:**
- Docker Compose services, volumes, ports
- PostgreSQL connection string format

**Done when:**
- `docker compose up -d` starts PostgreSQL
- You can connect with a DB client (or Prisma later)

---

### Task 3 — NestJS API Bootstrap

**Goal:** Create a running NestJS API with proper module structure.

**Steps:**
1. Scaffold NestJS app inside `apps/api/` (use Nest CLI or manual setup)
2. Understand the generated files: `main.ts`, `app.module.ts`, `app.controller.ts`
3. Create a `HealthModule` with:
   - `HealthController` — `GET /health` returns `{ status: "ok", timestamp: ... }`
   - `HealthService` — contains the health check logic
4. Register `HealthModule` in `AppModule`
5. Enable CORS for local frontend (`http://localhost:3000`)
6. Configure API to run on port `3001` (or similar, to avoid conflict with Next.js)
7. Start the API and verify `GET /health` works

**Learn:**
- NestJS module system
- Controller → Service pattern
- How `main.ts` bootstraps the application
- CORS — why the browser blocks cross-origin requests

**Done when:**
- API runs on `http://localhost:3001`
- `GET /health` returns JSON with status ok

---

### Task 4 — Swagger / OpenAPI Setup

**Goal:** Auto-generated API documentation.

**Steps:**
1. Install `@nestjs/swagger`
2. Configure Swagger in `main.ts` with title, description, version
3. Verify `/api` (or `/docs`) shows Swagger UI
4. Confirm the health endpoint appears in the docs

**Learn:**
- What OpenAPI is
- How decorators document endpoints
- Why API docs matter for frontend and future team members

**Done when:**
- Swagger UI is accessible in the browser
- Health endpoint is documented

---

### Task 5 — Prisma Setup & Database Connection

**Goal:** Connect the API to PostgreSQL through Prisma.

**Steps:**
1. Install Prisma in `apps/api/`
2. Run `prisma init` — creates `schema.prisma` and `.env`
3. Set `DATABASE_URL` in `.env` to point to Docker PostgreSQL
4. Create a minimal schema (e.g., empty or a placeholder model — real models come in Level 2)
5. Run first migration: `prisma migrate dev --name init`
6. Create `PrismaService` as a NestJS provider (injectable)
7. Create `PrismaModule` (global) and import in `AppModule`
8. Update `HealthService` to check database connectivity (e.g., `prisma.$queryRaw` or simple query)
9. Health endpoint returns DB status: `{ status: "ok", database: "connected" }`

**Learn:**
- Prisma schema syntax
- Migration workflow
- How to integrate Prisma with NestJS via a service
- Why health checks should include database status

**Done when:**
- Migration applied successfully
- Health endpoint reports database connection status

---

### Task 6 — Next.js Frontend Bootstrap

**Goal:** Create a running frontend with basic layout.

**Steps:**
1. Scaffold Next.js app inside `apps/web/` (App Router, TypeScript, Tailwind)
2. Set up basic `layout.tsx` with app name and simple navigation placeholder
3. Create home page (`page.tsx`) with welcome message
4. Install and configure shadcn/ui (init + one sample component, e.g., Button)
5. Configure frontend to run on port `3000`
6. Add `.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:3001`
7. On the home page, fetch `GET /health` from the API and display the result
8. Handle loading and error states on the health check display

**Learn:**
- Next.js App Router structure
- Environment variables in Next.js (`NEXT_PUBLIC_` prefix)
- Fetching from an API in a client or server component
- Tailwind CSS basics
- shadcn/ui installation and usage

**Done when:**
- Frontend runs on `http://localhost:3000`
- Home page shows API health status from the backend

---

### Task 7 — Environment Configuration & Validation

**Goal:** Safe, validated environment setup for both apps.

**Steps:**
1. Create `.env.example` for API (DATABASE_URL, PORT, NODE_ENV)
2. Create `.env.example` for web (NEXT_PUBLIC_API_URL)
3. Add env validation in NestJS (e.g., `@nestjs/config` with Joi or Zod)
4. App fails fast on startup if required env vars are missing
5. Document all env vars in `docs/SETUP.md`

**Learn:**
- Why apps should fail fast on missing config
- `@nestjs/config` module
- Difference between server-side and client-side env vars

**Done when:**
- Missing env var causes clear error on startup
- `.env.example` files are committed; `.env` files are gitignored
- `docs/SETUP.md` lists all required variables

---

### Task 8 — Root Scripts & Developer Experience

**Goal:** One-command workflows for daily development.

**Steps:**
1. Add root scripts (in root `package.json`):
   - `dev:api` — start NestJS in watch mode
   - `dev:web` — start Next.js dev server
   - `dev` — start both concurrently (use `concurrently` package)
   - `docker:up` / `docker:down` — manage Docker Compose
   - `db:migrate` — run Prisma migrations
2. Document the full startup flow in `docs/SETUP.md`:
   - Clone repo → copy `.env.example` → `docker compose up` → `npm install` → `npm run dev`

**Learn:**
- Developer experience (DX) matters
- How monorepo scripts simplify daily work

**Done when:**
- `npm run dev` starts API + frontend together
- `docs/SETUP.md` lets a new developer go from clone to running app

---

### Task 9 — Smoke Test

**Goal:** Prove the test infrastructure works.

**Steps:**
1. Configure Jest in the NestJS app (comes with NestJS scaffold)
2. Write one unit test for `HealthService` (e.g., returns status "ok")
3. Run `npm test` — test passes

**Learn:**
- Where tests live in a NestJS app
- Basic Jest syntax
- Why we start testing early (even one test establishes the habit)

**Done when:**
- `npm test` passes with at least one health service test

---

### Task 10 — Documentation & Level Wrap-Up

**Goal:** Document what was built and verify everything works end-to-end.

**Steps:**
1. Update root `README.md` with:
   - Project description
   - Tech stack
   - Quick start (link to `docs/SETUP.md`)
   - Link to roadmap
2. Create `docs/SETUP.md` with full setup instructions
3. Create `docs/ARCHITECTURE.md` with initial architecture overview (monolith, apps, DB)
4. Run full end-to-end check:
   - `docker compose up -d`
   - `npm run dev`
   - Frontend loads → shows health status → database connected
   - Swagger docs accessible
   - Tests pass
5. Fill in "What I Learned" section below
6. Update roadmap status to Level 1 complete

**Done when:**
- All docs are in place
- Full stack runs without errors
- You can explain the project structure to someone else

---

## Expected Result

After Level 1, the project looks like this:

```
✅ NestJS API running on :3001
✅ Next.js frontend running on :3000
✅ PostgreSQL in Docker
✅ Prisma connected with first migration
✅ GET /health → { status: "ok", database: "connected" }
✅ Swagger docs at /api
✅ Frontend displays API health status
✅ One passing smoke test
✅ SETUP.md for new developers
```

**The product does not have features yet** — but it has a professional foundation ready for Level 2 (Authentication).

---

## What I Learned

> Fill this section after you complete Level 1.

### Concepts I understand now:

- [ ] NestJS modules, controllers, services, and DI
- [ ] How Prisma schema and migrations work
- [ ] Docker Compose for local PostgreSQL
- [ ] Next.js App Router basics
- [ ] Environment variable management
- [ ] Swagger/OpenAPI documentation

### Things that were harder than expected:

_(Write your notes here)_

### Questions I still have:

_(Write your notes here)_

---

## Interview Knowledge

Questions you should be able to answer after this level:

1. **What is Dependency Injection and why does NestJS use it?**
2. **What is the difference between a NestJS module, controller, and service?**
3. **What does an ORM do? Why use Prisma instead of raw SQL?**
4. **What is a database migration and why is it important?**
5. **What is Docker Compose and why do we use it for local development?**
6. **What is CORS and why did we need to enable it?**
7. **What is the difference between `.env` and `.env.example`?**
8. **What is a monorepo and what are its advantages?**
9. **What is Swagger/OpenAPI used for?**
10. **How does a health check endpoint help in production?**

---

## Official Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [NestJS Modules](https://docs.nestjs.com/modules)
- [NestJS Providers & DI](https://docs.nestjs.com/providers)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Prisma Getting Started](https://www.prisma.io/docs/getting-started)
- [Prisma with NestJS](https://docs.nestjs.com/recipes/prisma)
- [Docker Compose](https://docs.docker.com/compose/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/docs)

---

## Next Level Preview

**Level 2 — Authentication & User Identity**

We will add user registration, login, JWT tokens, password hashing, and protected routes. The Prisma schema will get its first real model: `User`.

But first — finish Level 1 completely. A solid foundation makes everything after it smoother.

# Zentra — Master Project Roadmap

This is the full learning journey for **Zentra**: a Team Project Management SaaS platform.

**Principle:** Each level gives you a **real product improvement** and **meaningful technical understanding**.

**Progression:** Simple → Structured → Scalable → Production-ready

---

## Product Vision (End State)

Teams can:

- Sign up and manage accounts
- Create projects and invite members with roles
- Manage tasks on a Kanban board
- Collaborate with comments and activity tracking
- Get notifications (in-app and email)
- Upload files and search work
- View project analytics
- Use a secure, tested, deployable SaaS platform

We will **not** build all of this on day one. Each level adds one meaningful slice.

---

## Technology Introduction Map

| Technology | Introduced In | Why |
|---|---|---|
| NestJS, TypeScript, Modules/DI | Level 1 | Backend foundation |
| Next.js, React, Tailwind, shadcn/ui | Level 1 | Frontend foundation |
| PostgreSQL + Prisma | Level 1 | Persistent data |
| Docker Compose | Level 1 | Consistent dev environment |
| Swagger/OpenAPI | Level 1 | API documentation |
| JWT Auth, Guards, DTOs, Pipes | Level 2 | Secure users |
| TanStack Query, RHF, Zod | Level 3 | Modern frontend data layer |
| RBAC & Permissions | Level 4 | Team access control |
| Pagination, Filtering, Indexes | Level 5 | Scale task queries |
| Optimistic UI, Kanban state | Level 6 | Rich UX |
| Activity/Audit patterns | Level 7 | Collaboration history |
| Redis + BullMQ | Level 8 | Async jobs and notifications |
| File uploads & storage | Level 9 | Attachments |
| Search & query optimization | Level 10 | Find work fast |
| Redis caching | Level 11 | Performance |
| WebSockets / SSE | Level 12 | Real-time updates |
| Email delivery | Level 12 | External notifications |
| Unit / Integration / E2E tests | Progressive + Level 13 | Quality and confidence |
| CI/CD, Logging, Observability | Level 14 | Production engineering |
| Multi-tenancy, SaaS patterns | Level 15 | SaaS evolution |

---

## Architecture Evolution

```
Level 1–2:   Monolith API + Frontend + DB
             Simple modules, basic auth

Level 3–5:   Domain modules grow (projects, tasks, members)
             Authorization layer matures

Level 6–7:   Rich frontend + collaboration features
             Activity/audit patterns

Level 8:     Redis + BullMQ join the stack
             Async processing begins

Level 9–11:  Files, search, caching
             Performance becomes intentional

Level 12:    Real-time layer added
             Email as background job

Level 13–14: Testing maturity + production tooling

Level 15:    SaaS-ready multi-tenant architecture
```

---

## The 15 Levels

---

### Level 1 — Project Foundation & Development Environment

**Goal:** Set up a clean, professional project structure and a working dev environment.

**What we build:**
- Monorepo or structured repo layout (`apps/api`, `apps/web`, shared packages if needed)
- NestJS API with health check endpoint
- Next.js frontend with basic layout and routing
- PostgreSQL database with Prisma
- Docker Compose for local dev (API, DB, and later Redis placeholder)
- Swagger/OpenAPI on the API
- Environment configuration (`.env`, validation)
- Basic README and setup instructions

**What you learn:**
- NestJS architecture: modules, controllers, providers, services, dependency injection
- Next.js App Router basics
- Prisma schema, migrations, and client usage
- Docker Compose for local development
- REST API design basics
- Environment-based configuration
- How a full-stack monolith is structured

**Architecture decisions:**
- Monolith first (not microservices)
- API and web as separate apps in one repo
- PostgreSQL as primary database
- Prisma as ORM

**Testing (introduced lightly):**
- One smoke test to prove the test runner works

**After this level, the product has:**
- A running API and frontend
- A database connection
- A documented health check
- A repeatable dev setup anyone can run with Docker

**Level document:** [level-01-foundation.md](./levels/level-01-foundation.md)

---

### Level 2 — Authentication & User Identity

**Goal:** Users can register, log in, and access protected resources securely.

**What we build:**
- User model and registration
- Login with JWT (access token; refresh token optional at first)
- Password hashing (bcrypt)
- Auth module: strategy, guard, decorator (`@CurrentUser()`)
- DTOs with validation (class-validator or Zod on backend)
- Global exception filter and consistent error responses
- Frontend: login/register pages, auth context or cookie/session handling
- Protected API routes and protected frontend routes

**What you learn:**
- Authentication vs authorization
- JWT structure and flow
- NestJS Guards, Pipes, and custom decorators
- Password security (hashing, never store plain text)
- DTO validation and request transformation
- Exception handling in NestJS
- Secure token storage on the frontend

**Architecture decisions:**
- JWT-based stateless auth (simple start)
- Auth as its own NestJS module
- Global validation pipe

**Testing:**
- Unit tests for auth service (password hash, token generation)
- Integration test: register → login → access protected route

**After this level, the product has:**
- Working user accounts
- Secure login/logout
- Protected API and UI

---

### Level 3 — Projects Core

**Goal:** Authenticated users can create and manage their own projects.

**What we build:**
- Project model (name, description, owner, timestamps)
- CRUD API for projects
- Ownership rules: users only manage their own projects
- Frontend: project list, create project, project detail page
- TanStack Query for server state
- React Hook Form + Zod for forms
- Loading, error, and empty states

**What you learn:**
- REST resource design (nouns, HTTP verbs, status codes)
- One-to-many relationships (User → Projects)
- Authorization at resource level (owner check)
- TanStack Query: queries, mutations, cache invalidation
- Form validation on frontend and backend
- Separation of concerns: controller → service → repository/Prisma

**Architecture decisions:**
- Projects module in NestJS
- Owner-based access before team features exist
- Consistent API response shape

**Testing:**
- Integration tests for project CRUD
- Test ownership: user A cannot access user B's project

**After this level, the product has:**
- Real project management (single-user)
- A usable frontend for projects

---

### Level 4 — Team Members, Roles & Permissions (RBAC)

**Goal:** Projects become team workspaces with controlled access.

**What we build:**
- Project membership model
- Roles: Owner, Admin, Member, Viewer (start simple, extend later)
- Permission matrix (who can edit project, invite members, manage tasks)
- Invite flow (invite link or email placeholder)
- Member management UI (list, change role, remove)
- Permission guards on API endpoints
- `@RequirePermission()` or role-based decorators

**What you learn:**
- RBAC (Role-Based Access Control)
- Authentication vs authorization in practice
- Permission guards vs role guards
- Many-to-many relationships (User ↔ Project through Membership)
- Designing a permission matrix
- Why authorization must happen on the backend, not only the UI

**Architecture decisions:**
- Membership as join table with role column
- Central permissions service or guard factory
- Deny by default

**Testing:**
- Integration tests for each role's allowed/denied actions
- Test invite and accept flow

**After this level, the product has:**
- Multi-user projects
- Role-based access control
- Member invitations

---

### Level 5 — Tasks & Work Management

**Goal:** Teams can create, assign, and organize tasks inside projects.

**What we build:**
- Task model: title, description, status, priority, due date, assignee, project
- Task CRUD API with project-scoped access
- Task list view with filters (status, assignee, priority)
- Pagination and sorting
- Assign tasks to project members
- Basic database indexes on common query fields

**What you learn:**
- Relational modeling (Project → Tasks → User assignee)
- Foreign keys and referential integrity
- API pagination (cursor or offset)
- Filtering and sorting query design
- When and why to add database indexes
- Prisma query patterns and `include`/`select`

**Architecture decisions:**
- Tasks belong to exactly one project
- All task queries scoped by project + permissions
- Pagination from the start (avoid loading all tasks)

**Testing:**
- Integration tests for task CRUD with permissions
- Test pagination and filters

**After this level, the product has:**
- Full task management inside projects
- Assignments and filtering

---

### Level 6 — Kanban Board

**Goal:** Visual task workflow with drag-and-drop organization.

**What we build:**
- Kanban columns mapped to task status (or custom columns later)
- Board view with columns: To Do, In Progress, Done (extendable)
- Drag-and-drop to change status and order
- Task ordering within columns (`position` or `order` field)
- Optimistic UI updates with rollback on error
- Board filters (assignee, priority)

**What you learn:**
- Frontend state management for complex UI
- Optimistic updates with TanStack Query
- Ordering data in a relational database
- UX patterns for drag-and-drop
- Handling concurrent updates (basic conflict awareness)

**Architecture decisions:**
- Status enum + position integer for ordering
- PATCH endpoint for status/order updates
- Optimistic UI on frontend, authoritative state on backend

**Testing:**
- Integration test: move task between statuses
- E2E test (first Playwright test): drag task on board

**After this level, the product has:**
- A real Kanban board
- Visual workflow management

---

### Level 7 — Comments & Activity Feed

**Goal:** Team collaboration with conversation and history.

**What we build:**
- Comments on tasks (author, content, timestamps)
- Activity feed for project events (task created, status changed, member added, comment added)
- Activity log model (actor, action, entity, metadata)
- Comment thread UI on task detail
- Project activity timeline UI

**What you learn:**
- Modeling comments (one-to-many: Task → Comments)
- Activity/audit log pattern
- Event types and metadata storage (JSON column vs normalized)
- Denormalization trade-offs for read performance
- How activity feeds are built in real products

**Architecture decisions:**
- Dedicated `Activity` table for audit trail
- Activity records written in service layer when actions happen
- Comments as separate entity, not nested in task JSON

**Testing:**
- Integration tests: comment CRUD, activity created on task update
- Verify activity feed returns correct events

**After this level, the product has:**
- Task comments
- Project activity history

---

### Level 8 — Notifications & Background Jobs

**Goal:** Users get notified about important events, processed asynchronously.

**What we build:**
- In-app notification model (user, type, message, read/unread, link)
- Notification triggers: task assigned, comment mention, member invited
- Redis added to Docker Compose
- BullMQ queue for notification processing
- Background worker: process notification jobs
- Notification bell UI with unread count
- Mark as read / mark all as read

**What you learn:**
- Why synchronous notification creation is a problem at scale
- Redis basics: in-memory store, pub/sub concepts
- BullMQ: queues, jobs, workers, retries, backoff
- Idempotency basics (avoid duplicate notifications)
- Async processing in a monolith
- Separation: API enqueues job → worker processes job

**Architecture decisions:**
- Redis + BullMQ for job queue
- API creates notification record + enqueues job (or worker creates it)
- Retry with exponential backoff for failures

**Testing:**
- Integration test: action triggers notification
- Test job processing (with test Redis or mocked queue)

**After this level, the product has:**
- In-app notifications
- Background job infrastructure (reused later for email)

---

### Level 9 — File Uploads & Attachments

**Goal:** Teams can attach files to tasks and projects.

**What we build:**
- File upload API (multipart)
- File metadata model (name, size, mime type, uploader, entity reference)
- Local file storage for dev (abstract storage interface for future S3)
- Attach files to tasks
- File list on task detail, download endpoint
- Upload validation: file type whitelist, size limits
- Basic virus scan placeholder or note for production

**What you learn:**
- Multipart form data handling
- File storage abstraction (local vs object storage)
- Security: file type validation, path traversal prevention
- Serving files safely (not direct filesystem paths)
- Object storage concepts (S3-compatible) for later

**Architecture decisions:**
- Storage service interface (`StorageProvider`)
- Local filesystem in dev; S3-ready interface for production
- Files linked to tasks via foreign key or polymorphic reference

**Testing:**
- Integration test: upload, list, download
- Test rejection of oversized or invalid file types

**After this level, the product has:**
- File attachments on tasks
- Secure upload and download

---

### Level 10 — Search, Filters & Query Performance

**Goal:** Users can find tasks and projects quickly as data grows.

**What we build:**
- Search API: search tasks by title/description across a project
- Global search within user's accessible projects
- Advanced filters: date range, multiple statuses, assignees
- Database indexes review and optimization
- Query performance analysis (EXPLAIN)
- Search UI with debounced input

**What you learn:**
- Search strategies: SQL `ILIKE`, full-text search (PostgreSQL `tsvector`)
- Index types and when they help
- Query optimization basics
- N+1 query problem and how Prisma causes/fixes it
- Debouncing and search UX

**Architecture decisions:**
- Start with PostgreSQL full-text search (no Elasticsearch yet)
- Composite indexes for common filter combinations
- Search scoped by user permissions

**Testing:**
- Integration tests for search and filters
- Performance baseline tests (optional)

**After this level, the product has:**
- Fast search across tasks and projects
- Advanced filtering

---

### Level 11 — Analytics, Caching & Security Hardening

**Goal:** Project insights, better performance, and stronger security.

**What we build:**
- Project dashboard: task counts by status, overdue tasks, completion rate
- User workload view (tasks assigned per member)
- Redis caching for dashboard stats (TTL, invalidation on task change)
- Rate limiting on auth and API endpoints
- Security review: CORS, helmet headers, input sanitization
- Structured logging (request ID, user ID, duration)
- Improved global error handling

**What you learn:**
- SQL aggregations (`COUNT`, `GROUP BY`)
- Caching strategies: cache-aside, TTL, invalidation
- When caching helps vs hurts
- Rate limiting concepts
- Security headers and common API vulnerabilities
- Structured logging for debugging

**Architecture decisions:**
- Cache dashboard stats with short TTL
- Invalidate cache on task/project mutations
- Rate limiter middleware (Redis-backed)

**Testing:**
- Unit tests for analytics calculations
- Test cache hit/miss behavior
- Test rate limit triggers 429

**After this level, the product has:**
- Project analytics dashboard
- Caching layer
- Hardened API security

---

### Level 12 — Real-Time Updates & Email Notifications

**Goal:** Live collaboration feel and external notification delivery.

**What we build:**
- WebSocket or SSE gateway in NestJS
- Real-time events: task moved, comment added, notification received
- Frontend subscribes to project channel
- Email notifications via BullMQ worker (task assigned, invite, mention)
- Email templates (simple HTML)
- User notification preferences (email on/off per type)

**What you learn:**
- Real-time communication patterns (WebSocket vs SSE vs polling)
- NestJS WebSocket gateway or SSE controller
- Room/channel concepts (subscribe per project)
- Email as async background job
- Transactional email basics
- User preference management

**Architecture decisions:**
- SSE or WebSocket based on complexity needs (SSE simpler to start)
- Email sent via BullMQ queue (reuse Level 8 infrastructure)
- Real-time events emitted after DB commit

**Testing:**
- Integration test for email job enqueue
- E2E test for real-time task update (optional)

**After this level, the product has:**
- Live board updates without refresh
- Email notifications for key events

---

### Level 13 — Testing Maturity

**Goal:** Confidence to refactor and deploy without breaking critical flows.

**What we build:**
- Unit test coverage for core services (auth, permissions, tasks)
- Integration test suite for all major API flows
- E2E test suite with Playwright:
  - Register → create project → add task → move on board
  - Invite member → member accepts → assigns task
  - Comment and notification flow
- Test database seeding strategy
- CI test run on every push (GitHub Actions basics)

**What you learn:**
- Testing pyramid: unit → integration → E2E
- What to test at each level
- Test isolation (test DB, factories, cleanup)
- Playwright for browser E2E
- Mocking vs real dependencies
- How tests protect refactoring

**Architecture decisions:**
- Separate test database
- Factory pattern for test data
- Critical path E2E, broad integration, focused unit

**After this level, the product has:**
- Meaningful automated test coverage
- CI running tests on push

---

### Level 14 — Production Engineering & Deployment

**Goal:** Deploy Zentra as a production-ready application.

**What we build:**
- Production Dockerfiles (multi-stage builds)
- Docker Compose for production-like local setup
- GitHub Actions: lint, test, build, deploy pipeline
- Environment separation: dev, staging, production
- Health checks and readiness probes
- Structured logging with log levels
- Error tracking setup (e.g., Sentry — optional)
- Database migration strategy for production
- Deployment documentation

**What you learn:**
- Multi-stage Docker builds
- CI/CD pipeline design
- Environment configuration for production
- Database migration safety in production
- Health checks and graceful shutdown
- Observability basics: logs, metrics, traces
- Deployment strategies (rolling, blue-green concepts)

**Architecture decisions:**
- Single deployable unit (monolith) on one platform first
- Migrations run before app start
- Secrets via environment variables, not code

**After this level, the product has:**
- Deployable production build
- Automated CI/CD pipeline
- Operational basics (logging, health checks)

---

### Level 15 — SaaS Evolution & Multi-Tenancy

**Goal:** Evolve from team tool to SaaS platform with organizations and billing readiness.

**What we build:**
- Organization/Workspace model (above projects)
- Users belong to organizations with org-level roles
- Project scoping under organizations
- Usage limits (projects, members, storage — configurable)
- Billing-ready data model (plan, subscription status — Stripe integration optional)
- Super-admin or org-admin panel basics
- Advanced authorization: org-level vs project-level permissions

**What you learn:**
- Multi-tenancy patterns: shared DB with tenant ID vs separate schemas
- SaaS data model design
- Usage metering concepts
- Billing integration basics (Stripe)
- How permissions work at org + project levels
- When to introduce complexity vs stay simple

**Architecture decisions:**
- Shared database with `organizationId` on key tables (simplest multi-tenancy)
- Org context in JWT or request scope
- Billing as optional module

**After this level, the product has:**
- Organization-based SaaS structure
- Usage limits and billing readiness
- A platform ready for real customers

---

## Testing Strategy (Across All Levels)

Testing is **progressive**, not only at Level 13.

| Level | Testing Focus |
|---|---|
| 1 | Smoke test, test runner setup |
| 2 | Auth unit + integration tests |
| 3–5 | API integration tests per feature |
| 6 | First Playwright E2E (Kanban) |
| 7–11 | Integration tests for new features |
| 13 | Full test suite maturity + CI |
| 14 | Tests in CI/CD pipeline |

---

## Repository Documentation Structure

```
zentra/
├── README.md                          # Project overview + quick start
├── docs/
│   ├── ROADMAP.md                     # This master roadmap (source of truth)
│   ├── ARCHITECTURE.md                # Living architecture overview (updated per level)
│   ├── CONVENTIONS.md                 # Code style, naming, API conventions
│   ├── SETUP.md                       # Detailed dev environment setup
│   │
│   ├── levels/                        # One doc per level
│   │   ├── level-01-foundation.md
│   │   ├── level-02-authentication.md
│   │   └── ...
│   │
│   ├── decisions/                     # Architecture Decision Records (ADRs)
│   │   ├── 001-monolith-first.md
│   │   ├── 002-jwt-auth.md
│   │   └── ...
│   │
│   └── concepts/                      # Reusable concept notes (optional, over time)
│       ├── rbac.md
│       ├── bullmq-queues.md
│       └── caching-strategies.md
│
├── apps/
│   ├── api/                           # NestJS backend
│   └── web/                           # Next.js frontend
│
├── packages/                          # Shared code (if needed later)
│   └── shared-types/
│
├── docker/
│   ├── docker-compose.yml
│   └── docker-compose.prod.yml
│
└── .github/
    └── workflows/
        └── ci.yml
```

Each **Level document** contains:

- Level goal
- Why this level exists
- What we build
- What you learn
- Technologies involved
- Important concepts
- Architecture decisions
- Ordered tasks (Task 1 → Task 2 → ...)
- Expected result
- What I learned (filled after completion)
- Interview knowledge

---

## Estimated Timeline (Flexible)

| Level | Focus | Rough Duration |
|---|---|---|
| 1 | Foundation | 1–2 weeks |
| 2 | Authentication | 1–2 weeks |
| 3 | Projects | 1 week |
| 4 | RBAC & Members | 1–2 weeks |
| 5 | Tasks | 1–2 weeks |
| 6 | Kanban | 1–2 weeks |
| 7 | Comments & Activity | 1 week |
| 8 | Notifications & Jobs | 1–2 weeks |
| 9 | File Uploads | 1 week |
| 10 | Search & Performance | 1–2 weeks |
| 11 | Analytics & Caching | 1–2 weeks |
| 12 | Real-time & Email | 1–2 weeks |
| 13 | Testing Maturity | 1–2 weeks |
| 14 | Production Engineering | 1–2 weeks |
| 15 | SaaS Evolution | 2–3 weeks |

**Total:** roughly 4–6 months at a steady learning pace. Speed is not the goal — understanding is.

---

## What We Deliberately Skip (For Now)

These are **not forgotten** — they come when the product needs them:

| Topic | Why Not Yet |
|---|---|
| Microservices | Monolith is correct for this stage |
| Elasticsearch | PostgreSQL full-text search is enough first |
| CQRS / Event Sourcing | Unnecessary complexity |
| GraphQL | REST is simpler and sufficient |
| Kubernetes | Docker Compose + single deploy is enough first |
| Advanced observability (Datadog, etc.) | Basic logging + Sentry first |
| Stripe billing (full) | Billing-ready model first, integration optional |

---

## Quick Reference: Level Summary

| # | Level | Product Milestone | Key Learning |
|---|---|---|---|
| 1 | Foundation | Running API + Frontend + DB | NestJS, Prisma, Docker |
| 2 | Authentication | User accounts & login | JWT, Guards, DTOs |
| 3 | Projects | Create/manage projects | REST design, TanStack Query |
| 4 | RBAC & Members | Team workspaces | Permissions, roles |
| 5 | Tasks | Task management | Relational modeling, pagination |
| 6 | Kanban | Visual board | Optimistic UI, ordering |
| 7 | Comments & Activity | Collaboration | Audit logs, activity feeds |
| 8 | Notifications & Jobs | In-app alerts | Redis, BullMQ, queues |
| 9 | File Uploads | Attachments | Storage, security |
| 10 | Search & Performance | Find work fast | Indexes, full-text search |
| 11 | Analytics & Caching | Dashboards + speed | Aggregations, Redis cache |
| 12 | Real-time & Email | Live updates + email | WebSocket/SSE, email jobs |
| 13 | Testing Maturity | Automated confidence | Unit, integration, E2E |
| 14 | Production Engineering | Deployable app | Docker, CI/CD, logging |
| 15 | SaaS Evolution | Multi-tenant platform | Organizations, billing readiness |

---

## Status

- **Roadmap:** Approved
- **Current level:** Level 1 — Project Foundation & Development Environment
- **Next step:** Start Level 1, Task 1

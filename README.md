# Zentra

A modern workspace for teams to manage projects, collaborate on tasks, and keep work organized — designed to grow from a simple MVP into a scalable, production-ready SaaS platform.

## Tech Stack

- **Backend:** NestJS, TypeScript, PostgreSQL, Prisma
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **Infrastructure:** Docker, Redis, BullMQ (introduced progressively)

## Learning Project

This is a long-term learning project. We build the product level by level, learning backend architecture, databases, authentication, and production engineering along the way.

See the full journey in **[docs/ROADMAP.md](./docs/ROADMAP.md)**.

## Current Status

**Level 1 — Project Foundation & Development Environment** (in progress)

Level document: [docs/levels/level-01-foundation.md](./docs/levels/level-01-foundation.md)

## Repository Layout

This is an **npm workspaces** monorepo. One git repo, two apps:

```text
zentra/
├── apps/
│   ├── api/      # NestJS backend
│   └── web/      # Next.js frontend
├── docker/       # Local infrastructure (PostgreSQL in Task 2)
└── docs/         # Roadmap and level guides
```

- **Root** holds shared workspace config (`package.json`, `.gitignore`).
- **Each app** has its own `package.json` and source code.
- **Secrets** stay in `.env` files (gitignored). Use `.env.example` as the template.

## Quick Start

> Setup instructions will be added during Level 1. See [docs/SETUP.md](./docs/SETUP.md) when available.

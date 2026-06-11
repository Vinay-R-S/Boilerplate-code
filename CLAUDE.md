# CLAUDE.md
> Auto-loaded every session. Keep lean. Details live in docs/.

## Project
- Name: AdvisorKhoj-CRM
- Purpose: CRM for structured workflow and MIS (Management Information System)
  for AdvisorKhoj (Fastify API + React client)
- Status: Active development

## Stack
Fastify 5, TypeScript 6, Sequelize 6 + MySQL 8.4, Zod, Winston, JWT auth.
Client: Vite 8, React 19, Tailwind 4, React Router 7, TanStack Query 5, Zustand 5.

## Key Docs (loaded on demand)
- Architecture: @docs/architecture.md
- Conventions: @docs/conventions.md
- Decisions log: @docs/decisions.md
- Full stack reference: @docs/stack.md

## Folder Structure
server/src: config, constants, controllers, middlewares, models, routes,
services, types, utils, validators (one file per feature per layer).
client/src: components/{ui,common,layout}, features/<feature>, hooks, lib,
pages, routes, services, store, styles, types, utils.

## Naming Conventions
- Server layer files: <feature>.controller.ts / .service.ts / .routes.ts / .validators.ts
- Server singletons/classes: PascalCase (User.ts, AppError.ts)
- Server utils/middlewares: camelCase (errorHandler.ts, catchAsync.ts)
- Client components: PascalCase, one component per file
- Client pages: PascalCase + "Page" suffix (e.g. DashboardPage.tsx)
- Client hooks: camelCase, "use" prefix
- Constants: UPPER_SNAKE_CASE inside `as const` objects, no enums

## Domain Notes
- This is a finance/mutual fund CRM: expect entities like clients/investors,
  portfolios, mutual fund schemes, transactions (SIP/lumpsum/redemption),
  KYC documents, and advisors/relationship managers.
- Treat client financial and KYC data as sensitive: never log it, always
  scope queries by ownership/role, and validate amounts/dates strictly.

## Hard Rules - NEVER VIOLATE
- Follow the Airbnb JavaScript Style Guide for all JS and TS code
- Never use `any` - use `unknown` and narrow, or define a proper type
- Never use non-null assertion `!`
- Controllers stay thin - business logic only in services
- All inputs validated with Zod via the `validate()` preHandler
- Never expose passwords or tokens in API responses (use toSafeJSON)
- Env vars validated at startup in config/env.ts, never read process.env elsewhere
- Always handle errors via AppError + the global error handler, no silent failures
- One component per file, props interface defined above the component
- New feature on the server gets a controller, service, route, and validator file
- New feature on the client gets a page in pages/, a service in services/, and
  (if it has forms) a schema folder in features/<feature>/

## Test Command
npm test (per package, once test framework is added)

## Build Command
server: npm run build (server/) | client: npm run build (client/)

## Compaction Instructions
When compacting, ALWAYS preserve:
1. Full list of files modified this session
2. The active task description
3. Names of any failing tests
4. Any architectural decisions made
5. Any new conventions established

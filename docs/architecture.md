# Architecture

## Overview
A two-package monorepo for AdvisorKhoj-CRM, a CRM for structured workflow
and MIS (Management Information System) for the AdvisorKhoj company.
`server/` is a Fastify REST API backed by MySQL via Sequelize.
`client/` is a Vite + React SPA that consumes the API under `/api/v1`. Both
packages are independently built and linted.

## Folder Responsibilities

### server/src
- config/        environment loading, database connection, logger setup
- constants/     shared enums and constant objects (roles, pagination, JWT)
- controllers/   parse request, call service, send response - no business logic
- middlewares/   authenticate (JWT), errorHandler, notFound, rateLimiter, validate (Zod)
- models/        Sequelize models with hooks (e.g. password hashing on User)
- routes/        Fastify plugins, one per feature, registered with a prefix
- services/      all business logic and database queries
- types/         FastifyRequest augmentation, pagination, ApiResponse types
- utils/         AppError, sendSuccess/sendCreated/sendNoContent, catchAsync
- validators/    Zod schemas grouped per feature, used by validate()

### client/src
- components/ui/      generic reusable primitives, no business logic
- components/common/  ErrorBoundary, ProtectedRoute, GuestRoute
- components/layout/  AuthLayout, MainLayout
- features/<feature>/ Zod schemas for forms (loginSchema, registerSchema, ...)
- hooks/         shared hooks (useAuth, useUsers, useDebounce, useLocalStorage)
- lib/           apiClient.ts (Axios instance with interceptors)
- pages/         one file per route, composed from components and hooks
- routes/        AppRouter.tsx (React Router config)
- services/      one file per feature, wraps apiClient calls
- store/         Zustand stores (authStore)
- styles/        globals.css (Tailwind entry)
- types/         shared TypeScript types
- utils/         cn (classnames helper), format, constants

## Data Flow (server)
Request -> Fastify route plugin -> validate() preHandler (Zod) ->
authenticate preHandler (if protected) -> controller -> service ->
Sequelize model -> MySQL -> apiResponse helper -> JSON response.
Errors thrown anywhere are caught by the global errorHandler.

## Data Flow (client)
Page component -> hook (TanStack Query) -> service -> apiClient (Axios) ->
server API. Auth state lives in the Zustand authStore; protected pages are
wrapped by ProtectedRoute / GuestRoute.

## Key Patterns
- Layered architecture on the server: routes -> controllers -> services -> models
- Operational vs programmer errors via AppError.isOperational
- Standard API envelope: { success, message, data?, meta? }
- Feature-first additions: every new resource gets matching files across
  controllers/services/routes/validators (server) and pages/services (client)

## Domain Model (CRM for mutual fund company)
Expected core entities as the project grows (add to this list as they land):
- User / Advisor / RelationshipManager - internal staff with roles
- Client / Investor - the CRM's primary record, owned by an advisor
- KYC documents - sensitive, access-controlled, never logged
- Portfolio / Holdings - per-client mutual fund holdings
- Scheme - mutual fund scheme master data (AMC, category, NAV)
- Transaction - SIP / lumpsum / redemption / switch records
- Lead / Task / Activity - CRM pipeline and follow-up tracking

## External Services
None by default. Add any third-party API integrations here as they are added
(e.g. AMC/RTA data feeds, NAV providers, payment gateways, KYC verification).

## Environment Variables (see server/.env.example)
NODE_ENV, PORT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_POOL_MAX,
DB_POOL_MIN, DB_POOL_ACQUIRE, DB_POOL_IDLE, JWT_SECRET, JWT_EXPIRES_IN,
CORS_ORIGIN, LOG_LEVEL

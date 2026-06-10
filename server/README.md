# Server — Express + TypeScript + MySQL Boilerplate

Industry-standard Node.js backend following the **Airbnb JavaScript Style Guide**.

## Tech Stack

| Layer | Library | Version |
|---|---|---|
| Runtime | Node.js | ≥ 20 |
| Framework | Express | 4.x |
| Language | TypeScript | 5.x |
| Database | MySQL via Sequelize | 6.x |
| Auth | JWT (jsonwebtoken) | 9.x |
| Validation | express-validator | 7.x |
| Logging | Winston | 3.x |
| Security | Helmet, CORS, rate-limit | latest |
| Linting | ESLint + Airbnb config | 8.x |

## Project Structure

```
src/
├── config/
│   ├── database.ts      # Sequelize connection + sync
│   ├── env.ts           # Validated environment variables
│   └── logger.ts        # Winston logger (dev/prod formats)
├── controllers/         # Thin — delegate to services
│   ├── auth.controller.ts
│   └── user.controller.ts
├── middlewares/
│   ├── authenticate.ts  # JWT auth guard
│   ├── errorHandler.ts  # Global error handler
│   ├── notFound.ts      # 404 handler
│   ├── rateLimiter.ts   # Request throttling
│   └── validate.ts      # express-validator runner
├── models/
│   └── User.ts          # Sequelize model
├── routes/
│   ├── index.ts         # Root router
│   ├── auth.routes.ts
│   └── user.routes.ts
├── services/            # Business logic
│   ├── auth.service.ts
│   └── user.service.ts
├── types/
│   └── auth.validators.ts
├── utils/
│   ├── AppError.ts      # Custom error class
│   ├── apiResponse.ts   # Standardized response helpers
│   └── catchAsync.ts    # Async error wrapper
├── app.ts               # Express app factory
└── index.ts             # Server entry point
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

```bash
cp .env.example .env
# Edit .env with your DB credentials and JWT secret
```

### 3. Run in development

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
npm start
```

## API Endpoints

All routes are prefixed with `/api/v1`.

### Auth

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Register new user |
| POST | `/auth/login` | No | Login |
| GET | `/auth/me` | Yes | Get current user |

### Users

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/users` | Yes | List users (paginated) |
| GET | `/users/:id` | Yes | Get user by ID |
| PATCH | `/users/:id` | Yes | Update user |
| DELETE | `/users/:id` | Yes | Delete user |

### Health

```
GET /api/v1/health
```

## Code Style

This project follows the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

Run `npm run lint` to check and `npm run lint:fix` to auto-fix.

## Architecture Decisions

- **No Webpack** — `ts-node-dev` for development, `tsc` for production builds. Webpack adds complexity for a Node.js server that gains nothing from bundling.
- **Layered architecture** — Routes → Controllers → Services → Models. Controllers stay thin; all business logic lives in services.
- **Operational vs programmer errors** — `AppError.isOperational` separates expected errors (400/401/404) from bugs (500). Only bugs are logged as errors.
- **`catchAsync` wrapper** — Eliminates boilerplate try/catch in every async handler.
- **Env validation at startup** — Missing required vars throw immediately, not at runtime.

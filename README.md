# AdvisorKhoj-CRM - Full-Stack Boilerplate

Fastify + TypeScript + MySQL · React + TypeScript + Tailwind CSS

```
advisorkhoj-crm/
├── server/               <- Fastify API (Node.js + TypeScript + Sequelize)
├── client/               <- React SPA (Vite + TypeScript + Tailwind v4)
└── docker-compose.yml    <- Local MySQL + Adminer
```

## Prerequisites

| Tool | Min version |
|---|---|
| Node.js | 20 LTS |
| npm | 10+ |
| Docker + Docker Compose | any recent |

## Quick Start

### 1. Start the database

```bash
docker compose up -d
```

This starts:
- **MySQL 8.4** on `localhost:3306` (user: `myapp_user`, password: `myapp_password`, db: `myapp_db`)
- **Adminer** (DB GUI) on `http://localhost:8080`

### 2. Set up the server

```bash
cd server
cp .env.example .env
# .env is pre-filled to match docker-compose credentials - edit JWT_SECRET at minimum
npm install
npm run dev
```

Server runs on **http://localhost:3000**

### 3. Set up the client

```bash
cd client
cp .env.example .env.local
# VITE_API_BASE_URL=http://localhost:3000/api/v1 (already set)
npm install
npm run dev
```

Client runs on **http://localhost:5173**

The Vite dev server automatically proxies `/api` to `http://localhost:3000`.

## Available Scripts

### Server (`/server`)

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled production build |
| `npm run lint` | Check code style (Airbnb) |
| `npm run typecheck` | Type-check without emitting |

### Client (`/client`)

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code style (Airbnb) |
| `npm run typecheck` | Type-check without emitting |

## API Reference

Base URL: `http://localhost:3000/api/v1`

### Auth

| Method | Endpoint | Auth | Body |
|---|---|---|---|
| POST | `/auth/register` | - | `{ name, email, password }` |
| POST | `/auth/login` | - | `{ email, password }` |
| GET | `/auth/me` | Bearer | - |

### Users

| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| GET | `/users` | Bearer | `?page=1&limit=10` |
| GET | `/users/:id` | Bearer | - |
| PATCH | `/users/:id` | Bearer | `{ name?, email? }` |
| DELETE | `/users/:id` | Bearer | Returns 204 |

### Health

```
GET /api/v1/health -> { success: true, message: "Server is healthy" }
```

## Tech Stack

### Server

| | Package | Version |
|---|---|---|
| Runtime | Node.js | >= 20 |
| Framework | Fastify | 5.x |
| Language | TypeScript | 6.x |
| ORM | Sequelize + sequelize-typescript | 6.x / 2.x |
| Database | MySQL 2 | 3.x |
| Auth | jsonwebtoken + bcryptjs | 9.x / 3.x |
| Validation | Zod | 3.x |
| Logging | Winston | 3.x |
| Security | @fastify/helmet, @fastify/cors, @fastify/rate-limit | latest |

### Client

| | Package | Version |
|---|---|---|
| Build | Vite | 8.x |
| Framework | React | 19.x |
| Language | TypeScript | 6.x |
| Styling | Tailwind CSS | 4.x |
| Routing | React Router DOM | 7.x |
| Data fetching | TanStack Query | 5.x |
| State | Zustand | 5.x |
| Forms | React Hook Form + Zod | 7.x / 4.x |
| HTTP | Axios | 1.x |
| Icons | Lucide React | 1.x |

## Code Style

Both `server/` and `client/` follow the **[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)**.

Run `npm run lint` in either directory to check, `npm run lint:fix` to auto-fix.

> **Note on ESLint versions:** ESLint is intentionally pinned to `^8.57.0` in both projects.
> `eslint-config-airbnb` only supports ESLint 7 and 8. ESLint 9/10 are not yet supported by the Airbnb config.

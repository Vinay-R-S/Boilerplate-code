# Full Stack Reference

## Runtime & Language
Node.js >= 20, TypeScript 6.x (server and client)

## Server Framework
Fastify 5.x, app built via an async buildApp() factory in server/src/app.ts

## Database
MySQL 8.4 via Sequelize 6 + sequelize-typescript 2 (server/src/models)

## Client Framework
React 19 with Vite 8, Tailwind CSS 4, React Router DOM 7

## Key Server Dependencies
| Package | Purpose |
|---|---|
| fastify | HTTP server and routing |
| @fastify/helmet | security headers |
| @fastify/cors | CORS handling |
| @fastify/rate-limit | request throttling |
| @fastify/compress | response compression |
| sequelize / sequelize-typescript | ORM and decorators |
| mysql2 | MySQL driver |
| zod | request validation |
| jsonwebtoken | JWT issuing/verification |
| bcryptjs | password hashing |
| winston | logging |
| http-status-codes | named status codes |

## Key Client Dependencies
| Package | Purpose |
|---|---|
| react / react-dom | UI library |
| react-router-dom | client-side routing |
| @tanstack/react-query | server state and caching |
| zustand | client state (auth) |
| react-hook-form / zod | form state and validation |
| axios | HTTP client |
| lucide-react | icons |
| tailwindcss | styling |

## Scripts Reference

### server/
| Script | Description |
|---|---|
| npm run dev | start dev server with hot reload (ts-node-dev) |
| npm run build | compile TypeScript to dist/ |
| npm start | run compiled production build |
| npm run lint / lint:fix | Airbnb-based ESLint check / autofix |
| npm run typecheck | type-check without emitting |

### client/
| Script | Description |
|---|---|
| npm run dev | start Vite dev server |
| npm run build | type-check + production build to dist/ |
| npm run preview | preview production build locally |
| npm run lint / lint:fix | Airbnb-based ESLint check / autofix |
| npm run typecheck | type-check without emitting |

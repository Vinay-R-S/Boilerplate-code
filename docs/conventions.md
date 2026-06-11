# Conventions

This project follows the Airbnb JavaScript Style Guide
(https://github.com/airbnb/javascript) for both JavaScript and TypeScript,
enforced via eslint-config-airbnb-base plus
@typescript-eslint/eslint-plugin. Run `npm run lint` / `npm run lint:fix` in
either package.

## File Naming
- Server layer files: <feature>.controller.ts, <feature>.service.ts,
  <feature>.routes.ts, <feature>.validators.ts
- Server classes/models: PascalCase (User.ts, AppError.ts)
- Server middlewares/utils: camelCase (errorHandler.ts, catchAsync.ts, env.ts)
- Client components: PascalCase, one component per file (Button.tsx)
- Client pages: PascalCase + "Page" suffix (LoginPage.tsx)
- Client hooks: camelCase with "use" prefix (useAuth.ts)
- Client services/stores: camelCase (auth.service.ts, authStore.ts)
- Zod schema files: camelCase + "Schema" suffix (loginSchema.ts)

## Function & Variable Naming
- camelCase for variables and functions
- PascalCase for classes, types, interfaces, and React components
- UPPER_SNAKE_CASE keys inside `as const` objects for constants (no enums)

## Component Structure (client)
- Named function exports, one component per file
- Props interface declared directly above the component
- Hooks called at the top of the component, before any early returns
- Presentational logic in the component, data logic in hooks/services

## Import Order (enforced by eslint import/order)
1. builtin (node:*)
2. external (npm packages)
3. internal (path aliases, e.g. @/*)
4. parent (../)
5. sibling (./)
6. index
Each group separated by a blank line, alphabetized within the group.

## Code Style
- 2-space indentation (.editorconfig)
- Single quotes, semicolons, trailing commas (Airbnb defaults)
- LF line endings, final newline, trimmed trailing whitespace
- No `any`. Use `unknown` and narrow, or a proper type/interface
- No non-null assertion (`!`) - handle null explicitly
- Prefer early returns over nested if/else
- `as const` objects instead of enums

## Error Handling Pattern (server)
- Throw `AppError(message, statusCode, isOperational?)` from services
- Routes/controllers do not need try/catch - Fastify forwards thrown errors
  to the global error handler (set via setErrorHandler)
- Only non-operational (programmer) errors are logged as errors

## API Response Format
```json
{ "success": true, "message": "string", "data": {}, "meta": {} }
```
204 No Content for deletes, no body.

## Validation
- All request validation uses Zod schemas in validators/
- Applied via the `validate({ body?, params?, query? })` preHandler
- Validation failures return 422 with `{ success: false, message, errors[] }`

## Finance / Sensitive Data Handling
- Never log KYC documents, PAN numbers, bank account numbers, or full
  client financial details
- Monetary amounts: store and compute as integers (smallest unit / paise)
  or fixed-precision decimals - never floats
- Dates for transactions/NAV: store as UTC, validate with Zod date schemas

## Comment Style
- JSDoc for exported functions where behavior is non-obvious
- Inline comments only for non-obvious logic
- TODO format: `// TODO(name): description`

## Git Commit Format
Conventional commits: feat, fix, chore, docs, refactor, test, style

globs: ["**/*.ts", "**/*.tsx"]

# TypeScript Rules (Airbnb-based)

## Types
- Never use `any` - use `unknown` and narrow, or define a proper type
- Prefer `interface` for object shapes, `type` for unions and utilities
- Explicit return types on every exported function
- Use `readonly` for data that should not be mutated
- `as const` objects instead of enums (see constants/index.ts)

## Null Safety
- strictNullChecks is on - respect it
- Use `?.` and `??`, never the non-null assertion `!`

## Patterns
- Early returns over nested if/else
- Discriminated unions for complex state shapes
- No circular imports

## Imports
- Named exports everywhere except React page components if the project
  later adds default-export-only tooling
- Import order/grouping per .eslintrc.js (import/order, alphabetized,
  newlines between groups)

## Server-specific
- Controllers: thin, only req/reply handling, delegate to services
- Services: all business logic, throw AppError for expected failures
- Routes: register plugins with FastifyInstance, attach preHandlers for
  auth and validation

## Client-specific
- One component per file, props interface above the component
- Data fetching through hooks (TanStack Query), not directly in components
- Forms use react-hook-form + the matching Zod schema from features/<feature>/

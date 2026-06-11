globs: ["server/src/routes/**", "server/src/controllers/**", "server/src/middlewares/**"]

# Security Rules

These rules apply automatically when working on server-side files.

## Input Validation
- Validate ALL external inputs with Zod schemas via validate()
- Never trust req.body, req.params, or req.query without validation
- Reject unexpected fields where practical (Zod .strict() on write payloads)

## Authentication & Authorization
- Protect routes with the authenticate preHandler
- Check resource ownership/role, not just that a token is present
- Never log token values, passwords, or full user records

## Data Exposure
- Always call toSafeJSON() (or attributes.exclude) before returning a User
- Use the apiResponse helpers (sendSuccess/sendCreated/sendNoContent) for
  every response so the envelope stays consistent

## Secrets
- Never hardcode secrets - read only through config/env.ts
- Add any new env var to server/.env.example with a placeholder value

## Database
- Always use Sequelize model methods - never raw string-concatenated SQL
- Validate and cast IDs (Number(...)) before findByPk/findOne

## Rate Limiting
- New public endpoints inherit the global @fastify/rate-limit config
- Add stricter per-route limits for sensitive endpoints (login, register)

## Finance / KYC Data (this project is a mutual fund CRM)
- Never log KYC documents, PAN/Aadhaar numbers, bank account details, or
  full client financial records, even at debug level
- Client/investor records must be scoped by ownership (advisor/RM) or role
  in every query - never return another advisor's clients without an
  explicit authorization check
- Monetary values: handle as integers/fixed-precision decimals, validate
  with Zod refinements (no negative amounts, sane upper bounds)

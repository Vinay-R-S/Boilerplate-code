# Architecture Decision Records (ADR)

Log every significant architectural or technical decision here.
Format: Date | Decision | Reason | Alternatives Considered

## Template
### ADR-000 - [Title]
- Date: YYYY-MM-DD
- Status: Accepted / Superseded / Deprecated
- Decision: [What was decided]
- Reason: [Why this choice was made]
- Alternatives: [What else was considered]
- Consequences: [What this means going forward]

## Decisions Log

### ADR-001 - Use Fastify instead of Express
- Date: 2026-06-10
- Status: Accepted
- Decision: Server framework is Fastify 5 with a buildApp() factory.
- Reason: Native TypeScript support, plugin encapsulation, async-first error
  handling, higher throughput.
- Alternatives: Express (previous version of this boilerplate).
- Consequences: Middleware is implemented as preHandlers or plugins
  (@fastify/helmet, @fastify/cors, @fastify/rate-limit, @fastify/compress).
  Errors are thrown and caught by setErrorHandler instead of next(err).

### ADR-002 - Use Zod instead of express-validator
- Date: 2026-06-10
- Status: Accepted
- Decision: All request validation (body/params/query) uses Zod schemas in
  validators/, applied through a shared validate() preHandler.
- Reason: TypeScript-first schemas, composable, can be shared with the
  client (which already uses Zod for forms).
- Alternatives: express-validator (previous version).
- Consequences: New endpoints define a schema object
  ({ body?, params?, query? }) and pass it to validate().

### ADR-003 - Project: AdvisorKhoj-CRM (workflow & MIS for AdvisorKhoj)
- Date: 2026-06-11
- Status: Accepted
- Decision: This boilerplate is being built into AdvisorKhoj-CRM, a CRM for
  structured workflow and MIS (Management Information System) for the
  AdvisorKhoj company (a mutual fund / finance business).
- Reason: Defines the domain entities (clients/investors, portfolios,
  schemes, transactions, KYC) and the heightened sensitivity of data
  handling (financial + KYC data).
- Alternatives: N/A - product direction set by stakeholder.
- Consequences: New features should be evaluated against the domain model
  in docs/architecture.md, and finance/KYC data handling rules in
  docs/conventions.md and .claude/rules/security.md apply.

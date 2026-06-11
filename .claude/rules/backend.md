globs: ["server/src/**"]

# Backend Rules (feature-wise file layout)

## Adding a new resource/feature
For a new resource (example: "clients"), create one file per layer, named
after the feature, mirroring auth and user:
- routes/clients.routes.ts - Fastify plugin, registered in routes/index.ts
  with a prefix (e.g. /clients)
- controllers/clients.controller.ts - thin handlers, call services only
- services/clients.service.ts - business logic and Sequelize queries
- validators/clients.validators.ts - Zod schemas, used via validate()
- models/Client.ts - Sequelize model (PascalCase), registered in
  config/database.ts models array

## Within each layer
- Controllers return via sendSuccess / sendCreated / sendNoContent
- Services throw AppError(message, statusCode) for expected failures
- Routes apply preHandlers in this order: validate(), then authenticate()
  if the route requires auth
- Keep route registration in routes/index.ts to one line per feature

## CRM Domain Notes
- Likely upcoming resources: clients/investors, portfolios, schemes,
  transactions (SIP/lumpsum/redemption), kyc-documents, leads, advisors
- Client/investor-scoped resources should always filter by the requesting
  advisor/RM unless the user has an admin role
- Money fields: integers/fixed-precision decimals only, never floats

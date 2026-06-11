Scaffold a new full-stack feature: $ARGUMENTS

Follow .claude/rules/backend.md and .claude/rules/frontend.md exactly.

Server:
1. Model (if needed) in models/, registered in config/database.ts
2. Validators in validators/<feature>.validators.ts (Zod)
3. Service in services/<feature>.service.ts
4. Controller in controllers/<feature>.controller.ts
5. Routes in routes/<feature>.routes.ts, registered in routes/index.ts

Client:
1. Service in services/<feature>.service.ts
2. Schema(s) in features/<feature>/ (if forms are involved)
3. Hook in hooks/use<Feature>.ts (TanStack Query)
4. Page in pages/<Feature>Page.tsx, exported from pages/index.ts and
   registered in routes/AppRouter.tsx

List every file created before writing code, and confirm before proceeding.

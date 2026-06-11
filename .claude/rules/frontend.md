globs: ["client/src/components/**", "client/src/pages/**", "client/src/features/**"]

# Frontend Rules (component-wise / page-wise organization)

## Where new code goes
- New page -> client/src/pages/<Name>Page.tsx, exported from pages/index.ts,
  registered as a route in routes/AppRouter.tsx
- New reusable UI primitive -> client/src/components/ui/<Name>.tsx, exported
  from components/ui/index.ts
- New cross-cutting component (guards, boundaries) -> components/common/
- New page shell/layout -> components/layout/
- New form schema -> client/src/features/<feature>/<name>Schema.ts
- New API calls for a feature -> client/src/services/<feature>.service.ts
- New shared hook -> client/src/hooks/use<Name>.ts, exported from hooks/index.ts

## Component Design
- One component per file, named export
- Props interface defined directly above the component
- Extract non-trivial logic into hooks, keep components declarative
- Avoid creating new top-level folders - fit new code into the existing
  components/{ui,common,layout}, features/, pages/, hooks/, services/ split

## State Management
- Local state first, lift only when needed
- Zustand (store/) for app-wide state such as auth
- TanStack Query for all server state - do not duplicate it in local state
- Never store derived data in state, compute it from existing state

## Styling
- Tailwind utility classes only, no inline styles
- Mobile-first responsive variants: sm: md: lg:
- Use the cn() helper (utils/cn.ts) for conditional class names

## Accessibility
- All interactive elements keyboard accessible
- Images have descriptive alt text
- Use semantic HTML elements (nav, main, section, article)

## Performance
- Lazy load heavy/rarely used pages with dynamic imports
- Memoize expensive calculations with useMemo
- Avoid inline anonymous functions in JSX where it causes unnecessary re-renders

## CRM-specific UI Notes
- Client/investor lists, portfolios, and transaction tables should support
  pagination, sorting, and filtering (TanStack Query + server-side params)
- Sensitive fields (PAN, bank details, KYC docs) should be masked by default
  in list views, with explicit reveal/permission checks

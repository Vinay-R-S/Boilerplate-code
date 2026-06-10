# Client — React + TypeScript + Tailwind CSS Boilerplate

Production-ready frontend following the **Airbnb JavaScript Style Guide**.

## Tech Stack

| Layer | Library | Version |
|---|---|---|
| Build Tool | Vite | 8.x |
| Framework | React | 19.x |
| Language | TypeScript | 6.x |
| Styling | Tailwind CSS | 4.x |
| Routing | React Router DOM | 7.x |
| Data Fetching | TanStack Query | 5.x |
| Global State | Zustand | 5.x |
| Forms | React Hook Form | 7.x |
| Validation | Zod | 4.x |
| HTTP Client | Axios | 1.x |
| Icons | Lucide React | 1.x |
| Linting | ESLint + Airbnb config | 8.x |

## Project Structure

```
src/
├── App.tsx                  # Root component — mounts providers
├── main.tsx                 # Entry point
├── vite-env.d.ts            # Vite env type declarations
│
├── assets/                  # Static files (images, fonts, svgs)
├── styles/
│   └── globals.css          # Tailwind import + base styles
│
├── types/
│   └── index.ts             # Shared TypeScript interfaces
│
├── utils/
│   ├── cn.ts                # Tailwind class merger (clsx + tailwind-merge)
│   ├── constants.ts         # Routes, query keys, storage keys
│   └── format.ts            # Date/string formatting helpers
│
├── lib/
│   └── apiClient.ts         # Axios instance — JWT attach + 401 redirect
│
├── services/                # Raw API calls (one file per resource)
│   ├── auth.service.ts
│   └── user.service.ts
│
├── store/                   # Zustand global stores
│   └── authStore.ts         # Auth state persisted to localStorage
│
├── hooks/                   # Custom React hooks (wrap react-query + stores)
│   ├── useAuth.ts
│   └── useUsers.ts
│
├── features/                # Feature-scoped code (schemas, etc.)
│   ├── auth/
│   │   ├── loginSchema.ts
│   │   └── registerSchema.ts
│   └── user/
│
├── components/
│   ├── ui/                  # Primitive, reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Spinner.tsx
│   │   └── index.ts         # Barrel export
│   ├── layout/              # Page-level layout wrappers
│   │   ├── MainLayout.tsx
│   │   └── AuthLayout.tsx
│   └── common/              # Route guards and shared logic
│       ├── ProtectedRoute.tsx
│       └── GuestRoute.tsx
│
├── pages/                   # One file per route, wires hooks → UI
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── DashboardPage.tsx
│   ├── UsersPage.tsx
│   └── NotFoundPage.tsx
│
└── routes/
    └── AppRouter.tsx        # All routes defined here
```

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment
```bash
cp .env.example .env.local
# Edit VITE_API_BASE_URL to point at your running server
```

### 3. Run in development
```bash
npm run dev
```
The Vite dev server proxies `/api` → `http://localhost:3000` automatically.

### 4. Build for production
```bash
npm run build
npm run preview
```

## Architecture Decisions

- **Feature-sliced structure** — `features/` holds code that belongs to a specific domain (auth schemas, user logic). `components/ui/` holds primitives that belong to no feature.
- **Services → Hooks → Pages** — raw `axios` calls live in `services/`, wrapped in `react-query` hooks in `hooks/`, consumed in `pages/`. Pages stay thin.
- **Zod + React Hook Form** — schema-first validation; the same Zod schema validates both the form client-side and can be reused server-side.
- **`cn()` utility** — `clsx` handles conditional class logic; `tailwind-merge` resolves conflicting Tailwind classes (e.g. `px-4` vs `px-6` → only `px-6` wins).
- **Tailwind v4** — uses the new `@tailwindcss/vite` plugin; no `tailwind.config.js` needed for basic usage.
- **ESLint stays on v8** — `eslint-config-airbnb` only supports ESLint 7 or 8. ESLint 10 is not yet supported.

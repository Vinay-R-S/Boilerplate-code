export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'MyApp';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  USERS: '/users',
  NOT_FOUND: '*',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'auth_user',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
} as const;

export const QUERY_KEYS = {
  AUTH: {
    ME: ['auth', 'me'] as const,
  },
  USERS: {
    ALL: ['users'] as const,
    BY_ID: (id: number) => ['users', id] as const,
  },
} as const;

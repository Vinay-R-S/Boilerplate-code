// ─── API ──────────────────────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta?: PaginationMeta;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

// ─── Pagination ───────────────────────────────────────────────────────────────
export interface PaginationMeta {
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokenPayload {
  token: string;
  user: User;
}

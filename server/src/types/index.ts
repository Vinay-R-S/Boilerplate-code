import { JwtPayload } from 'jsonwebtoken';

// FastifyRequest augmentation
declare module 'fastify' {
  interface FastifyRequest {
    user?: JwtPayload & { id: number; email: string };
  }
}

// Pagination
export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  rows: T[];
  count: number;
  totalPages: number;
  currentPage: number;
}

// Generic API Response
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
}

import apiClient from '@/lib/apiClient';
import { ApiResponse, PaginationParams, User } from '@/types';

export interface UsersResponse {
  rows: User[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export const userService = {
  getAll: async (params?: PaginationParams): Promise<UsersResponse> => {
    const { data } = await apiClient.get<ApiResponse<User[]>>('/users', { params });
    return {
      rows: data.data ?? [],
      total: (data.meta?.total as number) ?? 0,
      totalPages: (data.meta?.totalPages as number) ?? 1,
      currentPage: (data.meta?.currentPage as number) ?? 1,
    };
  },

  getById: async (id: number): Promise<User> => {
    const { data } = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return data.data!;
  },

  update: async (id: number, payload: Partial<Pick<User, 'name' | 'email'>>): Promise<User> => {
    const { data } = await apiClient.patch<ApiResponse<User>>(`/users/${id}`, payload);
    return data.data!;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};

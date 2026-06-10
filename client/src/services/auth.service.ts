import apiClient from '@/lib/apiClient';
import { ApiResponse, AuthTokenPayload, User } from '@/types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthTokenPayload> => {
    const { data } = await apiClient.post<ApiResponse<AuthTokenPayload>>('/auth/login', payload);
    return data.data!;
  },

  register: async (payload: RegisterPayload): Promise<AuthTokenPayload> => {
    const { data } = await apiClient.post<ApiResponse<AuthTokenPayload>>('/auth/register', payload);
    return data.data!;
  },

  getMe: async (): Promise<User> => {
    const { data } = await apiClient.get<ApiResponse<User>>('/auth/me');
    return data.data!;
  },
};

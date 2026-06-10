import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { userService } from '@/services/user.service';
import { PaginationParams } from '@/types';
import { QUERY_KEYS } from '@/utils/constants';

export const useUsers = (params?: PaginationParams) =>
  useQuery({
    queryKey: [...QUERY_KEYS.USERS.ALL, params],
    queryFn: () => userService.getAll(params),
  });

export const useUser = (id: number) =>
  useQuery({
    queryKey: QUERY_KEYS.USERS.BY_ID(id),
    queryFn: () => userService.getById(id),
    enabled: !!id,
  });

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.remove(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.ALL });
    },
  });
};

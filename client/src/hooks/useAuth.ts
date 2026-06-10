import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authService, LoginPayload, RegisterPayload } from '@/services/auth.service';
import useAuthStore from '@/store/authStore';
import { QUERY_KEYS } from '@/utils/constants';

const useAuth = () => {
  const queryClient = useQueryClient();
  const { setAuth, clearAuth, user, isAuthenticated } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: ({ token, user: loggedInUser }) => {
      setAuth(token, loggedInUser);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: ({ token, user: registeredUser }) => {
      setAuth(token, registeredUser);
    },
  });

  const logout = () => {
    clearAuth();
    void queryClient.clear();
  };

  const meQuery = useQuery({
    queryKey: QUERY_KEYS.AUTH.ME,
    queryFn: authService.getMe,
    enabled: isAuthenticated,
  });

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutateAsync,
    isLoginPending: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutateAsync,
    isRegisterPending: registerMutation.isPending,
    registerError: registerMutation.error,
    logout,
    meQuery,
  };
};

export default useAuth;

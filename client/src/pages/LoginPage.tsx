import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Input } from '@/components/ui';
import { loginSchema, LoginFormValues } from '@/features/auth/loginSchema';
import useAuth from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants';

const LoginPage = () => {
  const { login, isLoginPending } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      void navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      const message =
        err instanceof AxiosError
          ? (err.response?.data as { message?: string })?.message ?? 'Login failed'
          : 'Login failed';
      setError('root', { message });
    }
  };

  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">Sign in</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password')}
        />

        {errors.root && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
            {errors.root.message}
          </p>
        )}

        <Button type="submit" isLoading={isLoginPending} className="mt-2 w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link to={ROUTES.REGISTER} className="font-medium text-indigo-600 hover:underline">
          Register
        </Link>
      </p>
    </>
  );
};

export default LoginPage;

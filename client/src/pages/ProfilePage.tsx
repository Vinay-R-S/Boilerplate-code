import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, Card, Input, useToast } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import { userService } from '@/services/user.service';
import useAuthStore from '@/store/authStore';
import { formatDate } from '@/utils/format';

const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const { user } = useAuth();
  const { setAuth } = useAuthStore();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email });
    }
  }, [user, reset]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;
    try {
      const updated = await userService.update(user.id, values);
      const token = useAuthStore.getState().token ?? '';
      setAuth(token, updated);
      reset({ name: updated.name, email: updated.email });
      toast.success('Profile updated successfully');
    } catch (err) {
      const message =
        err instanceof AxiosError
          ? (err.response?.data as { message?: string })?.message ?? 'Update failed'
          : 'Update failed';
      toast.error(message);
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">My Profile</h1>

      <Card className="mb-6">
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="font-medium text-gray-500">Role</dt>
            <dd className="mt-1 capitalize text-gray-900">{user?.role}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Member since</dt>
            <dd className="mt-1 text-gray-900">
              {user?.createdAt ? formatDate(user.createdAt) : '—'}
            </dd>
          </div>
        </dl>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Edit details</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <Input
            label="Full name"
            type="text"
            autoComplete="name"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Email address"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={!isDirty}
            className="self-start"
          >
            Save changes
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;

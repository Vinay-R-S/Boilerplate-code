import useAuth from '@/hooks/useAuth';
import { formatDate } from '@/utils/format';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-gray-900">
        Welcome back, {user?.name ?? 'there'} 👋
      </h1>
      <p className="text-sm text-gray-500">
        Member since {user?.createdAt ? formatDate(user.createdAt) : '—'}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: 'Role', value: user?.role ?? '—' },
          { label: 'Email', value: user?.email ?? '—' },
          { label: 'Status', value: user?.isActive ? 'Active' : 'Inactive' },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 capitalize">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;

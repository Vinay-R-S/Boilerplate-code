import { LogOut, User } from 'lucide-react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import { APP_NAME, ROUTES } from '@/utils/constants';

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    void navigate(ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to={ROUTES.DASHBOARD} className="text-xl font-bold text-indigo-600">
            {APP_NAME}
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              to={ROUTES.PROFILE}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
            >
              <User size={16} />
              {user?.name ?? 'Profile'}
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-1.5"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

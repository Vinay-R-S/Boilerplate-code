import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthLayout from '@/components/layout/AuthLayout';
import MainLayout from '@/components/layout/MainLayout';
import GuestRoute from '@/components/common/GuestRoute';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import DashboardPage from '@/pages/DashboardPage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProfilePage from '@/pages/ProfilePage';
import RegisterPage from '@/pages/RegisterPage';
import UsersPage from '@/pages/UsersPage';
import { ROUTES } from '@/utils/constants';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Guest-only routes — redirect to dashboard if already logged in */}
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>
      </Route>

      {/* Protected routes — redirect to login if not authenticated */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<DashboardPage />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.USERS} element={<UsersPage />} />
        </Route>
      </Route>

      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;

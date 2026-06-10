import { Navigate, Outlet } from 'react-router-dom';

import useAuthStore from '@/store/authStore';
import { ROUTES } from '@/utils/constants';

const GuestRoute = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;

import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useAuthStore from '@/store/authStore';
import { ROUTES } from '@/utils/constants';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

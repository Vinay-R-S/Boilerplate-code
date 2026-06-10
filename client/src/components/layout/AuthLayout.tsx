import { Outlet } from 'react-router-dom';

import { APP_NAME } from '@/utils/constants';

const AuthLayout = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
    <div className="w-full max-w-md">
      <h1 className="mb-8 text-center text-3xl font-bold text-indigo-600">{APP_NAME}</h1>
      <div className="rounded-xl bg-white p-8 shadow-md">
        <Outlet />
      </div>
    </div>
  </div>
);

export default AuthLayout;

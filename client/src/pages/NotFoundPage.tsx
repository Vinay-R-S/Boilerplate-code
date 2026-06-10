import { Link } from 'react-router-dom';

import { Button } from '@/components/ui';
import { ROUTES } from '@/utils/constants';

const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
    <p className="text-8xl font-bold text-indigo-200">404</p>
    <h1 className="text-2xl font-semibold text-gray-900">Page not found</h1>
    <p className="max-w-sm text-gray-500">
      The page you&apos;re looking for doesn&apos;t exist or has been moved.
    </p>
    <Link to={ROUTES.HOME}>
      <Button>Go home</Button>
    </Link>
  </div>
);

export default NotFoundPage;

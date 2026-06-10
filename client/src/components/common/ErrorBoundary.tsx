import { Component, ErrorInfo, ReactNode } from 'react';

import { Button } from '@/components/ui';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // In production, send to an error-tracking service like Sentry
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) return fallback;

      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="text-5xl">⚠️</p>
          <h1 className="text-2xl font-semibold text-gray-900">Something went wrong</h1>
          <p className="max-w-sm text-sm text-gray-500">
            {error?.message ?? 'An unexpected error occurred.'}
          </p>
          <div className="flex gap-3">
            <Button onClick={this.handleReset}>Try again</Button>
            <Button variant="secondary" onClick={() => window.location.assign('/')}>
              Go home
            </Button>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;

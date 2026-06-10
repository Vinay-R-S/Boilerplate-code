import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from 'lucide-react';
import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from 'react';

import cn from '@/utils/cn';

// ─── Types ────────────────────────────────────────────────────────────────────
type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toasts: Toast[];
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
  };
  dismiss: (id: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Icons & styles ───────────────────────────────────────────────────────────
const toastConfig: Record<
  ToastType,
  { icon: typeof CheckCircle; containerClass: string; iconClass: string }
> = {
  success: {
    icon: CheckCircle,
    containerClass: 'border-green-200 bg-green-50',
    iconClass: 'text-green-500',
  },
  error: {
    icon: XCircle,
    containerClass: 'border-red-200 bg-red-50',
    iconClass: 'text-red-500',
  },
  warning: {
    icon: AlertTriangle,
    containerClass: 'border-yellow-200 bg-yellow-50',
    iconClass: 'text-yellow-500',
  },
  info: {
    icon: Info,
    containerClass: 'border-indigo-200 bg-indigo-50',
    iconClass: 'text-indigo-500',
  },
};

// ─── Provider ─────────────────────────────────────────────────────────────────
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const add = useCallback((type: ToastType, message: string) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (message: string) => add('success', message),
    error: (message: string) => add('error', message),
    warning: (message: string) => add('warning', message),
    info: (message: string) => add('info', message),
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      {/* Toast renderer */}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      >
        {toasts.map((t) => {
          const { icon: Icon, containerClass, iconClass } = toastConfig[t.type];
          return (
            <div
              key={t.id}
              role="alert"
              className={cn(
                'flex w-80 items-start gap-3 rounded-lg border p-4 shadow-md',
                'animate-in slide-in-from-right-4 fade-in duration-200',
                containerClass,
              )}
            >
              <Icon size={18} className={cn('mt-0.5 shrink-0', iconClass)} />
              <p className="flex-1 text-sm text-gray-800">{t.message}</p>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className="shrink-0 text-gray-400 hover:text-gray-600"
                aria-label="Dismiss notification"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used inside <ToastProvider>');
  }
  return ctx;
};

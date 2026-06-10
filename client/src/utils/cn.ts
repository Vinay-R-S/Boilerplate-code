import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS class names, resolving conflicts correctly.
 * Uses clsx for conditional logic and tailwind-merge for deduplication.
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-blue-500', 'px-6')
 * // → 'py-2 bg-blue-500 px-6'  (px-4 is overridden by px-6)
 */
const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export default cn;

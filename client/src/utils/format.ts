/**
 * Formats an ISO date string to a human-readable date.
 * @example formatDate('2024-01-15T10:30:00Z') → 'Jan 15, 2024'
 */
export const formatDate = (isoString: string): string =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(isoString));

/**
 * Truncates a string to the given max length, appending '…'.
 */
export const truncate = (str: string, maxLength: number): string =>
  str.length <= maxLength ? str : `${str.slice(0, maxLength)}…`;

/**
 * Capitalises the first letter of a string.
 */
export const capitalise = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

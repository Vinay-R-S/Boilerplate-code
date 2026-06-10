import { useEffect, useState } from 'react';

/**
 * Returns a debounced version of the value that only updates
 * after the specified delay has elapsed with no new changes.
 *
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 400);
 * // use debouncedSearch in your query instead of searchTerm
 */
const useDebounce = <T>(value: T, delay = 400): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

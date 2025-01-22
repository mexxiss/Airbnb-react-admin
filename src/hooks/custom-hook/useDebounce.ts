import { useState, useEffect } from "react";

/**
 * useDebounce Hook
 * @param value The value to debounce
 * @param delay Delay in milliseconds
 * @returns The debounced value
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Only update if the value actually changes
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Cleanup timeout
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

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
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Cleanup timeout on value or delay change
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

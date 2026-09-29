import { useEffect, useState } from "react";

export default function useDebounce<T>(
  value: T,
  setpage: (page: number) => void,
  delay: number = 500,
) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setpage(1);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay, setpage]);
  return debouncedValue;
}

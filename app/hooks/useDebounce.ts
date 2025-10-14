import { useRef } from "react";

export const useDebounce = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounce = (func: () => void, time?: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      func();
      timeoutRef.current = null;
    }, time || 300);
  };

  return { debounce };
};

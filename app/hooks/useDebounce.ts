export const useDebounce = () => {
  let timeout = null;

  const debounce = (func: () => void, time?: number) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(func, time || 3000);
  };

  return { debounce };
};

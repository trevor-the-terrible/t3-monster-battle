import superjson from 'superjson';

const CACHE_KEY = 'th:pk:';

export const getLocalCache = <T>(path: string): T | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const cached = window.localStorage.getItem(CACHE_KEY + path);
  if (!cached) {
    return null;
  }
  return superjson.parse(cached);
};

export const setLocalCache = (path: string, value: unknown) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(CACHE_KEY + path, superjson.stringify(value));
};

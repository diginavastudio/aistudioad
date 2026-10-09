
import React from 'react';

// Hook untuk menyimpan state ke LocalStorage agar data tidak hilang saat refresh
export function useStickyState<T>(defaultValue: T, key: string): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = React.useState<T>(() => {
    try {
      const stickyValue = window.localStorage.getItem(key);
      // VALIDASI: Pastikan stickyValue valid JSON, jika error/null kembalikan defaultValue
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    } catch (error) {
      console.warn(`Gagal membaca LocalStorage key "${key}". Menggunakan default value.`, error);
      return defaultValue;
    }
  });

  React.useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Gagal menulis ke LocalStorage key "${key}".`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

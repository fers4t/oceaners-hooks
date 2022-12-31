import { useState, useEffect } from 'react';

// A simple hook to debounce value.
function useDebounce<T>(value: T, delay: number) {
   const [debouncedValue, setDebouncedValue] = useState(value);

   useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedValue(value);
      }, delay);

      return () => {
         clearTimeout(handler);
      };
   }, [value, delay]);

   return debouncedValue;
}

export default useDebounce;

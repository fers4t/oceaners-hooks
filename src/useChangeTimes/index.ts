import { useEffect, useRef } from 'react';

export function useChangeTimes<T>(value: T): number {
   const count = useRef(0);
   const previousValue = useRef<T>();

   useEffect(() => {
      if (value !== previousValue.current) {
         count.current++;
         previousValue.current = value;
      }
   }, [value]);

   return count.current;
}

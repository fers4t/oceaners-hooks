import { useEffect, useRef } from 'react';
import { usePrevious } from '../usePrevious';

export function useChangeTimes<T>(value: T): number {
   const count = useRef(0);
   const previousValue = usePrevious(value);
   const mounted = useRef(false);
   useEffect(() => {
      mounted.current = true;
   }, []);

   if (mounted.current && value !== previousValue) {
      count.current++;
   }

   return count.current;
}

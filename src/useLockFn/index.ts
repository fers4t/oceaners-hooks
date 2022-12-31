import { useRef, useCallback } from 'react';

/**
 * Add lock to an async function to prevent parallel executions.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-constraint
function useLockFn<P extends any[] = any[], V extends any = any>(fn: (...args: P) => Promise<V>) {
   const lockRef = useRef(false);

   return useCallback(
      async (...args: P) => {
         if (lockRef.current) return;
         lockRef.current = true;
         try {
            const ret = await fn(...args);
            lockRef.current = false;
            return ret;
         } catch (e) {
            lockRef.current = false;
            throw e;
         }
      },
      [fn]
   );
}

export { useLockFn };

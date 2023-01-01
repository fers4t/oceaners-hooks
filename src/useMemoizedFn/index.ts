import { useMemo, useRef } from 'react';

type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>;

/**
 * Almost same as useCallback, but it will not memorize the function if the dependencies changed.
 * With useMemoizedFn, you can use the memorized function.
 * If component rerendered, the memorized function's ref will not change.
 *
 * @param fn - The function to be memoized
 * @returns A memoized version of the provided function
 */
function useMemoizedFn<T extends noop>(fn: T) {
   // Create a ref to store the memoized function
   const memoizedFn = useRef<PickFunction<T>>();

   // If the memoized function has not been created yet, create it
   if (!memoizedFn.current) {
      memoizedFn.current = function (this, ...args) {
         return fn.apply(this, args);
      };
   }

   // Return a memoized version of the function using useMemo
   return useMemo(() => memoizedFn.current, [fn]);
}

export { useMemoizedFn };

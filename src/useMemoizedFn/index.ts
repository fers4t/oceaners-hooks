import { useMemo, useRef } from 'react';
import { isDev, isFunction } from '../misc';

type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>;

function useMemoizedFn<T extends noop>(fn: T) {
   if (isDev) {
      if (!isFunction(fn)) {
         console.error(`useMemoizedFn expected parameter is a function, got ${typeof fn}`);
      }
   }
   const fnRef = useRef<T>(fn);

   fnRef.current = useMemo(() => fn, [fn]);

   const memoizedFn = useRef<PickFunction<T>>();
   if (!memoizedFn.current) {
      memoizedFn.current = function (this, ...args) {
         return fnRef.current.apply(this, args);
      };
   }

   return memoizedFn.current as T;
}

export { useMemoizedFn };

// https://ahooks.js.org/hooks/use-memoized-fn

import debounce from 'lodash/debounce';
import { useMemo } from 'react';
import { isDev, isFunction } from '../misc';
import { useLatest } from '../useLatest';
import { useUnmount } from '../useUnmount';

type noop = (...args: any[]) => any;

function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions) {
   if (isDev) {
      if (!isFunction(fn)) {
         console.error(`useDebounceFn expected parameter is a function, got ${typeof fn}`);
      }
   }

   const fnRef = useLatest(fn);

   const wait = options?.wait ?? 1000;

   const debounced = useMemo(
      () =>
         debounce(
            (...args: Parameters<T>): ReturnType<T> => {
               return fnRef.current(...args);
            },
            wait,
            options
         ),
      []
   );

   useUnmount(() => {
      debounced.cancel();
   });

   return {
      run: debounced,
      cancel: debounced.cancel,
      flush: debounced.flush
   };
}

export { useDebounceFn };

export interface DebounceOptions {
   leading?: boolean;
   maxWait?: number;
   trailing?: boolean;
   wait?: number;
}

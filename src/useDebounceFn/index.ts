import debounce from 'lodash/debounce';
import { useMemo } from 'react';
import { isDev, isFunction } from '../misc';
import { useUnmount } from '../useUnmount';

type noop = (...args: any[]) => any;

/**
 * Prevents a function from being called more than once within a specified time.
 * @example
 * const [value, setValue] = useState(0);
   const { run } = useDebounceFn(
      () => {
         setValue(value + 1);
      },
      {
         wait: 500
      }
   );

   return (
      <div>
         <p style={{ marginTop: 16 }}> Clicked count: {value} </p>
         <button type="button" onClick={run}>
            Click fast!
         </button>
      </div>
   );
 */
function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions) {
   if (isDev) {
      if (!isFunction(fn)) {
         console.error(`useDebounceFn expected parameter is a function, got ${typeof fn}`);
      }
   }

   const wait = options?.wait ?? 1000;

   const debounced = useMemo(
      () =>
         debounce(
            (...args: Parameters<T>): ReturnType<T> => {
               return fn(...args);
            },
            wait,
            options
         ),
      [fn, wait, options]
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

`
const [value, setValue] = useState(0);
   const { run } = useDebounceFn(
      () => {
         setValue(value + 1);
      },
      {
         wait: 500
      }
   );

   return (
      <div>
         <p style={{ marginTop: 16 }}> Clicked count: {value} </p>
         <button type="button" onClick={run}>
            Click fast!
         </button>
      </div>
   );
`;

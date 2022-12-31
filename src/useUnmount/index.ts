import { useEffect } from 'react';
import { isDev, isFunction } from '../misc';
import { useLatest } from '../useLatest';

const useUnmount = (fn: () => void) => {
   if (isDev) {
      if (!isFunction(fn)) {
         console.error(`useUnmount expected parameter is a function, got ${typeof fn}`);
      }
   }

   const fnRef = useLatest(fn);

   useEffect(
      () => () => {
         fnRef.current();
      },
      []
   );
};

export { useUnmount };

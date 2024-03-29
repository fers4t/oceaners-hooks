import { useRef } from 'react';
import type { useEffect, useLayoutEffect } from 'react';

type EffectHookType = typeof useEffect | typeof useLayoutEffect;

// does not run effect on first render
const createSafeEffect: (hook: EffectHookType) => EffectHookType = (hook) => (effect, deps) => {
   const isMounted = useRef(false);

   // for react-refresh
   hook(() => {
      return () => {
         isMounted.current = false;
      };
   }, []);

   hook(() => {
      if (!isMounted.current) {
         isMounted.current = true;
      } else {
         return effect();
      }
   }, deps);
};

export { createSafeEffect };

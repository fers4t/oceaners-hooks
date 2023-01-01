import React, { useRef, useEffect } from 'react';

type Ref<T> = React.MutableRefObject<T> | ((instance: T | null) => void);

export function mergeRefs<T>(...refs: Ref<T>[]) {
   const targetRef = useRef<T>(null);

   useEffect(() => {
      refs.forEach((ref) => {
         if (!ref) return;

         if (typeof ref === 'function') {
            ref(targetRef.current);
         } else {
            ref.current = targetRef.current;
         }
      });
   }, [refs]);

   return targetRef;
}

export function useMergedRef<T>(...refs: Ref<T>[]) {
   return mergeRefs(...refs);
}

export function assignRef<T>(ref: Ref<T>, value: T) {
   if (typeof ref === 'function') {
      ref(value);
   } else if (ref) {
      ref.current = value;
   }
}

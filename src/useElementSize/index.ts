import { useState, useCallback } from 'react';
import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';
import { useWindowEvent } from '../useWindowEvent';

interface Size {
   height: number;
   width: number;
}

/**
 *
 * @example[squareRef, { width, height }] = useElementSize<HTMLDivElement>();
 * @returns [setRef, size]
 */
function useElementSize<T extends HTMLElement = HTMLDivElement>(): [(node: T | null) => void, Size] {
   // Mutable values like 'ref.current' aren't valid dependencies
   // because mutating them doesn't re-render the component.
   // Instead, we use a state as a ref to be reactive.
   const [ref, setRef] = useState<T | null>(null);
   const [size, setSize] = useState<Size>({
      width: 0,
      height: 0
   });

   // Prevent too many rendering using useCallback
   const handleSize = useCallback(() => {
      if (ref) {
         setSize({
            width: ref.offsetWidth,
            height: ref.offsetHeight
         });
      }
   }, [ref]);

   useWindowEvent('resize', handleSize, {
      capture: true
   });

   useIsomorphicLayoutEffect(() => {
      handleSize();
   }, [ref]);

   return [setRef, size];
}

export default useElementSize;

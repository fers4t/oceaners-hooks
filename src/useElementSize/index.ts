// https://usehooks-ts.com/react-hook/use-element-size
import { useCallback, useState } from 'react';
// See: https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
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
      setSize({
         width: ref?.offsetWidth || 0,
         height: ref?.offsetHeight || 0
      });
   }, [ref?.offsetHeight, ref?.offsetWidth]);

   useWindowEvent('resize', handleSize, {
      capture: true
   });

   useIsomorphicLayoutEffect(() => {
      handleSize();
   }, [ref?.offsetHeight, ref?.offsetWidth]);

   return [setRef, size];
}

export default useElementSize;

import { useState, useLayoutEffect } from 'react';

export type UseMeasureRect<T> = Pick<
   DOMRectReadOnly,
   'x' | 'y' | 'top' | 'left' | 'right' | 'bottom' | 'height' | 'width'
>;
export type UseMeasureRef<T> = (elementOrRef: T) => void;
export type UseMeasureResult<T> = [UseMeasureRef<T>, UseMeasureRect<T>];

function useMeasure<T>(): UseMeasureResult<T> {
   const [elementOrRef, setElementOrRef] = useState<T>(null!);
   const [rect, setRect] = useState<UseMeasureRect<T>>({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
   });

   useLayoutEffect(() => {
      if (!elementOrRef) return;
      const observer = new ResizeObserver((entries) => {
         if (entries[0]) {
            const { x, y, width, height, top, left, bottom, right } = entries[0].contentRect;
            setRect({ x, y, width, height, top, left, bottom, right });
         }
      });

      let element: Element | null = null;
      if (typeof elementOrRef === 'function') {
         element = elementOrRef();
      } else {
         element = elementOrRef as Element;
      }

      if (!element) return;
      observer.observe(element);
      return () => {
         observer.disconnect();
      };
   }, [elementOrRef]);

   return [setElementOrRef, rect];
}

export { useMeasure };

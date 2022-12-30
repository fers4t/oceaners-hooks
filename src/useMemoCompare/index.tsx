import { useEffect, useRef } from 'react';

function useMemoCompare(
   next: unknown,
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   compare: (a: any, b: any) => boolean
) {
   // Ref for storing previous value
   const previousRef = useRef<unknown>();
   const previous = previousRef.current;
   const isEqual = previous ? compare(previous, next) : false;
   // If not equal update previousRef to next value.
   // We only update if not equal so that this hook continues to return
   // the same old value if compare keeps returning true.

   useEffect(() => {
      if (!isEqual) {
         previousRef.current = next;
      }
   });
   // Finally, if equal then return the previous value
   return isEqual ? previous : next;
}

export { useMemoCompare };

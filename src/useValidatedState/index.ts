import { useCallback, useRef, useState } from 'react';

export interface ValidationResult {
   changed: boolean;
   valid?: boolean;
}

/**
 * Returns a state that changes only if the next value passes its validator
 */
const useValidatedState = <TValue, TValidator extends (value: TValue) => boolean>(
   validator: TValidator,
   initialValue?: TValue
): [TValue, (nextValue: TValue) => void, ValidationResult] => {
   const [state, setState] = useState<TValue>(initialValue);
   const validation = useRef<ValidationResult>({ changed: false });

   // We use useCallback here to prevent unnecessary re-renders.
   // The dependency array ensures that the callback only changes if validator changes.
   const onChange = useCallback(
      (nextValue: TValue) => {
         setState(nextValue);
         validation.current = { changed: true, valid: validator(nextValue) };
      },
      [validator]
   );

   return [state, onChange, validation.current];
};

export default useValidatedState;

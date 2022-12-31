// https://github.com/kitze/react-hanger/blob/master/src/useNumber.ts
import { useMemo } from 'react';
import { UseStateful } from '../useStateful';
import useNumberArray, { UseNumberActions } from '../misc/useNumber';

export type UseNumber = UseStateful<number> & UseNumberActions;

export function useNumber(
   initial: number,
   options: {
      loop?: boolean;
      lowerLimit?: number;
      step?: number;
      upperLimit?: number;
   } = {}
): UseNumber {
   const [value, actions] = useNumberArray(initial, options);
   return useMemo(
      () => ({
         value,
         ...actions
      }),
      [actions, value]
   );
}

export default useNumber;

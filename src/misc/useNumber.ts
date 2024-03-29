import { default as React, SetStateAction, useCallback, useMemo, useState } from 'react';

export type UseNumberActions = {
   decrease: (value?: number) => void;
   increase: (value?: number) => void;
   setValue: React.Dispatch<SetStateAction<number>>;
};
export type UseNumber = [number, UseNumberActions];

export function useNumber(
   initial: number,
   {
      upperLimit,
      lowerLimit,
      loop,
      step = 1
   }: {
      loop?: boolean;
      lowerLimit?: number;
      step?: number;
      upperLimit?: number;
   } = {}
): UseNumber {
   const [value, setValue] = useState<number>(initial);
   const decrease = useCallback(
      (d?: number) => {
         setValue((aValue) => {
            const decreaseBy = d !== undefined ? d : step;
            const nextValue = aValue - decreaseBy;

            if (lowerLimit !== undefined) {
               if (nextValue < lowerLimit) {
                  if (loop && upperLimit) {
                     return upperLimit;
                  }

                  return lowerLimit;
               }
            }

            return nextValue;
         });
      },
      [loop, lowerLimit, step, upperLimit]
   );
   const increase = useCallback(
      (i?: number) => {
         setValue((aValue) => {
            const increaseBy = i !== undefined ? i : step;
            const nextValue = aValue + increaseBy;

            if (upperLimit !== undefined) {
               if (nextValue > upperLimit) {
                  if (loop && lowerLimit) {
                     return lowerLimit;
                  }
                  return upperLimit;
               }
            }

            return nextValue;
         });
      },
      [loop, step, upperLimit, lowerLimit]
   );
   const actions = useMemo(
      () => ({
         setValue,
         increase,
         decrease
      }),
      [decrease, increase]
   );
   return [value, actions];
}

export default useNumber;

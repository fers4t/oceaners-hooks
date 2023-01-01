// updateCause.ts

import { useEffect, useRef } from 'react';
import { isDeepEqual } from '../misc/isDeepEqual';
import { isShallowEqual } from '../misc/isShallowEqual';

export type UpdateCause = {
   currentValue: any;
   deepEquals: boolean;
   previousValue: any;
   propName: string;
   shallowEquals: boolean;
};

export type UseUpdateCauseProps<T> = {
   onPropsChange: (causes: UpdateCause[]) => void;
   print?: boolean;
   props: T;
};

export function useUpdateCause<T extends Record<string, any>>({
   props,
   onPropsChange,
   print = true
}: UseUpdateCauseProps<T>) {
   const previousProps = useRef<T>();

   useEffect(() => {
      if (!previousProps.current) {
         previousProps.current = props;
         return;
      }

      const causes = findUpdateCause(previousProps.current, props);
      previousProps.current = props;

      if (print && causes.length) {
         console.warn('Component updated from props changes');
         console.table(
            causes.reduce((acc, c) => ({ ...acc, [c.propName]: c }), {}),
            ['previousValue', 'currentValue', 'shallowEquals', 'deepEquals']
         );
      }

      if (causes.length) {
         onPropsChange(causes);
      }
   }, [props]);
}

export function findUpdateCause<T extends Record<string, any>>(previous: T, current: T): UpdateCause[] {
   const causes = [] as UpdateCause[];
   const keys = Object.keys(previous);

   for (const key of keys) {
      const previousValue = previous[key];
      const currentValue = current[key];

      if (previousValue !== currentValue) {
         causes.push({
            previousValue,
            currentValue,
            propName: key,
            shallowEquals: isShallowEqual(previousValue, currentValue),
            deepEquals: isDeepEqual(previousValue, currentValue)
         });
      }
   }

   return causes;
}

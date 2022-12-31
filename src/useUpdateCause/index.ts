import shallowEquals from 'shallowequal';
import deepEquals from 'fast-deep-equal';
import { usePrevious } from '../usePrevious';
import keyBy from 'lodash/keyBy';

export function useUpdateCause<T extends Record<string, any>>(props: T, print = true): UpdateCause[] {
   const previous = usePrevious(props);

   if (previous === undefined) {
      return [];
   }

   const causes = findUpdateCause(previous, props);

   if (print && causes.length) {
      /* eslint-disable no-console */
      console.warn('Component updated from props changes');
      console.table(
         keyBy(causes, (c) => c.propName),
         ['previousValue', 'currentValue', 'shallowEquals', 'deepEquals']
      );
      /* eslint-enable no-console */
   }

   return causes;
}

export interface UpdateCause {
   currentValue: any;
   deepEquals: boolean;
   previousValue: any;
   propName: string;
   shallowEquals: boolean;
}

export function findUpdateCause<T extends Record<string, any>>(previous: T, current: T): UpdateCause[] {
   const causes = [] as UpdateCause[];
   const keys = Object.keys(previous);

   for (const key of keys) {
      const previousValue = previous[key];
      const currentValue = current[key];

      if (previousValue !== currentValue) {
         const cause: UpdateCause = {
            previousValue,
            currentValue,
            propName: key,
            shallowEquals: shallowEquals(previousValue, currentValue),
            deepEquals: deepEquals(previousValue, currentValue)
         };
         causes.push(cause);
      }
   }

   return causes;
}

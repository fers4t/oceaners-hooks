import { useEffect, useRef } from 'react';

type DeepReadonly<T> = T extends (infer R)[]
   ? DeepReadonlyArray<R>
   : T extends object
   ? DeepReadonlyObject<T>
   : T;

type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>;

type DeepReadonlyObject<T> = {
   readonly [P in keyof T]: DeepReadonly<T[P]>;
};

type EqualityChecker<T> = (a: DeepReadonly<T>, b: DeepReadonly<T>) => boolean;

export function useObjectEffect<T>(
   value: T,
   equalityChecker: EqualityChecker<T> = (a, b) =>
      JSON.stringify(a) === JSON.stringify(b)
): T {
   const ref = useRef<DeepReadonly<T>>();
   const isFirstRender = useRef(true);

   if (isFirstRender.current) {
      ref.current = value as DeepReadonly<T>;
      isFirstRender.current = false;
   }

   useEffect(() => {
      const immutableValue = deepFreeze(value);
      if (!equalityChecker(ref.current!, immutableValue)) {
         ref.current = immutableValue as DeepReadonly<T>;
      }
   }, [value, equalityChecker]);

   return ref.current as T;
}

function deepFreeze<T>(obj: T): DeepReadonly<T> {
   if (typeof obj !== 'object' || obj === null) {
      return obj as DeepReadonly<T>;
   }

   const props = Object.getOwnPropertyNames(obj);
   for (const prop of props) {
      const value = (obj as any)[prop];
      if (typeof value === 'object' && value !== null) {
         (obj as any)[prop] = deepFreeze(value);
      }
   }

   return Object.freeze(obj) as DeepReadonly<T>;
}

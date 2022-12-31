import type { DependencyList } from 'react';
import { useEffect, useRef } from 'react';

type Effect = (changes?: number[], previousDeps?: DependencyList, currentDeps?: DependencyList) => void | (() => void);

const diffTwoDeps = (deps1?: DependencyList, deps2?: DependencyList) => {
   return deps1
      ? deps1.map((_ele, idx) => (!Object.is(deps1[idx], deps2?.[idx]) ? idx : -1)).filter((ele) => ele >= 0)
      : deps2
      ? deps2.map((_ele, idx) => idx)
      : [];
};

/**
 * A hook of useEffect that allow us to track which dependencies caused the effect to trigger.
 * @example useTrackedEffect(
        (changes) => {
            console.log('Index of changed dependencies: ', changes);
        },
        [count, count2],
    );
 */
const useTrackedEffect = (effect: Effect, deps?: DependencyList) => {
   const previousDepsRef = useRef<DependencyList>();

   useEffect(() => {
      const changes = diffTwoDeps(previousDepsRef.current, deps);
      const previousDeps = previousDepsRef.current;
      previousDepsRef.current = deps;
      return effect(changes, previousDeps, deps);
   }, deps);
};

export { useTrackedEffect };

import { useEffect, useRef } from 'react';

function useTrackedEffect(effect, dependencies) {
   const previousDependencies = useRef([]);
   useEffect(() => {
      const changedDependencies = dependencies.filter(
         (dep, index) => !Object.is(dep, previousDependencies.current[index])
      );
      previousDependencies.current = dependencies;
      console.log('Changed dependencies:', changedDependencies);
      return effect();
   }, dependencies);
}

export { useTrackedEffect };

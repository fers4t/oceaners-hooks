import { useEffect } from 'react';
import { useMemoizedFn } from '../useMemoizedFn';
import { useSafeState } from '../useSafeState';
import { useWindowEvent } from '../useWindowEvent';

function useWindowResize(): { height: number; width: number } {
   const [dimensions, setDimensions] = useSafeState<{ height: number; width: number }>({ width: 0, height: 0 });

   const resize = useMemoizedFn(() => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
   });
   useEffect(() => {
      if (!window) return;
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
   }, []);

   useWindowEvent('resize', resize);

   return { ...dimensions };
}

export default useWindowResize;

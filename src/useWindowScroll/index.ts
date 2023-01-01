import { useEffect } from 'react';
import { isBrowser } from '../misc';
import { useMemoizedFn } from '../useMemoizedFn';
import { useSafeState } from '../useSafeState';
import { useWindowEvent } from '../useWindowEvent';

function useWindowScroll(): { x: number; y: number } {
   const [scrollPosition, setScrollPosition] = useSafeState<{ x: number; y: number }>();

   const scroll = useMemoizedFn(() => {
      setScrollPosition({ x: window.scrollX, y: window.scrollY });
   });

   useWindowEvent('scroll', scroll);

   useEffect(() => {
      if (!isBrowser) return;
      setScrollPosition({ x: window.scrollX, y: window.scrollY });
   }, []);

   return { ...scrollPosition };
}

export default useWindowScroll;

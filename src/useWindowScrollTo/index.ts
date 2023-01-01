import useDeepCompareEffect from '../useDeepCompareEffect';
import { useMemoizedFn } from '../useMemoizedFn';
import { useSafeState } from '../useSafeState';
import { useWindowEvent } from '../useWindowEvent';

function useWindowScrollTo({ x, y, duration = 200 }: { duration?: number; x?: number; y?: number }): void {
   const [isScrolling, setIsScrolling] = useSafeState<boolean>(false);

   const scroll = useMemoizedFn(() => {
      if (isScrolling) {
         window.scrollTo(x, y);
         setIsScrolling(false);
      }
   });

   useWindowEvent('scroll', () => scroll);

   useDeepCompareEffect(() => {
      setIsScrolling(true);
      window.scrollTo({ top: y, left: x, behavior: 'smooth' });
   }, [x, y, duration]);
}

export default useWindowScrollTo;

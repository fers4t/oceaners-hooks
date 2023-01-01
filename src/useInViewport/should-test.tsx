import React, { useState } from 'react';

export interface InviewPortType {
   callback: () => void;
   freezeOnceVisible?: boolean;
   options?: IntersectionObserverInit | undefined;
   target: HTMLElement | null;
}
/**
 * @example
 *    const inView = useInViewport({
         target: ref.current,
         callback: () => { // runs on in view
            console.log('inView');
         }
      });

      console.log({ inView }); // true or false
 * @param
 * @returns {inView: boolean}
 */
const useInViewport = ({
   target,
   options = { root: null, rootMargin: `0%`, threshold: 0 },
   callback,
   freezeOnceVisible = false
}: InviewPortType) => {
   const [observerState, setObserverState] = useState<IntersectionObserver>();
   const [inView, setinView] = useState<boolean>(false);

   const _funCallback: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
   ) => {
      entries.map((entry: IntersectionObserverEntry) => {
         if (entry.isIntersecting) {
            setinView(true);
            callback();
            //  ---- IF TRUE WE WILL UNOBSERVER AND FALSE IS NO
            if (freezeOnceVisible) {
               observer.unobserve(entry.target);
            }
         } else {
            setinView(false);
         }
         return true;
      });
   };

   React.useEffect(() => {
      if (!window) return;
      if (typeof window.IntersectionObserver === 'undefined') {
         console.error('window.IntersectionObserver === undefined! => Your Browser is Notsupport');
         return;
      }
      const observer = new IntersectionObserver(_funCallback, options);
      setObserverState(observer);
   }, []);

   React.useEffect(() => {
      if (!observerState || !target) return;
      target && observerState.observe(target);
   }, [target, observerState]);

   return inView;
};

export { useInViewport };

import { useEffect, useRef, useState } from 'react';
import { BasicTarget, getTargetElement } from '../types';
import useEffectWithTarget from '../useEffectWithTarget';

export interface Options {
   root?: BasicTarget<Element>;
   rootMargin?: string;
   threshold?: number | number[];
}

interface Props {
   options?: Options;
   target?: BasicTarget;
}

function useInViewport(props?: Props) {
   const { options, target } = props || {};
   const [state, setState] = useState<boolean>();
   const [ratio, setRatio] = useState<number>();
   const componentRef = useRef(null);
   const [_target, setTarget] = useState<BasicTarget | null>(target ?? null);

   useEffect(() => {
      if (!componentRef || _target) return;
      setTarget(componentRef.current);
   }, [componentRef.current, _target]);

   useEffectWithTarget(
      () => {
         if (!_target) return console.warn('target is not defined and ref does not used on an element');
         const el = getTargetElement(_target);
         if (!el) {
            return;
         }

         const observer = new IntersectionObserver(
            (entries) => {
               for (const entry of entries) {
                  setRatio(entry.intersectionRatio);
                  setState(entry.isIntersecting);
               }
            },
            {
               ...options,
               root: getTargetElement(options?.root)
            }
         );

         observer.observe(el);

         return () => {
            observer.disconnect();
         };
      },
      [options?.rootMargin, options?.threshold],
      _target
   );

   return { state, ratio, ref: componentRef };
}

export { useInViewport };

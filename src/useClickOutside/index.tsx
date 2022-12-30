import { useEffect, useRef } from 'react';

const DEFAULT_EVENTS = ['mousedown', 'touchstart'];

export function useClickOutside<T extends HTMLElement>(
   handler: () => void,
   events?: string[] | null,
   nodes?: HTMLElement[]
) {
   const ref = useRef<T>();

   useEffect(() => {
      const listener = (event) => {
         const { target } = event ?? {};
         if (Array.isArray(nodes)) {
            const shouldIgnore = target?.hasAttribute('data-ignore-outside-clicks') || !document.body.contains(target);
            const shouldTrigger = nodes.every((node) => !!node && !node.contains(target));
            shouldTrigger && !shouldIgnore && handler();
         } else if (ref.current && !ref.current.contains(target)) {
            handler();
         }
      };

      (events || DEFAULT_EVENTS).forEach((fn) => document.addEventListener(fn, listener));

      return () => {
         const a = events || DEFAULT_EVENTS;
         a.forEach((fn) => document.removeEventListener(fn, listener));
      };
   }, [ref, handler, nodes]);

   return ref;
}

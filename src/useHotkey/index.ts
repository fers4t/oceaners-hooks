import { useEffect, useRef } from 'react';

type HotkeyHandler = (event: KeyboardEvent) => void;

interface Hotkey {
   handler: HotkeyHandler;
   key: string;
}

interface Options {
   target?: HTMLElement | React.RefObject<HTMLElement>;
}

function useHotkey(hotkey: Hotkey, options: Options = {}) {
   const { key, handler } = hotkey;
   const targetRef = useRef<HTMLElement | null>(null);
   const handlerRef = useRef(handler);

   useEffect(() => {
      handlerRef.current = handler;
   }, [handler]);

   useEffect(() => {
      if (options.target) {
         if (options.target instanceof HTMLElement) {
            targetRef.current = options.target;
         } else if ('current' in options.target) {
            targetRef.current = options.target.current;
         }
      }
   }, [options.target]);

   useEffect(() => {
      const target = targetRef.current || document;

      const listener = (event: KeyboardEvent) => {
         if (event.key === key) {
            handlerRef.current(event);
         }
      };

      target.addEventListener('keydown', listener as EventListener);
      return () => {
         target.removeEventListener('keydown', listener as EventListener);
      };
   }, [key, targetRef]);
}

export { useHotkey };

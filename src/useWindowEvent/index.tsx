import { useEffect } from 'react';

export function useWindowEvent<K extends string>(
   type: K,
   listener: K extends keyof WindowEventMap
      ? (this: Window, ev: WindowEventMap[K]) => void
      : (this: Window, ev: CustomEvent) => void,
   options?: boolean | AddEventListenerOptions
) {
   useEffect(() => {
      if (!window) return;
      //@ts-ignore
      window.addEventListener(type, listener, options); //@ts-ignore
      return () => window.removeEventListener(type, listener, options);
   }, [type, listener]);
}

import { Ref, useEffect, useRef } from 'react';
import { isBrowser } from '../misc';
import { useMemoizedFn } from '../useMemoizedFn';

type EventHandler = (event: Event) => void;

interface Options {
   capture?: boolean;
   once?: boolean;
   passive?: boolean;
}

function useEvent(
   eventType: keyof HTMLElementEventMap,
   handler: EventHandler,
   element: Ref<Element> | HTMLElement | null = null,
   options: Options = {}
) {
   const savedHandler = useRef<EventHandler>();

   useEffect(() => {
      savedHandler.current = handler;
   }, [handler]);

   // Create the event listener.
   const eventListener = useMemoizedFn((event: Event) => savedHandler.current?.(event));

   useEffect(() => {
      if (!isBrowser) return;
      // Get the target element to attach the event listener to.
      let targetElement = (element || window) as HTMLElement;
      if (element && typeof element === 'object' && 'current' in element) {
         // `element` is a ref object, so get its current property to get the actual element
         targetElement = element.current as HTMLElement;
      }
      if (!targetElement) return;

      // Add the event listener.
      targetElement.addEventListener(eventType, eventListener, options);

      // Remove the event listener on cleanup.
      return () => {
         targetElement.removeEventListener(eventType, eventListener, options);
      };
   }, [eventType, element, options]);
}

export { useEvent };

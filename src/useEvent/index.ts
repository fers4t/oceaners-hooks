import { RefObject, useEffect } from 'react';
import { safeHasOwnProperty } from '../misc';
import createHandlerSetter from '../misc/createHandlerSetter';

const useEvent = <TEvent extends Event, TElement extends HTMLElement = HTMLElement>(
   ref: RefObject<TElement>,
   eventName: string,
   options?: AddEventListenerOptions
) => {
   const [handler, setHandler] = createHandlerSetter<TEvent>();

   if (!!ref && !safeHasOwnProperty(ref, 'current')) {
      throw new Error('Unable to assign any scroll event to the given ref');
   }

   useEffect(() => {
      // @ts-ignore // TODO: fix type
      const cb: EventListenerOrEventListenerObject = (event: TEvent) => {
         if (handler.current) {
            handler.current(event);
         }
      };

      if (ref.current && ref.current.addEventListener && handler.current) {
         ref.current.addEventListener(eventName, cb, options);
      }

      return () => {
         if (ref.current && ref.current.addEventListener && handler.current) {
            ref.current.removeEventListener(eventName, cb, options);
         }
      };
   }, [eventName, ref.current, options]);

   return setHandler;
};

export { useEvent };

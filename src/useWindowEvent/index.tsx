import { useEffect, useRef } from 'react';

type EventType = keyof WindowEventMap;
type EventHandler<T extends EventType> = (event: WindowEventMap[T]) => void;

function useWindowEvent<T extends EventType>(
   eventType: T,
   handler: EventHandler<T>,
   advancedOptions?: boolean | AddEventListenerOptions
): void {
   const savedHandler = useRef<EventHandler<T>>();

   // Update the event handler ref if the handler prop changes
   useEffect(() => {
      savedHandler.current = handler;
   }, [handler]);

   useEffect(() => {
      // Create the event listener
      const eventListener = (event: WindowEventMap[T]) => {
         if (savedHandler.current) {
            savedHandler.current(event);
         }
      };

      // Add the event listener to the window
      window.addEventListener(eventType, eventListener, advancedOptions);

      // Remove the event listener from the window when the component unmounts
      return () => {
         window.removeEventListener(eventType, eventListener, advancedOptions);
      };
   }, [eventType, advancedOptions]);
}

export { useWindowEvent };

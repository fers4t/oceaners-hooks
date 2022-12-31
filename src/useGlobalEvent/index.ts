import { RefObject } from 'react';
import { noop } from '../misc/event';
import { CallbackSetter } from '../types';
import { isBrowser } from '../misc';
import { useEvent } from '../useEvent';

/**
 * Accepts an event name then returns a callback setter for a function to be performed when the event triggers.
 * @example
 * const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const onWindowResize = useGlobalEvent('resize');

  onWindowResize((event) => {
    setWindowWidth(window.innerWidth);
  });

  return (
    <DisplayDemo>
      Current window width: {windowWidth}
    </DisplayDemo>
  );
 */
const useGlobalEvent = <TEvent extends Event>(eventName: keyof WindowEventMap, opts?: AddEventListenerOptions) => {
   if (!isBrowser) {
      return noop as CallbackSetter<TEvent>;
   }

   const target = { current: window } as unknown as RefObject<HTMLElement>; // that's a bit of a hack but it works
   return useEvent<TEvent>(target, eventName, opts);
};

export default useGlobalEvent;

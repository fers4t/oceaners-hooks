import { RefObject, useEffect, useRef, useState } from 'react';
import { isBrowser } from '../misc';
import { getTargetElement } from '../types';

function useFullScreen(target: RefObject<HTMLElement> | HTMLElement | null) {
   const [isFullscreen, setIsFullscreen] = useState(false);
   const element = useRef<HTMLElement | null>(null);
   const overflowValue = useRef<string | null>(null);

   useEffect(() => {
      if (!isBrowser) return;

      element.current = getTargetElement(target, document.getElementById('__next'));
      overflowValue.current = element.current.style.overflowY;
   }, [target]);

   function enableFullScreen() {
      if (element.current) {
         if (element.current.requestFullscreen) {
            element.current.requestFullscreen(); // @ts-ignore
         } else if (element.current.mozRequestFullScreen) {
            // @ts-ignore
            element.current.mozRequestFullScreen(); // @ts-ignore
         } else if (element.current.webkitRequestFullscreen) {
            // @ts-ignore
            element.current.webkitRequestFullscreen(); // @ts-ignore
         } else if (element.current.msRequestFullscreen) {
            // @ts-ignore
            element.current.msRequestFullscreen();
         }

         // make element scrollable
         element.current.style.overflowY = 'auto';
         setIsFullscreen(true);
      }
   }

   function disableFullScreen() {
      if (document.exitFullscreen) {
         document.exitFullscreen(); // @ts-ignore
      } else if (document.mozCancelFullScreen) {
         // @ts-ignore
         document.mozCancelFullScreen(); // @ts-ignore
      } else if (document.webkitExitFullscreen) {
         // @ts-ignore
         document.webkitExitFullscreen(); // @ts-ignore
      } else if (document.msExitFullscreen) {
         // @ts-ignore
         document.msExitFullscreen(); // @ts-ignore
      }

      element.current.style.overflowY = overflowValue.current;
      setIsFullscreen(false);
   }

   return { isFullscreen, enableFullScreen, disableFullScreen };
}

export { useFullScreen };

import { useEffect, useRef, useState } from 'react';

export default function useIdle(ms: number) {
   const timeoutId = useRef(null);
   const [isIdle, setIsIdle] = useState(false);

   const handleTimeout = () => !isIdle && setIsIdle(true);

   useEffect(() => {
      timeoutId.current = setTimeout(handleTimeout, ms);

      return () => clearTimeout(timeoutId.current);
   }, [ms]);

   useEffect(() => {
      function handleActivity() {
         if (timeoutId.current) {
            clearTimeout(timeoutId.current);
         }

         if (isIdle) {
            setIsIdle(false);
         }
         timeoutId.current = setTimeout(handleTimeout, ms);
      }

      window.addEventListener('mousemove', handleActivity);
      window.addEventListener('keydown', handleActivity);

      return () => {
         window.removeEventListener('mousemove', handleActivity);
         window.removeEventListener('keydown', handleActivity);
      };
   }, [ms, isIdle]);

   return isIdle;
}

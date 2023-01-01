import { useEffect, useRef } from 'react';

const useUnmountedRef = () => {
   const unmountedRef = useRef(false);
   useEffect(() => {
      unmountedRef.current = false;
      return () => {
         unmountedRef.current = true;
      };
   }, []);
   return unmountedRef;
};

export { useUnmountedRef };
// https://ahooks.js.org/hooks/use-unmounted-ref/

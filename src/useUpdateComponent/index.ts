import { useCallback, useState, useRef, useEffect } from 'react';

const useUpdateComponent = () => {
   const isMounted = useRef(false);
   const [, setState] = useState({});

   const update = useCallback(() => {
      if (isMounted.current) {
         setState({});
      }
   }, []);

   useEffect(() => {
      isMounted.current = true;
      return () => {
         isMounted.current = false;
      };
   }, []);

   return update;
};

export { useUpdateComponent };

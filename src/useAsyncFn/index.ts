import { useCallback } from 'react';
import useDeepCompareEffect from '../useDeepCompareEffect';
import { useSafeState } from '../useSafeState';

// TODO: add refreshInterval,idle, focus, cache mode etc.

function useAsyncFn(asyncFn, dependencies = []) {
   const [state, setState] = useSafeState({
      isLoading: true,
      error: null,
      data: null
   });

   const run = useCallback(() => {
      setState({ isLoading: true, error: null, data: null });
      asyncFn()
         .then((data) => {
            setState({ isLoading: false, error: null, data });
         })
         .catch((error) => {
            setState({ isLoading: false, error, data: null });
         });
   }, dependencies);

   useDeepCompareEffect(() => {
      run();
   }, dependencies);

   return { ...state, retry: run };
}

export { useAsyncFn };

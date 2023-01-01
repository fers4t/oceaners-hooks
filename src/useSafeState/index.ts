import { useCallback, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useUnmountedRef } from '../useUnmountedRef';

/**
 * It is exactly the same with React.useState , but after the component is unmounted, the setState in the asynchronous callback will no longer be executed to avoid memory leakage caused by updating the state after the component is unmounted.
 */
function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
/**
 * It is exactly the same with React.useState , but after the component is unmounted, the setState in the asynchronous callback will no longer be executed to avoid memory leakage caused by updating the state after the component is unmounted.
 */
function useSafeState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

/**
 * It is exactly the same with React.useState , but after the component is unmounted, the setState in the asynchronous callback will no longer be executed to avoid memory leakage caused by updating the state after the component is unmounted.
 */
function useSafeState<S>(initialState?: S | (() => S)) {
   const unmountedRef = useUnmountedRef();
   const [state, setState] = useState(initialState);
   const setCurrentState = useCallback((currentState) => {
      /** if component is unmounted, stop update */
      if (unmountedRef.current) return;
      setState(currentState);
   }, []);

   return [state, setCurrentState] as const;
}

export { useSafeState };

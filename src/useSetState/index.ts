import { useCallback, useReducer, useRef } from 'react';
import { isFunction } from '../misc';

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
   state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null),
   options?: {
      deep?: boolean;
      merge?: (prev: S, next: S) => S;
   }
) => void;

const useSetState = <S extends Record<string, any>>(initialState: S | (() => S)): [S, SetState<S>, () => void] => {
   const initialStateRef = useRef(initialState);
   const [state, setState] = useReducer((prevState, patch) => {
      const newState = isFunction(patch) ? patch(prevState) : patch;
      return newState ? { ...prevState, ...newState } : prevState;
   }, initialState);

   const setMergeState = useCallback(
      (patch, options) => {
         const { deep, merge } = options || {};
         setState((prevState) => {
            const newState = isFunction(patch) ? patch(prevState) : patch;

            if (deep) {
               return merge ? merge(prevState, newState) : { ...prevState, ...newState };
            }

            return newState ? { ...prevState, ...newState } : prevState;
         });
      },
      [setState]
   );

   const resetState = useCallback(() => {
      setState(initialStateRef.current);
   }, [setState]);

   return [state, setMergeState, resetState];
};

export default useSetState;

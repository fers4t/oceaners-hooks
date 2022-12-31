import { useCallback, useState } from 'react';
import { isFunction } from '../misc';

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
   state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null)
) => void;

/**
 * @example
 *  const [state, setState] = useSetState<State>({
        hello: '',
        count: 0,
    });

    return (
        <div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
        <p>
            <button type="button" onClick={() => setState({ hello: 'world' })}>
            set hello
            </button>
            <button type="button" onClick={() => setState({ foo: 'bar' })} style={{ margin: '0 8px' }}>
            set foo
            </button>
            <button type="button" onClick={() => setState((prev) => ({ count: prev.count + 1 }))}>
            count + 1
            </button>
        </p>
        </div>
    );
 */
const useSetState = <S extends Record<string, any>>(initialState: S | (() => S)): [S, SetState<S>] => {
   const [state, setState] = useState<S>(initialState);

   const setMergeState = useCallback((patch) => {
      setState((prevState) => {
         const newState = isFunction(patch) ? patch(prevState) : patch;
         return newState ? { ...prevState, ...newState } : prevState;
      });
   }, []);

   return [state, setMergeState];
};

export default useSetState;

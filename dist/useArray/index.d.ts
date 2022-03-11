import { UseStateful } from '../useStateful';
import { UseArrayActions } from '../misc/useArray';
export declare type UseArray<T> = UseStateful<T[]> & UseArrayActions<T>;
export declare function useArray<T = any>(initial: T[]): UseArray<T>;
export default useArray;

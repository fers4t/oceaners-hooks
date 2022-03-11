import { UseStateful } from '../useStateful';
import { UseNumberActions } from '../misc/useNumber';
export declare type UseNumber = UseStateful<number> & UseNumberActions;
export declare function useNumber(initial: number, options?: {
    upperLimit?: number;
    lowerLimit?: number;
    loop?: boolean;
    step?: number;
}): UseNumber;
export default useNumber;

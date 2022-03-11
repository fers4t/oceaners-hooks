import { UseBooleanActions } from '../misc/useBoolean';
import { UseStateful } from '../useStateful';
export declare type UseBoolean = UseStateful<boolean> & UseBooleanActions;
export declare function useBoolean(initial: boolean): UseBoolean;
export default useBoolean;

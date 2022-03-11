import { UseStateful } from '../useStateful';
export declare type UseArrayActions<T> = {
    setValue: UseStateful<T[]>['setValue'];
    add: (value: T | T[]) => void;
    push: (value: T | T[]) => void;
    pop: () => void;
    shift: () => void;
    unshift: (value: T | T[]) => void;
    clear: () => void;
    move: (from: number, to: number) => void;
    removeById: (id: T extends {
        id: string;
    } ? string : T extends {
        id: number;
    } ? number : unknown) => void;
    modifyById: (id: T extends {
        id: string;
    } ? string : T extends {
        id: number;
    } ? number : unknown, newValue: Partial<T>) => void;
    removeIndex: (index: number) => void;
};
export declare type UseArray<T = any> = [T[], UseArrayActions<T>];
export declare function useArray<T = any>(initial: T[]): UseArray<T>;
export default useArray;

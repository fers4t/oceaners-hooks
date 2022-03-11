import { default as React, SetStateAction } from 'react';
export declare function useStateful<T = any>(initial: T): UseStateful<T>;
export declare type UseStateful<T = any> = {
    value: T;
    setValue: React.Dispatch<SetStateAction<T>>;
};
export default useStateful;

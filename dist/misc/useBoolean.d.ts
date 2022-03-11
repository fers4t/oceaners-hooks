import { default as React, SetStateAction } from 'react';
export declare type UseBooleanActions = {
    setValue: React.Dispatch<SetStateAction<boolean>>;
    toggle: () => void;
    setTrue: () => void;
    setFalse: () => void;
};
export declare type UseBoolean = [boolean, UseBooleanActions];
export declare function useBoolean(initial: boolean): UseBoolean;
export default useBoolean;

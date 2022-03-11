export declare type Vibrate = number | number[];
export declare const defaultValue: Vibrate;
declare const useVibrate: (value?: Vibrate) => () => () => void;
export default useVibrate;

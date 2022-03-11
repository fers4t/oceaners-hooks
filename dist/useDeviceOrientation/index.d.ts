export interface IOrientationState {
    angle: number;
    type: string;
}
export declare const defaultState: IOrientationState;
declare const useDeviceOrientation: (initialState?: IOrientationState) => IOrientationState;
export default useDeviceOrientation;

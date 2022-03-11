/// <reference types="react" />
export { default as useDebounce } from './useDebounce';
export { default as useActive } from './useActive';
export { default as useEventListener } from './useEventListener';
export { default as useFocus } from './useFocus';
export { default as useClickAwayListener } from './useClickAwayListener';
export { default as useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
export { default as useHover } from './useHover';
export { default as useWindowResize } from './useWindowResize';
export { default as useDeviceOrientation } from './useDeviceOrientation';
export { default as useIsOnline } from './useIsOnline';
export { default as useVibrate } from './useVibrate';
export { default as useWindowScrollPosition } from './useWindowScrollPosition';
export { default as useStateful } from './useStateful';
export { default as useBoolean } from './useBoolean';
export { default as useNumber } from './useNumber';
export { default as useArray } from './useArray';
export { default as useMap } from './useMap';
export { default as usePageLoaded } from './usePageLoaded';
export { default as useElementSize } from './useElementSize';
export { default as useStep } from './useStep';
interface Props {
    text: string;
}
export declare const ExampleComponent: ({ text }: Props) => JSX.Element;

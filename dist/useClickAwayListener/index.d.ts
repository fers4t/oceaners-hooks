import { RefObject } from 'react';
declare type Handler = (event: MouseEvent) => void;
declare function useClickAwayListener<T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: Handler, mouseEvent?: 'mousedown' | 'mouseup'): void;
export default useClickAwayListener;

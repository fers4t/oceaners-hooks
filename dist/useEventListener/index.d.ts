declare function useEventListener<KD extends keyof DocumentEventMap>(element: Document | null | undefined, eventType: KD, listener: (this: Document, evt: DocumentEventMap[KD]) => void, options?: boolean | AddEventListenerOptions): void;
declare function useEventListener<KH extends keyof HTMLElementEventMap>(element: HTMLElement | null | undefined, eventType: KH, listener: (this: HTMLElement, evt: HTMLElementEventMap[KH]) => void, options?: boolean | AddEventListenerOptions): void;
declare function useEventListener<KW extends keyof WindowEventMap>(element: Window | null | undefined, eventType: KW, listener: (this: Window, evt: WindowEventMap[KW]) => void, options?: boolean | AddEventListenerOptions): void;
declare function useEventListener(element: Document | HTMLElement | Window | null | undefined, eventType: string, listener: (evt: Event) => void, options?: boolean | AddEventListenerOptions): void;
export default useEventListener;

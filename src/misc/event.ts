// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export function on<T extends Window | Document | HTMLElement | EventTarget>(
   obj: T | null,
   // eslint-disable-next-line @typescript-eslint/ban-types
   ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]
): void {
   if (obj && obj.addEventListener) {
      obj.addEventListener(...(args as Parameters<HTMLElement['addEventListener']>));
   }
}

export function off<T extends Window | Document | HTMLElement | EventTarget>(
   obj: T | null,
   // eslint-disable-next-line @typescript-eslint/ban-types
   ...args: Parameters<T['removeEventListener']> | [string, Function | null, ...any]
): void {
   if (obj && obj.removeEventListener) {
      obj.removeEventListener(...(args as Parameters<HTMLElement['removeEventListener']>));
   }
}

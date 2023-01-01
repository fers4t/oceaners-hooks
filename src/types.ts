import type { MutableRefObject } from 'react';
import { isBrowser, isFunction } from './misc/helpers';

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

export type BasicTarget<T extends TargetType = Element> =
   | (() => TargetValue<T>)
   | TargetValue<T>
   | MutableRefObject<TargetValue<T>>;

export function getTargetElement<T extends TargetType>(target: BasicTarget<T>, defaultElement?: T) {
   if (!isBrowser) {
      return undefined;
   }

   if (!target) {
      return defaultElement;
   }

   let targetElement: TargetValue<T>;

   if (isFunction(target)) {
      targetElement = target();
   } else if ('current' in target) {
      targetElement = target.current;
   } else {
      targetElement = target;
   }

   return targetElement;
}

/**
 * Typed generic callback function, used mostly internally
 * to defined callback setters
 */
export interface SomeCallback<TArgs, TResult = void> {
   (...args: TArgs[]): TResult;
}

/**
 * A callback setter is generally used to set the value of
 * a callback that will be used to perform updates
 */
export interface CallbackSetter<TArgs> {
   (nextCallback: SomeCallback<TArgs>): void;
}

/**
 * Represent a generic function.
 * Used internally to improve code readability
 */
export interface GenericFunction {
   (...args: any[]): any;
}

export type PromiseType<P extends Promise<any>> = P extends Promise<infer T> ? T : never;

export type FunctionReturningPromise = (...args: any[]) => Promise<any>;

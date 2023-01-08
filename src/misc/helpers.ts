export const isBrowser = !!(
   typeof window !== 'undefined' &&
   window.document &&
   window.document.createElement
);
export const isNavigator = !!(typeof navigator !== 'undefined');
export const isObject = (value: unknown): value is Record<any, any> =>
   value !== null && typeof value === 'object';
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (value: unknown): value is Function =>
   typeof value === 'function';

export const isString = (value: unknown): value is string =>
   typeof value === 'string';
export const isBoolean = (value: unknown): value is boolean =>
   typeof value === 'boolean';
export const isNumber = (value: unknown): value is number =>
   typeof value === 'number';
export const isUndef = (value: unknown): value is undefined =>
   typeof value === 'undefined';
export const isDev =
   process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
export const safeHasOwnProperty = (obj: any, prop: string): boolean =>
   obj ? Object.prototype.hasOwnProperty.call(obj, prop) : false;

export function mockApiRequest(delay = 1000, shouldSucceed = true) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         if (shouldSucceed) {
            resolve({ data: 'Mock API request succeeded' });
         } else {
            reject(new Error('Mock API request failed'));
         }
      }, delay);
   });
}

export const moneyFormatter = new Intl.NumberFormat('tr-TR', {
   style: 'currency',
   currency: 'TRY'
});

/**
 *
 * @param num1 smaller number
 * @param num2 bigger number
 * @returns
 */
export function percentage(num1, num2) {
   const percent = (num1 / num2) * 100;
   const roundedPercent = Math.round(percent);
   return `${roundedPercent}%`;
}

export const getUTCDate = (date: Date) => {
   return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      date.getUTCMilliseconds()
   );
};

export function getAllClassNames() {
   const allClasses: string[] = [];

   const allElements = document.querySelectorAll('*');

   for (let i = 0; i < allElements.length; i++) {
      const classes = allElements[i].className.toString().split(/\s+/);
      for (let j = 0; j < classes.length; j++) {
         const cls = classes[j];
         if (cls && allClasses.indexOf(cls) === -1) allClasses.push(cls);
      }
   }

   return allClasses;
}

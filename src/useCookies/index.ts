import { useState, useEffect, useCallback } from 'react';
import { isBrowser } from '../misc';

type Cookie = {
   [key: string]: string;
};

const useCookies = (): [
   Cookie,
   (key: string, value: string, options?: { expires?: Date }) => void,
   (key: string) => void
] => {
   const [cookies, setCookies] = useState<Cookie>(() => {
      if (!isBrowser) return;

      const cookieString = document.cookie;
      return cookieString
         .split(';')
         .map((c) => c.trim())
         .reduce((acc, current) => {
            const [key, value] = current.split('=');
            return {
               ...acc,
               [key]: value
            };
         }, {});
   });

   const setCookie = useCallback(
      (key: string, value: string, options?: { expires?: Date }) => {
         if (cookies[key] === value) {
            return;
         }
         let cookie = `${key}=${value}`;
         if (options && options.expires) {
            cookie += `; expires=${options.expires.toUTCString()}`;
         }
         document.cookie = cookie;
         setCookies({ ...cookies, [key]: value });
      },
      [cookies]
   );

   const deleteCookie = useCallback((key: string) => {
      document.cookie = `${key}=; expires=${new Date(0).toUTCString()}`;
      const { [key]: value, ...rest } = cookies;
      setCookies(rest);
   }, []);

   useEffect(() => {
      const updateCookies = (): void => {
         const updatedCookies = document.cookie
            .split(';')
            .map((c) => c.trim())
            .reduce((acc, current) => {
               const [key, value] = current.split('=');
               return {
                  ...acc,
                  [key]: value
               };
            }, {});
         setCookies(updatedCookies);
      };

      window.addEventListener('cookiechange', updateCookies);
      return (): void => {
         window.removeEventListener('cookiechange', updateCookies);
      };
   }, []);

   return [cookies, setCookie, deleteCookie];
};

export default useCookies;

import { isBrowser } from '../misc';
import useDeepCompareEffect from '../useDeepCompareEffect';
import { useSafeState } from '../useSafeState';

function useLocalStorage(key, initialValue) {
   const [value, setValue] = useSafeState(() => {
      try {
         if (!isBrowser) return;
         const item = window.localStorage.getItem(key);
         return item ? JSON.parse(item) : initialValue;
      } catch (error) {
         console.error(error);
         return initialValue;
      }
   });

   useDeepCompareEffect(() => {
      try {
         window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
         console.error(error);
      }
   }, [value]);

   function deleteValue() {
      setValue(null);
      try {
         window.localStorage.removeItem(key);
      } catch (error) {
         console.error(error);
      }
   }

   return { value, setValue, deleteValue };
}

export { useLocalStorage };

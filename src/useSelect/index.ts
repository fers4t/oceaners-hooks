import { useState, useCallback } from 'react';

type SingleObjectOption = { [key: string]: any; label: string; value: string };
type Options = string[] | SingleObjectOption[];
type Value = string | string[] | SingleObjectOption[];

const useSelect = ({
   allowDeselect = true,
   initialValue,
   key,
   multiple = false,
   onChange
}: {
   allowDeselect?: boolean;
   initialValue?: Value;
   key?: string;
   multiple: boolean;
   onChange?: (value: Options[0]) => void;
}) => {
   const [values, setValues] = useState<Value>(initialValue);

   const setValue = useCallback(
      (value: Options[0]) => {
         if (onChange) {
            onChange(value);
         }
         if (multiple) {
            if (typeof value === 'object' && !key)
               throw new Error(
                  'Key is required when using objects with multiple prop.'
               );

            if (Array.isArray(values)) {
               if (
                  typeof value === 'string' &&
                  (values as unknown as string[]).includes(
                     value as unknown as string
                  )
               ) {
                  if (allowDeselect) {
                     setValues(
                        (values as string[]).filter(
                           (v) => v !== (value as unknown as string)
                        )
                     );
                  }
               } else if (
                  typeof value === 'object' &&
                  (values as unknown as SingleObjectOption).find(
                     (v) => v[key] === value[key]
                  )
               ) {
                  if (allowDeselect) {
                     setValues(
                        (values as unknown as SingleObjectOption).filter(
                           (v) => v[key] !== value[key]
                        )
                     );
                  }
               } else {
                  setValues([...(values as string[]), value as string]);
               }
            } else {
               setValues([value as SingleObjectOption]);
            }
         } else {
            setValues(value as string);
         }
      },
      [key, multiple, values, allowDeselect, onChange]
   );

   const clear = useCallback(() => {
      setValues(multiple ? [] : '');
   }, [multiple]);

   return { clear, setValues: setValue, values };
};

export default useSelect;

// https://sandiiarov.github.io/use-events/#/docs-use-focus
import React from 'react';

/**
 * @example const [isFocused, bind] = useFocus();
 * @returns [isFocused, bind]
 */
function useFocus(): [
   boolean,
   {
      onBlur: (e: React.FocusEvent) => void;
      onFocus: (e: React.FocusEvent) => void;
   }
] {
   const [isFocused, setFocused] = React.useState(false);

   const bind = React.useMemo(
      () => ({
         onFocus: () => void setFocused(true),
         onBlur: () => void setFocused(false)
      }),
      []
   );

   return [isFocused, bind];
}

export default useFocus;

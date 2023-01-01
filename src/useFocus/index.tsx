// https://sandiiarov.github.io/use-events/#/docs-use-focus
import React from 'react';
import { useSafeState } from '../useSafeState';

/**
 * @example const [isFocused, bind] = useFocus();
 * @returns [isFocused, bind]
 */
function useFocus(): [
   boolean,
   {
      onMouseDown: (e) => void;
      onMouseUp: (e) => void;
   }
] {
   const [isFocused, setFocused] = useSafeState<boolean>(false);

   const bind = React.useMemo(
      () => ({
         onMouseDown: () => setFocused(true),
         onMouseUp: () => setFocused(false)
      }),
      [setFocused]
   );

   return [isFocused, bind];
}

export default useFocus;

`
const [isFocused, bind] = useFocus();
<input placeholder="yo" {...bind} />
`;

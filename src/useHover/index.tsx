// https://github.com/sandiiarov/use-events/blob/master/src/useHover/index.tsx
import React from 'react';
import { useSafeState } from '../useSafeState';

/**
 * @example const [isHovered, bind] = useHover();
 * @returns [isHovered, bind]
 */
function useHover(): [
   boolean,
   {
      onMouseEnter: (e: React.MouseEvent) => void;
      onMouseLeave: (e: React.MouseEvent) => void;
   }
] {
   const [isHovered, setHovered] = useSafeState(false);

   const bind = React.useMemo(
      () => ({
         onMouseEnter: () => setHovered(true),
         onMouseLeave: () => setHovered(false)
      }),
      []
   );

   return [isHovered, bind];
}

export default useHover;

// const Example = () => {
//   const [isHovered, bind] = useHover();

//   return (
//     <div {...bind}>
//       You are {isHovered ? 'hovering' : 'not hovering'} this div
//     </div>
//   );
// };

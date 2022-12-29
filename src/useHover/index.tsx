// https://github.com/sandiiarov/use-events/blob/master/src/useHover/index.tsx
import React from 'react';

function useHover(): [
   boolean,
   {
      onMouseEnter: (e: React.MouseEvent) => void;
      onMouseLeave: (e: React.MouseEvent) => void;
   }
] {
   const [isHovered, setHovered] = React.useState(false);

   const bind = React.useMemo(
      () => ({
         onMouseEnter: () => void setHovered(true),
         onMouseLeave: () => void setHovered(false)
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

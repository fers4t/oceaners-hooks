import React from 'react';

function useActive(): [
   boolean,
   {
      onMouseDown: (e: React.MouseEvent) => void;
      onMouseUp: (e: React.MouseEvent) => void;
   }
] {
   const [isActive, setActive] = React.useState(false);

   const bind = React.useMemo(
      () => ({
         onMouseDown: () => void setActive(true),
         onMouseUp: () => void setActive(false)
      }),
      []
   );

   return [isActive, bind];
}

export default useActive;

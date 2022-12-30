import React from 'react';
import { useBoolean, useClickOutside, useDebounce } from 'oceaners-hooks';

export default function Home() {
   const isOpen = useBoolean(false);

   return (
      <div>
         <span>{isOpen.value ? 'acik' : 'kapali'}</span>
         <button
            onClick={() => {
               isOpen.toggle();
            }}
         >
            toggle
         </button>
      </div>
   );
}

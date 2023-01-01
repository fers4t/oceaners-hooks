import { default as React, SetStateAction, useMemo, useState } from 'react';

export type UseStateful<T = any> = {
   setValue: React.Dispatch<SetStateAction<T>>;
   value: T;
};

const useStateful = <T = any>(initial: T): UseStateful<T> => {
   const [value, setValue] = useState(initial);
   return useMemo(
      () => ({
         value,
         setValue
      }),
      [value]
   );
};

export default useStateful;

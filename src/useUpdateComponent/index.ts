import { useCallback, useState } from 'react';

/**
 *
 * When triggered, the component will be re-rendered.
 */
const useUpdateComponent = () => {
   const [, setState] = useState({});

   return useCallback(() => setState({}), []);
};

export { useUpdateComponent };

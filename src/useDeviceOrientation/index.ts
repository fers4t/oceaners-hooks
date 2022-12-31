// https://github.com/21kb/react-hooks/blob/main/packages/react-device-orientation-hook/src/index.ts
import { useEffect, useState } from 'react';
import { isBrowser } from '../misc';

export interface IOrientationState {
   angle: number;
   type: string;
}

export const defaultState: IOrientationState = {
   angle: 0,
   type: 'landscape-primary'
};

const useDeviceOrientation = () => {
   const [state, setState] = useState<IOrientationState>();

   const onOrientationChangeEvent = () => {
      const { orientation } = screen;
      const { angle, type } = orientation;

      setState({ angle, type });
   };

   useEffect(() => {
      if (!isBrowser) return;
      // get the initial orientation
      onOrientationChangeEvent();
      window.addEventListener('orientationchange', onOrientationChangeEvent, true);

      return () => {
         window.addEventListener('orientationchange', onOrientationChangeEvent, true);
      };
   }, []);

   return state;
};

export { useDeviceOrientation };

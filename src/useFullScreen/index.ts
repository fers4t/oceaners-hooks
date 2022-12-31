import { useState } from 'react';
import screenfull from 'screenfull';
import { BasicTarget, getTargetElement } from '../types';
import { useLatest } from '../useLatest';
import { useMemoizedFn } from '../useMemoizedFn';
import { useUnmount } from '../useUnmount';

export interface Options {
   onEnter?: () => void;
   onExit?: () => void;
}

const useFullScreen = (target: BasicTarget, options?: Options) => {
   const { onExit, onEnter } = options || {};

   const onExitRef = useLatest(onExit);
   const onEnterRef = useLatest(onEnter);

   const [state, setState] = useState(false);

   const onChange = () => {
      if (screenfull.isEnabled) {
         const el = getTargetElement(target);

         if (!screenfull.element) {
            onExitRef.current?.();
            setState(false);
            screenfull.off('change', onChange);
         } else {
            const isFullscreen = screenfull.element === el;
            if (isFullscreen) {
               onEnterRef.current?.();
            } else {
               onExitRef.current?.();
            }
            setState(isFullscreen);
         }
      }
   };

   const enterFullscreen = () => {
      const el = getTargetElement(target);
      if (!el) {
         return;
      }

      if (screenfull.isEnabled) {
         try {
            screenfull.request(el);
            screenfull.on('change', onChange);
         } catch (error) {
            console.error(error);
         }
      }
   };

   const exitFullscreen = () => {
      const el = getTargetElement(target);
      if (screenfull.isEnabled && screenfull.element === el) {
         screenfull.exit();
      }
   };

   const toggleFullscreen = () => {
      if (state) {
         exitFullscreen();
      } else {
         enterFullscreen();
      }
   };

   useUnmount(() => {
      if (screenfull.isEnabled) {
         screenfull.off('change', onChange);
      }
   });

   return [
      state,
      {
         enterFullscreen: useMemoizedFn(enterFullscreen),
         exitFullscreen: useMemoizedFn(exitFullscreen),
         toggleFullscreen: useMemoizedFn(toggleFullscreen),
         isEnabled: screenfull.isEnabled
      }
   ] as const;
};

export { useFullScreen };

import { useRef, useState } from 'react';
import { BasicTarget, getTargetElement } from '../types';
import useEffectWithTarget from '../useEffectWithTarget';

interface Rect {
   bottom: number;
   height: number;
   left: number;
   right: number;
   top: number;
   width: number;
}
export interface State extends Rect {
   text: string;
}

const initRect: Rect = {
   top: NaN,
   left: NaN,
   bottom: NaN,
   right: NaN,
   height: NaN,
   width: NaN
};

const initState: State = {
   text: '',
   ...initRect
};

function getRectFromSelection(selection: Selection | null): Rect {
   if (!selection) {
      return initRect;
   }

   if (selection.rangeCount < 1) {
      return initRect;
   }
   const range = selection.getRangeAt(0);
   const { height, width, top, left, right, bottom } = range.getBoundingClientRect();
   return {
      height,
      width,
      top,
      left,
      right,
      bottom
   };
}
/**
 *
 * @example const selectedText = useTextSelection(ref);
 * @returns
 */
function useTextSelection(target?: BasicTarget<Document | Element>): State {
   const [state, setState] = useState(initState);

   const stateRef = useRef(state);
   const isInRangeRef = useRef(false);
   stateRef.current = state;

   useEffectWithTarget(
      () => {
         const el = getTargetElement(target, document);
         if (!el) {
            return;
         }

         const mouseupHandler = () => {
            let selObj: Selection | null = null;
            let text = '';
            let rect = initRect;
            if (!window.getSelection) return;
            selObj = window.getSelection();
            text = selObj ? selObj.toString() : '';
            if (text && isInRangeRef.current) {
               rect = getRectFromSelection(selObj);
               setState({ ...state, text, ...rect });
            }
         };

         // 任意点击都需要清空之前的 range
         const mousedownHandler = (e) => {
            if (!window.getSelection) return;
            if (stateRef.current.text) {
               setState({ ...initState });
            }
            isInRangeRef.current = false;
            const selObj = window.getSelection();
            if (!selObj) return;
            selObj.removeAllRanges();
            isInRangeRef.current = el.contains(e.target);
         };

         el.addEventListener('mouseup', mouseupHandler);

         document.addEventListener('mousedown', mousedownHandler);

         return () => {
            el.removeEventListener('mouseup', mouseupHandler);
            document.removeEventListener('mousedown', mousedownHandler);
         };
      },
      [],
      target
   );

   return state;
}

export { useTextSelection };

import React from 'react';
declare function useActive(): [boolean, {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseUp: (e: React.MouseEvent) => void;
}];
export default useActive;

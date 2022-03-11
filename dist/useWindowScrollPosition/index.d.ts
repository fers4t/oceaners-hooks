declare const useWindowScrollPosition: ({ throttleMs }?: {
    throttleMs?: number | undefined;
}) => {
    x: number;
    y: number;
};
export default useWindowScrollPosition;

import useGlobalEvent from '../useGlobalEvent';

/**
 * Returns a function that accepts a callback to be performed when the window scrolls.
 * @example
 * const WindowScrollReporter = () => {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const onWindowScroll = useWindowScroll();

  onWindowScroll(useThrottledCallback((event) => {
    setScrollY(window.scrollY);
  }));

  return (
    <DisplayDemo>
      <p>window y-scroll: {scrollY}</p>
    </DisplayDemo>
  );
};
 */
const useWindowScroll = () => useGlobalEvent<UIEvent>('scroll');

export default useWindowScroll;

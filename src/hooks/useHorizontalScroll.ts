import { useRef, useEffect } from 'react';

const useHorizontalScroll = () => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elRef.current) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        elRef.current?.scrollTo({
          left: elRef.current.scrollLeft + e.deltaY,
          behavior: 'smooth',
        });
      };
      elRef.current.addEventListener('wheel', onWheel);
      return () => elRef.current?.removeEventListener('wheel', onWheel);
    }
  });

  return elRef;
};

export default useHorizontalScroll;

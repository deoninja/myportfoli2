import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (threshold = 0.1, rootMargin = '50px 0px -50px 0px') => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we can disconnect the observer
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  return [ref, isVisible];
};

// Hook for staggered animations
export const useStaggeredAnimation = (itemCount, delay = 100) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animation of child elements
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, i]));
            }, i * delay);
          }
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '200px 0px -50px 0px'
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [itemCount, delay]);

  return [ref, visibleItems];
};

// Hook for continuous scroll animations
export const useContinuousScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolling(true);
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return { scrollY, isScrolling };
};

export default useScrollAnimation;
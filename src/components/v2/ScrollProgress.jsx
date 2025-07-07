import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(Math.min(progress, 100));
    };

    const throttledScroll = throttle(handleScroll, 16);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 scroll-progress-bar">
      <div 
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
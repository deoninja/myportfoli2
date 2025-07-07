import React, { useState, useEffect } from 'react';

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(Math.min(progress, 100));
      setIsVisible(scrollTop > 100);
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

  if (!isVisible) return null;

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-30">
      <div className="flex flex-col items-center space-y-4">
        {/* Scroll Progress Bar */}
        <div className="relative w-1 h-32 bg-gray-200/30 dark:bg-gray-700/30 rounded-full overflow-hidden">
          <div 
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-indigo-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
        
        {/* Progress Percentage */}
        <div className="px-2 py-1 rounded-md bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
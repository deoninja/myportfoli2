import React, { useState, useEffect } from 'react';
import { useMagneticEffect, useGlobalMouse } from '../hooks/useMouseParallax';
import { useScrollToTop } from '../hooks/useScrollToTop';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuickNav, setShowQuickNav] = useState(false);
  const [buttonRef, magneticPosition, isHovered] = useMagneticEffect(0.6, 120);
  const globalMouse = useGlobalMouse();
  const { scrollToTop, scrollToSection, isScrolling } = useScrollToTop();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(Math.min(progress, 100));
      setIsVisible(scrollTop > 300); // Show after scrolling 300px
    };

    const throttledScroll = throttle(handleScroll, 16); // ~60fps
    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  const handleScrollToTop = () => {
    scrollToTop(800); // 800ms smooth scroll
  };

  const handleQuickNavToggle = () => {
    setShowQuickNav(!showQuickNav);
  };

  // Throttle function for performance
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
    <div className="fixed bottom-8 right-8 z-40 group">
      {/* Quick Navigation Menu */}
      {showQuickNav && (
        <div className="absolute bottom-16 right-0 mb-2 space-y-2 animate-fadeInUp">
          {[
            { id: 'hero', label: 'Top', icon: '↑' },
            { id: 'about', label: 'About', icon: '●' },
            { id: 'projects', label: 'Projects', icon: '◆' },
            { id: 'contact', label: 'Contact', icon: '✉' }
          ].map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'hero') {
                  handleScrollToTop();
                } else {
                  scrollToSection(item.id);
                }
                setShowQuickNav(false);
              }}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Button */}
      <button
        ref={buttonRef}
        onClick={handleScrollToTop}
        onContextMenu={(e) => {
          e.preventDefault();
          handleQuickNavToggle();
        }}
        className={`
          relative w-14 h-14 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 
          bg-white/10 dark:bg-black/20 border border-white/20 dark:border-gray-700/50
          hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          ${isHovered ? 'shadow-2xl scale-110' : ''}
          ${isScrolling ? 'animate-pulse' : ''}
        `}
        style={{
          transform: `
            translate(${magneticPosition.x}px, ${magneticPosition.y}px) 
            ${isHovered ? 'scale(1.1)' : 'scale(1)'}
            translateZ(0)
          `,
          transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease',
          background: isHovered 
            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))'
            : 'rgba(255, 255, 255, 0.1)'
        }}
        aria-label="Back to top"
      >
        {/* Progress Ring */}
        <svg 
          className="absolute inset-0 w-full h-full transform -rotate-90" 
          viewBox="0 0 56 56"
        >
          {/* Background Circle */}
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-gray-300/30 dark:text-gray-600/30"
          />
          {/* Progress Circle */}
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="url(#backToTopGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 24}`}
            strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`}
            className="transition-all duration-300 ease-out"
            style={{
              filter: isHovered ? 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))' : 'none'
            }}
          />
          <defs>
            <linearGradient id="backToTopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Arrow Icon */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translateY(${globalMouse.y * -2}px) rotate(${isScrolling ? '360deg' : '0deg'})`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <svg 
            className={`w-6 h-6 transition-all duration-300 ${
              isHovered ? 'text-indigo-400 scale-110' : 'text-gray-600 dark:text-gray-300'
            }`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </div>

        {/* Hover Glow Effect */}
        <div 
          className={`
            absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none
            bg-gradient-to-r from-indigo-400/20 to-purple-400/20 blur-md
            ${isHovered ? 'opacity-100 scale-150' : 'opacity-0 scale-100'}
          `}
        />
      </button>

      {/* Floating Particles */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-indigo-400 rounded-full animate-ping"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Tooltip */}
      <div 
        className={`
          absolute right-16 top-1/2 transform -translate-y-1/2 px-3 py-2 rounded-lg text-sm font-medium
          bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 whitespace-nowrap shadow-lg
          transition-all duration-300 pointer-events-none
          ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
        `}
      >
        Back to top ({Math.round(scrollProgress)}%)
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-gray-100"></div>
      </div>

      {/* Mobile Alternative */}
      <div className="md:hidden">
        <div 
          className={`
            absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs
            bg-gray-900/80 dark:bg-gray-100/80 text-white dark:text-gray-900 backdrop-blur-sm
            transition-all duration-300 pointer-events-none
            ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
        >
          {Math.round(scrollProgress)}%
        </div>
      </div>
    </div>
  );
};

export default BackToTop;
import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    { id: 'hero', name: 'Hero', icon: '🚀' },
    { id: 'home', name: 'About', icon: '👋' },
    { id: 'about', name: 'Story', icon: '📖' },
    { id: 'skills', name: 'Skills', icon: '⚡' },
    { id: 'projects', name: 'Projects', icon: '💼' },
    { id: 'contact', name: 'Contact', icon: '📧' }
  ];

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Show progress bar after scrolling past hero section
      setIsVisible(scrollTop > window.innerHeight * 0.3);
    };

    const findActiveSection = () => {
      const sections = ['hero', 'home', 'about', 'skills', 'projects', 'contact'];
      let current = 'hero';

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId === 'hero' ? '' : sectionId);
        if (element || sectionId === 'hero') {
          const rect = sectionId === 'hero' 
            ? { top: 0, bottom: window.innerHeight }
            : element.getBoundingClientRect();
          
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = sectionId;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    const handleScroll = () => {
      calculateScrollProgress();
      findActiveSection();
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      {/* Main Progress Bar */}
      <div className={`fixed top-0 left-0 w-full h-1 bg-gray-200/30 dark:bg-gray-700/30 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Circular Progress Indicator */}
      <div className={`fixed top-6 right-6 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="relative w-16 h-16">
          {/* Background Circle */}
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            {/* Progress Circle */}
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
              className="transition-all duration-300 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Progress Percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              {Math.round(scrollProgress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Section Navigation Dots */}
      <div className={`fixed right-8 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}>
        <div className="flex flex-col space-y-4">
          {sections.map((section, index) => (
            <div key={section.id} className="relative group">
              <button
                onClick={() => scrollToSection(section.id)}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 border-indigo-500 shadow-lg'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-indigo-400'
                }`}
                aria-label={`Go to ${section.name} section`}
              />
              
              {/* Tooltip */}
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
                  <span className="mr-2">{section.icon}</span>
                  {section.name}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-gray-100"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Progress Indicator */}
      <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {Math.round(scrollProgress)}% complete
            </span>
            <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollProgress;
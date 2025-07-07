import React, { useEffect, useRef } from 'react';
import { useGlobalMouse, useTiltEffect } from '../../hooks/useMouseParallax';

const HeroSection = () => {
  const containerRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const globalMouse = useGlobalMouse();
  const [titleRef, titleTilt] = useTiltEffect(8, 0.15);

  // Smooth scroll to next section with enhanced easing
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#home');
    if (nextSection) {
      // Add a slight delay for better UX
      setTimeout(() => {
        nextSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating geometric shapes
    const createFloatingElement = (index) => {
      const element = document.createElement('div');
      element.className = `floating-shape floating-shape-${index}`;
      element.style.cssText = `
        position: absolute;
        width: ${Math.random() * 60 + 20}px;
        height: ${Math.random() * 60 + 20}px;
        background: linear-gradient(45deg, #6366f1, #8b5cf6);
        border-radius: ${Math.random() > 0.5 ? '50%' : '10px'};
        opacity: 0.1;
        animation: float-${index} ${Math.random() * 10 + 15}s infinite linear;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        z-index: 1;
      `;
      return element;
    };

    // Add floating elements
    for (let i = 0; i < 8; i++) {
      const element = createFloatingElement(i);
      container.appendChild(element);
      floatingElementsRef.current.push(element);
    }

    // Add dynamic CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float-0 { 0% { transform: translate(0, 0) rotate(0deg); } 100% { transform: translate(-100px, -100px) rotate(360deg); } }
      @keyframes float-1 { 0% { transform: translate(0, 0) rotate(0deg); } 100% { transform: translate(100px, -150px) rotate(-360deg); } }
      @keyframes float-2 { 0% { transform: translate(0, 0) rotate(0deg); } 100% { transform: translate(-150px, 100px) rotate(180deg); } }
      @keyframes float-3 { 0% { transform: translate(0, 0) rotate(0deg); } 100% { transform: translate(120px, 80px) rotate(-180deg); } }
      @keyframes float-4 { 0% { transform: translate(0, 0) rotate(0deg); } 100% { transform: translate(-80px, -120px) rotate(270deg); } }
      @keyframes float-5 { 0% { transform: translate(0, 0) rotate(0deg); } 100% { transform: translate(90px, -90px) rotate(-270deg); } }
      @keyframes float-6 { 0% { transform: translate(0, 0) rotate(0deg); } 100% { transform: translate(-110px, 110px) rotate(90deg); } }
      @keyframes float-7 { 0% { transform: translate(0, 0) rotate(0deg); } 100% { transform: translate(130px, -70px) rotate(-90deg); } }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup
      floatingElementsRef.current.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      id="hero"
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, var(--background-color) 0%, var(--background-color) 100%)
        `
      }}
    >
      {/* 3D Grid Background */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'center bottom'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Animated Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-indigo-200/30 dark:border-indigo-500/30 mb-8 animate-pulse">
          <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-ping"></span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Available for new projects</span>
        </div>

        {/* Main Heading with 3D Effect and Mouse Parallax */}
        <h1 
          ref={titleRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-none"
          style={{
            transform: `perspective(1000px) rotateX(${titleTilt.x}deg) rotateY(${titleTilt.y}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <span 
            className="block gradient-text relative"
            style={{
              textShadow: `
                0 1px 0 rgba(99, 102, 241, 0.8),
                0 2px 0 rgba(99, 102, 241, 0.7),
                0 3px 0 rgba(99, 102, 241, 0.6),
                0 4px 0 rgba(99, 102, 241, 0.5),
                0 5px 0 rgba(99, 102, 241, 0.4),
                0 6px 0 rgba(99, 102, 241, 0.3),
                0 7px 0 rgba(99, 102, 241, 0.2),
                0 8px 0 rgba(99, 102, 241, 0.1),
                0 9px 10px rgba(0, 0, 0, 0.1)
              `,
              transform: `translateX(${globalMouse.x * 10}px) translateY(${globalMouse.y * 5}px)`
            }}
          >
            CODE
          </span>
          <span 
            className="block text-gray-800 dark:text-white relative"
            style={{
              textShadow: `
                0 1px 0 rgba(0, 0, 0, 0.1),
                0 2px 0 rgba(0, 0, 0, 0.1),
                0 3px 0 rgba(0, 0, 0, 0.1),
                0 4px 0 rgba(0, 0, 0, 0.1),
                0 5px 0 rgba(0, 0, 0, 0.1),
                0 6px 10px rgba(0, 0, 0, 0.1)
              `,
              transform: `translateX(${globalMouse.x * -8}px) translateY(${globalMouse.y * -3}px)`
            }}
          >
            DREAMS
          </span>
        </h1>

        {/* Slogan */}
        <div className="mb-8">
          <p className="text-xl sm:text-2xl md:text-3xl font-light text-gray-600 dark:text-gray-300 mb-4">
            Transforming Ideas into
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">
            Digital Reality
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          Full-Stack Developer crafting exceptional web experiences with modern technologies, 
          clean code, and innovative solutions that bring your vision to life.
        </p>

        {/* 3D Floating Code Elements */}
        <div className="relative mb-12">
          <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
            {[
              { symbol: '</>', color: 'text-indigo-500', delay: '0s' },
              { symbol: '{}', color: 'text-purple-500', delay: '0.5s' },
              { symbol: '[]', color: 'text-indigo-600', delay: '1s' },
              { symbol: '()', color: 'text-purple-600', delay: '1.5s' },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-4xl sm:text-5xl font-bold ${item.color} opacity-80`}
                style={{
                  animation: `float 3s ease-in-out infinite`,
                  animationDelay: item.delay,
                  textShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transform: 'perspective(100px) rotateX(15deg)'
                }}
              >
                {item.symbol}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a
            href="#projects"
            className="group relative px-8 py-4 gradient-bg text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            style={{
              boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)'
            }}
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          
          <a
            href="#contact"
            className="group px-8 py-4 border-2 border-indigo-300 dark:border-indigo-500 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 backdrop-blur-sm bg-white/10 dark:bg-black/10"
          >
            Let's Connect
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button 
            onClick={scrollToNextSection}
            className="flex flex-col items-center space-y-2 scroll-indicator hover:animate-none transition-all duration-300 group cursor-pointer focus:outline-none"
            aria-label="Scroll to next section"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Scroll to explore
            </span>
            <div className="w-6 h-10 border-2 border-indigo-300 dark:border-indigo-500 rounded-full flex justify-center group-hover:border-indigo-500 dark:group-hover:border-indigo-400 transition-colors">
              <div className="w-1 h-3 bg-indigo-400 dark:bg-indigo-500 rounded-full mt-2 animate-pulse group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition-colors"></div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-4 h-4 text-indigo-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* 3D Geometric Shapes with Mouse Parallax */}
      <div 
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg opacity-15 transform rotate-12 parallax-element"
        style={{
          transform: `translate(${globalMouse.x * 15}px, ${globalMouse.y * 10}px) rotate(${12 + globalMouse.x * 5}deg)`,
          transition: 'transform 0.3s ease-out'
        }}
      ></div>
      <div 
        className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full opacity-15 parallax-element"
        style={{
          transform: `translate(${globalMouse.x * -12}px, ${globalMouse.y * 8}px) scale(${1 + globalMouse.x * 0.1})`,
          transition: 'transform 0.3s ease-out'
        }}
      ></div>
      <div 
        className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 transform rotate-45 opacity-15 parallax-element"
        style={{
          transform: `translate(${globalMouse.x * 20}px, ${globalMouse.y * -15}px) rotate(${45 + globalMouse.y * 10}deg)`,
          transition: 'transform 0.3s ease-out'
        }}
      ></div>
      <div 
        className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-lg opacity-15 transform -rotate-12 parallax-element"
        style={{
          transform: `translate(${globalMouse.x * -18}px, ${globalMouse.y * -12}px) rotate(${-12 + globalMouse.x * -8}deg)`,
          transition: 'transform 0.3s ease-out'
        }}
      ></div>
      
      {/* Additional floating elements for depth */}
      <div 
        className="absolute top-1/3 left-1/4 w-8 h-8 bg-gradient-to-br from-indigo-300 to-purple-400 rounded-full opacity-10 parallax-element"
        style={{
          transform: `translate(${globalMouse.x * 25}px, ${globalMouse.y * 20}px)`,
          transition: 'transform 0.4s ease-out'
        }}
      ></div>
      <div 
        className="absolute top-2/3 right-1/3 w-14 h-14 bg-gradient-to-br from-purple-300 to-indigo-400 rounded-lg opacity-10 parallax-element transform rotate-45"
        style={{
          transform: `translate(${globalMouse.x * -22}px, ${globalMouse.y * 18}px) rotate(${45 + globalMouse.y * 15}deg)`,
          transition: 'transform 0.4s ease-out'
        }}
      ></div>
    </section>
  );
};

export default HeroSection;
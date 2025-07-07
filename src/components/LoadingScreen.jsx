import React, { useState, useEffect, useRef } from 'react';
import { useGlobalMouse } from '../hooks/useMouseParallax';
import LoadingParticles from './LoadingParticles';
import useLoadingProgress from '../hooks/useLoadingProgress';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState('loading'); // loading, completing, fadeOut
  const containerRef = useRef(null);
  const globalMouse = useGlobalMouse();
  const { progress, isComplete, stepText } = useLoadingProgress(4500);

  useEffect(() => {
    if (isComplete) {
      setAnimationPhase('completing');
      
      // Start completion animation
      setTimeout(() => {
        setAnimationPhase('fadeOut');
        setTimeout(() => {
          setIsVisible(false);
          onLoadingComplete();
        }, 800);
      }, 1000);
    }
  }, [isComplete, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-50 flex items-center justify-center loading-optimized transition-all duration-800 ${
        animationPhase === 'fadeOut' ? 'opacity-0 scale-110 slide-down' : 'opacity-100 scale-100 slide-up'
      }`}
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
          linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)
        `
      }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `perspective(500px) rotateX(60deg) translateY(${globalMouse.y * 20}px)`,
            animation: 'gridFloat 8s ease-in-out infinite'
          }}
        />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `
                translate(${globalMouse.x * (10 + i * 2)}px, ${globalMouse.y * (8 + i * 1.5)}px) 
                rotate(${i * 30 + globalMouse.x * 5}deg)
              `,
              transition: 'transform 0.6s ease-out',
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          >
            <div
              className={`
                ${i % 3 === 0 ? 'w-4 h-4 rounded-full' : i % 3 === 1 ? 'w-6 h-6 rounded-lg' : 'w-3 h-8 rounded-full'}
                ${i % 2 === 0 ? 'bg-gradient-to-br from-indigo-400 to-purple-500' : 'bg-gradient-to-br from-purple-400 to-indigo-500'}
                opacity-20
              `}
            />
          </div>
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        {/* Logo/Brand */}
        <div 
          className="mb-12"
          style={{
            transform: `translateY(${globalMouse.y * -10}px) rotateY(${globalMouse.x * 5}deg)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <h1 className="text-6xl md:text-8xl font-black mb-4 leading-none">
            <span 
              className="block gradient-text relative"
              style={{
                textShadow: `
                  0 1px 0 rgba(99, 102, 241, 0.8),
                  0 2px 0 rgba(99, 102, 241, 0.7),
                  0 3px 0 rgba(99, 102, 241, 0.6),
                  0 4px 0 rgba(99, 102, 241, 0.5),
                  0 5px 0 rgba(99, 102, 241, 0.4),
                  0 6px 10px rgba(0, 0, 0, 0.1)
                `,
                transform: `translateX(${globalMouse.x * 8}px)`
              }}
            >
              DT
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light">
            Portfolio Loading...
          </p>
        </div>

        {/* 3D Progress Ring */}
        <div 
          className="relative w-32 h-32 mx-auto mb-8 loading-ring"
          style={{
            transform: `
              perspective(200px) 
              rotateX(${15 + globalMouse.y * 10}deg) 
              rotateY(${globalMouse.x * 15}deg)
            `,
            transition: 'transform 0.3s ease-out'
          }}
        >
          {/* Background Ring */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            {/* Progress Ring */}
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
              className="transition-all duration-500 ease-out"
              style={{
                filter: `drop-shadow(0 0 10px rgba(99, 102, 241, 0.5))`
              }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Progress Percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span 
              className="text-2xl font-bold gradient-text"
              style={{
                transform: `scale(${1 + progress * 0.002})`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              {Math.round(progress)}%
            </span>
          </div>

          {/* Rotating Outer Ring */}
          <div 
            className="absolute inset-0 border-2 border-transparent border-t-indigo-400 rounded-full opacity-30"
            style={{
              animation: 'spin 2s linear infinite',
              transform: `scale(${1.1 + progress * 0.003})`
            }}
          />
        </div>

        {/* Loading Text with Typewriter Effect */}
        <div className="h-8 mb-8">
          <p 
            className="text-lg text-gray-600 dark:text-gray-400 font-medium loading-text"
            style={{
              transform: `translateX(${globalMouse.x * 5}px)`,
              transition: 'transform 0.4s ease-out'
            }}
          >
            {stepText}
          </p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
              style={{
                animation: `bounce 1.4s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                transform: `translateY(${globalMouse.y * (2 + i)}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            />
          ))}
        </div>

        {/* Completion Animation */}
        {animationPhase === 'completing' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 border-4 border-indigo-500 rounded-full animate-ping opacity-20" />
            <div className="absolute w-48 h-48 border-4 border-purple-500 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.2s' }} />
            <div className="absolute w-32 h-32 border-4 border-indigo-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '0.4s' }} />
          </div>
        )}
      </div>

      {/* Advanced Particle System */}
      <LoadingParticles progress={progress} />
      
      {/* Additional Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `
                translate(${globalMouse.x * (8 + i * 1.5)}px, ${globalMouse.y * (6 + i * 1.2)}px) 
                rotate(${i * 24 + globalMouse.x * 3}deg)
                scale(${0.5 + progress * 0.01})
              `,
              transition: 'transform 0.6s ease-out'
            }}
          >
            <div
              className={`
                ${i % 4 === 0 ? 'w-6 h-6 rounded-full' : 
                  i % 4 === 1 ? 'w-8 h-2 rounded-full' : 
                  i % 4 === 2 ? 'w-4 h-4 rounded-lg' : 'w-2 h-10 rounded-full'}
                ${i % 3 === 0 ? 'bg-gradient-to-br from-indigo-400 to-purple-500' : 
                  i % 3 === 1 ? 'bg-gradient-to-br from-purple-400 to-pink-500' : 
                  'bg-gradient-to-br from-blue-400 to-indigo-500'}
                shimmer
              `}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
import React, { useEffect, useRef } from 'react';
import { useGlobalMouse } from '../hooks/useMouseParallax';

const LoadingParticles = ({ progress }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef();
  const globalMouse = useGlobalMouse();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: Math.random() > 0.5 ? '#6366f1' : '#8b5cf6',
          originalX: 0,
          originalY: 0,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Mouse parallax effect
        const mouseInfluence = 50;
        const distanceX = globalMouse.x * mouseInfluence;
        const distanceY = globalMouse.y * mouseInfluence;

        // Update position with parallax
        particle.x += particle.vx + distanceX * 0.01;
        particle.y += particle.vy + distanceY * 0.01;

        // Add wave motion
        particle.phase += 0.02;
        const waveOffset = Math.sin(particle.phase) * 10;
        
        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity * (progress / 100);
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(
          particle.x + waveOffset, 
          particle.y + Math.sin(particle.phase * 0.5) * 5, 
          particle.size, 
          0, 
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();

        // Connect nearby particles
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.save();
              ctx.globalAlpha = (1 - distance / 100) * 0.2 * (progress / 100);
              ctx.strokeStyle = particle.color;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [globalMouse.x, globalMouse.y, progress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default LoadingParticles;
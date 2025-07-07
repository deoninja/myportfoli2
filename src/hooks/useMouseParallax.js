import { useState, useEffect, useRef } from 'react';

// Hook for mouse parallax effects
export const useMouseParallax = (intensity = 1, smooth = 0.1) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate mouse position relative to element center
      const mouseX = (e.clientX - centerX) / (rect.width / 2);
      const mouseY = (e.clientY - centerY) / (rect.height / 2);

      setMousePosition({
        x: mouseX * intensity,
        y: mouseY * intensity
      });
    };

    // Smooth animation using requestAnimationFrame
    const animate = () => {
      setElementPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * smooth,
        y: prev.y + (mousePosition.y - prev.y) * smooth
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity, smooth, mousePosition.x, mousePosition.y]);

  return [ref, elementPosition];
};

// Hook for global mouse position
export const useGlobalMouse = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1, // Normalize to -1 to 1
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};

// Hook for tilt effect
export const useTiltEffect = (maxTilt = 15, smooth = 0.1) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [currentTilt, setCurrentTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = (e.clientX - centerX) / (rect.width / 2);
      const mouseY = (e.clientY - centerY) / (rect.height / 2);

      setTilt({
        x: mouseY * maxTilt,
        y: -mouseX * maxTilt
      });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    const animate = () => {
      setCurrentTilt(prev => ({
        x: prev.x + (tilt.x - prev.x) * smooth,
        y: prev.y + (tilt.y - prev.y) * smooth
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [maxTilt, smooth, tilt.x, tilt.y]);

  return [ref, currentTilt];
};

// Hook for magnetic effect
export const useMagneticEffect = (strength = 0.3, distance = 100) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distanceFromCenter < distance) {
        const force = (distance - distanceFromCenter) / distance;
        setPosition({
          x: deltaX * strength * force,
          y: deltaY * strength * force
        });
        setIsHovered(true);
      } else {
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [strength, distance]);

  return [ref, position, isHovered];
};

export default useMouseParallax;
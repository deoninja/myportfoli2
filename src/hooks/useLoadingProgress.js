import { useState, useEffect } from 'react';

export const useLoadingProgress = (duration = 4000) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { progress: 0, text: 'Initializing...', duration: 300 },
    { progress: 15, text: 'Loading assets...', duration: 600 },
    { progress: 35, text: 'Preparing components...', duration: 500 },
    { progress: 55, text: 'Building interface...', duration: 700 },
    { progress: 75, text: 'Optimizing experience...', duration: 600 },
    { progress: 90, text: 'Finalizing details...', duration: 400 },
    { progress: 100, text: 'Welcome!', duration: 500 }
  ];

  useEffect(() => {
    let timeoutId;
    
    const executeStep = (stepIndex) => {
      if (stepIndex >= steps.length) {
        setIsComplete(true);
        return;
      }

      const step = steps[stepIndex];
      setProgress(step.progress);
      setCurrentStep(stepIndex);

      // Smooth progress animation within each step
      if (stepIndex < steps.length - 1) {
        const nextStep = steps[stepIndex + 1];
        const progressDiff = nextStep.progress - step.progress;
        const stepDuration = step.duration;
        const incrementInterval = stepDuration / progressDiff;

        let currentProgress = step.progress;
        const progressInterval = setInterval(() => {
          currentProgress += 1;
          if (currentProgress <= nextStep.progress) {
            setProgress(currentProgress);
          } else {
            clearInterval(progressInterval);
          }
        }, incrementInterval);

        timeoutId = setTimeout(() => {
          clearInterval(progressInterval);
          executeStep(stepIndex + 1);
        }, stepDuration);
      } else {
        timeoutId = setTimeout(() => {
          setIsComplete(true);
        }, step.duration);
      }
    };

    executeStep(0);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return {
    progress,
    currentStep,
    isComplete,
    stepText: steps[currentStep]?.text || 'Loading...'
  };
};

export default useLoadingProgress;